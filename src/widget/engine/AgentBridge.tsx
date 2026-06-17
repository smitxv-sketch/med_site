import React, { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { AgentBookingEngine } from './ai-contracts';
import { appEventBus } from '../../shared/lib/eventBus';

/**
 * Headless component that binds global AI Tool Calls to the BookingContext.
 * Requires `BookingProvider` to be active in the tree.
 */
export const AgentBridge: React.FC = () => {
    const bookingContext = useBooking();

    useEffect(() => {
        // Expose API for external scripts (like LLM Chatbots integrated via script tags)
        (window as any).MedWidgetAI = {
            executeTool: async (toolName: string, args: any) => {
                return await AgentBookingEngine.executeAgentTool(toolName, args, bookingContext);
            }
        };

        // Also we can listen to the event bus in case an internal Chatbot uses it
        const unsubscribe = appEventBus.on('execute_ai_tool', async (payload: { toolName: string, args: any, callbackId?: string }) => {
            try {
                const result = await AgentBookingEngine.executeAgentTool(payload.toolName, payload.args, bookingContext);
                if (payload.callbackId) {
                    appEventBus.emit(`ai_tool_result_${payload.callbackId}`, result);
                }
            } catch (err: any) {
                if (payload.callbackId) {
                    appEventBus.emit(`ai_tool_result_${payload.callbackId}`, { error: true, message: err.message });
                }
            }
        });

        // Cleanup
        return () => {
             delete (window as any).MedWidgetAI;
             unsubscribe();
        };
    }, [bookingContext]);

    // This component renders nothing
    return null;
}
