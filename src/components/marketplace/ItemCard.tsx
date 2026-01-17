import { MarketplaceItem } from "@/types/marketplace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageCircle } from "lucide-react";

interface ItemCardProps {
  item: MarketplaceItem;
  onContact?: (item: MarketplaceItem) => void;
}

const categoryColors: Record<string, string> = {
  plastic: "bg-blue-100 text-blue-700 border-blue-200",
  metal: "bg-gray-100 text-gray-700 border-gray-200",
  paper: "bg-amber-100 text-amber-700 border-amber-200",
  glass: "bg-cyan-100 text-cyan-700 border-cyan-200",
  electronics: "bg-purple-100 text-purple-700 border-purple-200",
  organic: "bg-green-100 text-green-700 border-green-200",
  textile: "bg-pink-100 text-pink-700 border-pink-200",
  other: "bg-muted text-muted-foreground border-border",
};

const sellerTypeColors: Record<string, string> = {
  producer: "bg-eco-producer/10 text-eco-producer border-eco-producer/20",
  collector: "bg-eco-collector/10 text-eco-collector border-eco-collector/20",
  recycler: "bg-eco-recycler/10 text-eco-recycler border-eco-recycler/20",
};

const ItemCard = ({ item, onContact }: ItemCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-eco-earth/10 flex items-center justify-center">
          <span className="text-4xl">📦</span>
        </div>
        {item.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground shadow-soft">Featured</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={categoryColors[item.category]}>
            {item.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold text-primary">₹{item.price}</span>
          <span className="text-sm text-muted-foreground">{item.unit}</span>
        </div>

        {/* Quantity */}
        <div className="text-sm text-muted-foreground mb-4">
          Available: <span className="font-medium text-foreground">{item.quantity.toLocaleString()} units</span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
            {item.seller.type === "producer" ? "🏭" : item.seller.type === "collector" ? "🚛" : "♻️"}
          </div>
          <div className="flex-grow min-w-0">
            <div className="font-medium text-sm truncate">{item.seller.name}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{item.seller.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{item.seller.rating}</span>
          </div>
        </div>

        {/* Seller Type Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={sellerTypeColors[item.seller.type]}>
            {item.seller.type}
          </Badge>
          <Button 
            size="sm" 
            onClick={() => onContact?.(item)}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
