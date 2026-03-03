import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateItem } from "@/hooks/useMarketplace";
import { ItemCategory, ItemCondition } from "@/types/marketplace";
import { Loader2 } from "lucide-react";

interface CreateItemDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface CreateItemFormValues {
    title: string;
    description: string;
    price: number;
    unit: string;
    quantity: number;
    category: ItemCategory;
    condition: ItemCondition;
    imageUrl: string;
}

const CreateItemDialog = ({ trigger, open, onOpenChange }: CreateItemDialogProps) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const show = isControlled ? open : internalOpen;
    const setShow = isControlled ? onOpenChange : setInternalOpen;

    const { mutate: createItem, isPending } = useCreateItem();
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateItemFormValues>();

    const onSubmit = (data: CreateItemFormValues) => {
        createItem({
            ...data,
            images: data.imageUrl ? [data.imageUrl] : [],
        }, {
            onSuccess: () => {
                reset();
                setShow?.(false);
            }
        });
    };

    return (
        <Dialog open={show} onOpenChange={setShow}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>List an Item</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title", { required: "Title is required" })} placeholder="e.g. Recycled HDPE Pellets" />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description", { required: "Description is required" })} placeholder="Describe the item..." />
                        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" step="0.01" {...register("price", { required: "Price is required", valueAsNumber: true })} />
                            {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Input id="unit" {...register("unit", { required: "Unit is required" })} placeholder="e.g. kg, ton, pcs" />
                            {errors.unit && <p className="text-sm text-destructive">{errors.unit.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" {...register("quantity", { required: "Quantity is required", valueAsNumber: true })} />
                        {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select onValueChange={(val) => setValue("category", val as ItemCategory)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="plastic">Plastic</SelectItem>
                                    <SelectItem value="metal">Metal</SelectItem>
                                    <SelectItem value="paper">Paper</SelectItem>
                                    <SelectItem value="glass">Glass</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="textile">Textile</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Condition</Label>
                            <Select onValueChange={(val) => setValue("condition", val as ItemCondition)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="like-new">Like New</SelectItem>
                                    <SelectItem value="good">Good</SelectItem>
                                    <SelectItem value="fair">Fair</SelectItem>
                                    <SelectItem value="for-recycling">For Recycling</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                        <Input id="imageUrl" {...register("imageUrl")} placeholder="https://example.com/image.jpg" />
                        <p className="text-xs text-muted-foreground">Paste a link to an image (e.g. from Imgur)</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            List Item
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateItemDialog;
