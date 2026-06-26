import { MisDriver, MisDoctor, MisSlot, MisService, MisAppointment } from '../interfaces/MisDriver.js';
import { getWpDoctorByQmsId } from '../wpService.js';
import { getBranchesMap, extractBranchCode } from './qms/qmsUtils.js';
import { makeRequest } from './qms/qmsApi.js';

// --- DRIVER IMPLEMENTATION ---

export class QmsDriver implements MisDriver {
  
  async getDoctors(cityCode: string, specialty?: string): Promise<MisDoctor[]> {
    try {
      // Fetch available doctors from QMS (Source of Truth for Availability)
      // If specialty is provided, call 'getslotsbyspec' with that specialty.
      // If no specialty, we return empty list as per previous logic to avoid timeout.
      
      let specsToFetch: string[] = [];
      
      if (specialty) {
        specsToFetch = [specialty];
      } else {
        console.warn('[QMS] getDoctors called without specialty. Returning empty array.');
        return [];
      }

      const doctorsMap = new Map<string, MisDoctor>();
      const branchesMap = getBranchesMap();

      for (const spec of specsToFetch) {
        const params = {
          chatid: '999',
          spec: spec
        };
        
        try {
          const response = await makeRequest(cityCode, 'getslotsbyspec', params);
          
          if (response && response.slots) {
             const docBlocks = response.slots || [];
             
              for (const block of docBlocks) {
                const docId = block.qqc;
                if (!docId) continue;
                
                if (!doctorsMap.has(docId)) {
                  doctorsMap.set(docId, {
                    id: docId,
                    name: block.doctor || block.fio || 'Unknown Doctor',
                    specialty: spec,
                    offerings: []
                  });
                }

                const doctor = doctorsMap.get(docId)!;
                
                // Create offering
                const branchCode = extractBranchCode(docId);
                const branchInfo = branchesMap[branchCode];
                
                if (branchInfo) {
                    // Check if offering already exists
                    const existingOffering = doctor.offerings?.find(o => o.id === docId);
                    if (!existingOffering) {
                        doctor.offerings?.push({
                            id: docId, // Use QMS ID as offering ID
                            branch: {
                                id: branchCode,
                                name: branchInfo.name,
                                short: branchInfo.short,
                                address: branchInfo.short || branchInfo.address || ''
                            },
                            price: block.price || 0,
                            is_primary: false // Logic to determine primary?
                        });
                    }
                }
              }
          }
        } catch (e) {
          console.warn(`Failed to fetch doctors for spec ${spec}`, e);
        }
      }

      const result = Array.from(doctorsMap.values());
      return result;

    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      return [];
    }
  }

  async getServices(cityCode: string): Promise<MisService[]> {
    try {
      // Use raw QMS 'spec_list' endpoint
      const response = await makeRequest(cityCode, 'spec_list', { chatid: '999', qqc244: '' });
      
      // Response format: { spec: ["Spec1", "Spec2", ...] }
      const specs = response.spec || [];
      
      if (Array.isArray(specs)) {
        const result = specs.map((name: string) => ({
          id: name, 
          name: name,
          price: 0 
        }));
        return result;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch services:', error);
      return [];
    }
  }

  async getSlots(cityCode: string, doctorId: string, date?: string, specialty?: string): Promise<MisSlot[]> {
    const branchCode = extractBranchCode(doctorId);
    
    let spec = specialty;
    if (!spec) {
      // Try to get specialty from WP
      try {
        const wpDoc = await getWpDoctorByQmsId(doctorId);
        if (wpDoc && wpDoc.specialty) {
          spec = wpDoc.specialty;
        }
      } catch (e) {
        console.warn('[QMS] Failed to fetch doctor details from WP for slots:', e);
      }
    }
    
    if (!spec) {
       console.warn(`[QMS] getSlots called without specialty for doctor ${doctorId}. Using empty string.`);
       spec = '';
    }
    
    const params: any = {
      chatid: '999', 
      qqc244: doctorId,
      qqc244branch: branchCode,
      spec: spec,
    };

    if (date) {
      params.day = date.replace(/-/g, '');
    }

    try {
      const response = await makeRequest(cityCode, 'getslotsbyspec', params);
      
      const slots: MisSlot[] = [];
      
      if (response && response.slots && Array.isArray(response.slots)) {
         // Try to find the block for our doctor, but fallback to the first block if not found
         let docBlock = response.slots.find((b: any) => b.qqc === doctorId);
         
         if (!docBlock) {
           docBlock = response.slots[0];
         }
         
         if (docBlock && docBlock.schedule) {
            const result = docBlock.schedule.map((s: any) => {
              let slotDate = date;
              // date is like "2026-03-12" or "20260312"
              if (date && date.length === 8 && !date.includes('-')) {
                slotDate = `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)}`;
              } else if (date && date.includes('-')) {
                slotDate = date;
              } else if (s.day2say) {
                // day2say is usually DD.MM.YYYY
                const parts = s.day2say.split('.');
                if (parts.length === 3) {
                  slotDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                } else {
                  slotDate = s.day2say;
                }
              }
              
              return {
               id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
               time: s.time,
               date: slotDate || date || '',
               isAvailable: true,
               price: s.price || 0
             };
           });
           return result;
         } else if (!date && docBlock && !docBlock.schedule) {
            // If date is not provided, the API returns available days as keys
            // We need to fetch the actual slots for each available day
            const daysToFetch: string[] = [];
            for (const key of Object.keys(docBlock)) {
              if (key.match(/^\d{8}$/)) {
                daysToFetch.push(key);
              }
            }
            
            // Limit to 14 days to avoid too many requests
            const limitedDays = daysToFetch.slice(0, 14);
            
            if (limitedDays.length > 0) {
              const dayPromises = limitedDays.map(async (day) => {
                try {
                  const dayParams = { ...params, day };
                  const dayResponse = await makeRequest(cityCode, 'getslotsbyspec', dayParams);
                  
                  if (dayResponse && dayResponse.slots && Array.isArray(dayResponse.slots)) {
                    const dayDocBlock = dayResponse.slots.find((b: any) => b.qqc === doctorId) || dayResponse.slots[0];
                    if (dayDocBlock && dayDocBlock.schedule) {
                      return dayDocBlock.schedule.map((s: any) => {
                        let slotDate = day;
                        // day is like "20260312"
                        if (day && day.length === 8) {
                          slotDate = `${day.substring(0,4)}-${day.substring(4,6)}-${day.substring(6,8)}`;
                        } else if (s.day2say) {
                          const parts = s.day2say.split('.');
                          if (parts.length === 3) {
                            slotDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                          } else {
                            slotDate = s.day2say;
                          }
                        }
                        return {
                          id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                          time: s.time,
                          date: slotDate,
                          isAvailable: true,
                          price: s.price || 0
                        };
                      });
                    }
                  }
                } catch (e) {
                  console.error(`[QMS] Error fetching slots for day ${day}:`, e);
                }
                return [];
              });
              
              const results = await Promise.all(dayPromises);
              for (const daySlots of results) {
                slots.push(...daySlots);
              }
            }
         } else if (docBlock && docBlock.slots && Array.isArray(docBlock.slots)) {
            // Fallback to parsing slots array if schedule is not present
            const targetDate = date || new Date().toLocaleDateString('ru-RU');
            
            docBlock.slots.forEach((timeArray: any) => {
               if (Array.isArray(timeArray)) {
                   timeArray.forEach((time: string) => {
                       slots.push({
                           id: `${doctorId}_${targetDate}_${time}`,
                           time: time,
                           date: targetDate,
                           isAvailable: true,
                           price: docBlock.price || 0
                       });
                   });
               } else if (typeof timeArray === 'string') {
                   slots.push({
                       id: `${doctorId}_${targetDate}_${timeArray}`,
                       time: timeArray,
                       date: targetDate,
                       isAvailable: true,
                       price: docBlock.price || 0
                   });
               }
            });
         }
      }
      
      return slots;
    } catch (error) {
      console.error('Failed to fetch slots:', error);
      return [];
    }
  }

  async getRawSlots(cityCode: string, doctorId: string, date?: string): Promise<any> {
    const branchCode = extractBranchCode(doctorId);
    
    let spec = '';
    try {
      const wpDoc = await getWpDoctorByQmsId(doctorId);
      if (wpDoc && wpDoc.specialty) {
        spec = wpDoc.specialty;
      }
    } catch (e) {
      console.warn('[QMS] Failed to fetch doctor details from WP for raw slots:', e);
    }

    const params: any = {
      chatid: '999', 
      qqc244: doctorId,
      qqc244branch: branchCode,
      spec: spec,
    };

    if (date) {
      params.day = date.replace(/-/g, '');
    }

    try {
      return await makeRequest(cityCode, 'getslotsbyspec', params);
    } catch (error: any) {
      return { error: error.message, details: error.response?.data };
    }
  }

  async createAppointment(cityCode: string, data: any): Promise<MisAppointment> {
    const payload = {
      chatid: '999',
      phone: data.patient.phone,
      fio: data.patient.name,
      birthdate: data.patient.birthDate || '01.01.1980',
      doc: data.doctor_id,
      date: data.date,
      time: data.slot
    };

    try {
      const response = await makeRequest(cityCode, 'appointByFIO', payload);
      
      if (response && response.result === 'success') {
        return { success: true, data: response };
      } else {
        const qmsError = response?.error || response?.result;
        const fallbackMsg = 'Не удалось записаться. Возможно, выбранное время уже занято, попробуйте выбрать другое.';
        return { success: false, error: qmsError || fallbackMsg };
      }
    } catch (error: any) {
      console.error('Failed to book appointment:', error);
      return { 
        success: false, 
        error: `Ошибка соединения с медицинской системой. Попробуйте еще раз.`, 
        details: error?.response?.data || error?.message 
      };
    }
  }

  async testConnection(cityCode: string): Promise<any> {
    try {
      const start = Date.now();
      // Try to fetch services list as a connectivity test
      const response = await makeRequest(cityCode, 'spec_list', { qqc244: '' });
      const duration = Date.now() - start;
      
      return {
        success: true,
        duration: `${duration}ms`,
        endpoint: 'spec_list',
        responsePreview: response ? JSON.stringify(response).substring(0, 500) : 'null',
        raw: response // Include raw response for debugging
      };
    } catch (error: any) {
      return {
        success: false,
        endpoint: 'spec_list',
        error: error.message,
        details: error.response?.data
      };
    }
  }
}

export const qmsDriver = new QmsDriver();
