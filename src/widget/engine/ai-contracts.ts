/**
 * Headless AI Service Layer
 * 
 * Эти контракты созданы специально для того, чтобы:
 * 1. ИИ Агент мог "понять" какие параметры ему нужно собрать в чате у пациента.
 * 2. ИИ Агент мог дернутьheadless-функции движка напрямую, минуя UI компоненты.
 */

import * as apiServices from '../services/api';

// 1. Описание функций для передачи в LLM (OpenAI/Gemini Tool Calling Format)
export const BookingAIToolsSchema = [
  {
    name: "find_available_slots",
    description: "Ищет свободные временные слоты для записи к конкретному врачу на указанную дату.",
    parameters: {
      type: "object",
      properties: {
        doctorId: { type: "string", description: "ID врача в системе (qms_id)" },
        date: { type: "string", description: "Дата в формате YYYY-MM-DD" },
      },
      required: ["doctorId", "date"],
    },
  },
  {
    name: "book_appointment",
    description: "Создает запись на приём для пациента. Должно вызываться только после того, как врач, дата и время (слот) согласованы с пациентом.",
    parameters: {
      type: "object",
      properties: {
        doctorId: { type: "string", description: "ID врача в системе (qms_id)" },
        date: { type: "string", description: "Формат YYYY-MM-DD" },
        slotTime: { type: "string", description: "Уникальный идентификатор времени (например 10:00), полученный из find_available_slots" },
        patientName: { type: "string", description: "Имя (и фамилия, если есть) пациента" },
        patientPhone: { type: "string", description: "Телефон пациента. Требуется собрать до записи." }
      },
      required: ["doctorId", "date", "slotTime", "patientName", "patientPhone"],
    },
  }
];

// 2. Headless API адаптеры для ИИ Агента (Business Logic Layer)
// ИИ будет генерировать JSON-аргументы, а мы прокидываем их в наши реальные API-сервисы,
// одновременно обновляя UI через BookingContext, чтобы пациент видел "магию" (анимацию действий Агента).
export const AgentBookingEngine = {
  async executeAgentTool(toolName: string, args: any, context?: any) {
    console.log(`[Agent Engine] Triggered action: ${toolName}`, args);
    
    switch (toolName) {
      case 'find_available_slots': {
        if (!context) throw new Error("BookingContext is required to execute this tool");
        const { branches, allDoctors, setSelectedDoctor, setIsDoctorModalOpen } = context;
        
        const doctor = allDoctors.find((d: any) => d.id === args.doctorId || (d.qmsIds && d.qmsIds.includes(args.doctorId)));
        const branchIds = Object.keys(branches || {});
        const defaultCity = branchIds.length > 0 ? branchIds[0] : ''; 
        
        try {
          const slotsResult = await apiServices.getSlots(defaultCity, args.doctorId, args.date, doctor?.specialty);
          
          // Visual update for the user (Agent acts transparently)
          if (doctor) {
            setSelectedDoctor(doctor);
            setIsDoctorModalOpen(true);
          }
          
          return slotsResult;
        } catch (e: any) {
          console.error("Agent failed to find slots:", e);
          return { error: true, message: "Не удалось получить слоты. Попробуйте другую дату или врача." };
        }
      }
        
      case 'book_appointment': {
        if (!context) throw new Error("BookingContext is required to execute this tool");
        const { handleSetStep, setFormData, allDoctors } = context;
        
        const doctor = allDoctors.find((d: any) => d.id === args.doctorId || (d.qmsIds && d.qmsIds.includes(args.doctorId)));
        
        try {
          const result = await apiServices.bookAppointment({
            doctor_id: args.doctorId,
            slot: args.slotTime,
            date: args.date,
            patient: {
              name: args.patientName,
              phone: args.patientPhone,
              email: ''
            }
          });
          
          // Visual update: Agent fills the form and jumps to success
          setFormData((prev: any) => ({
             ...prev,
             doctor: doctor || prev.doctor,
             date: args.date,
             slot: { time: args.slotTime },
             name: args.patientName,
             phone: args.patientPhone
          }));
          handleSetStep('success');
          
          return {
            success: true,
            bookingId: result?.booking_id || "A1B2C3D4",
            message: "Запись успешно создана!"
          };
        } catch (e: any) {
          console.error("Agent failed to book:", e);
          return { error: true, message: `Failed to book: ${e.message}` };
        }
      }
        
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
};
