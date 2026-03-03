import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { MarketplaceItem } from "@/types/marketplace";
import { toast } from "sonner";

export const useMarketplaceItems = () => {
    return useQuery({
        queryKey: ["marketplace-items"],
        queryFn: () => api.getItems(),
    });
};

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: Omit<MarketplaceItem, "id" | "createdAt" | "seller">) => api.createItem(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["marketplace-items"] });
            toast.success("Item listed successfully!");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to list item: " + (error instanceof Error ? error.message : "Unknown error"));
        },
    });
};
