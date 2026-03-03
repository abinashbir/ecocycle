import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";

export const useChatRooms = () => {
    return useQuery({
        queryKey: ["chat-rooms"],
        queryFn: () => api.getChatRooms(),
    });
};

export const useMessages = (roomId: string | null) => {
    return useQuery({
        queryKey: ["messages", roomId],
        queryFn: () => (roomId ? api.getMessages(roomId) : Promise.resolve([])),
        enabled: !!roomId,
        // Poll for new messages every 5 seconds (primitive real-time)
        refetchInterval: 5000,
    });
};

export const useSendMessage = (roomId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ content, senderId }: { content: string; senderId: string }) =>
            api.sendMessage(roomId, content, senderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
            queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
        },
        onError: () => {
            toast.error("Failed to send message");
        },
    });
};
