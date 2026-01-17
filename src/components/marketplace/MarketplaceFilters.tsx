import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { ItemCategory, SellerType } from "@/types/marketplace";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ItemCategory | "all";
  onCategoryChange: (category: ItemCategory | "all") => void;
  selectedSellerType: SellerType | "all";
  onSellerTypeChange: (type: SellerType | "all") => void;
}

const categories: { value: ItemCategory | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "🔄" },
  { value: "plastic", label: "Plastic", emoji: "🧴" },
  { value: "metal", label: "Metal", emoji: "🔩" },
  { value: "paper", label: "Paper", emoji: "📄" },
  { value: "glass", label: "Glass", emoji: "🍾" },
  { value: "electronics", label: "Electronics", emoji: "💻" },
  { value: "organic", label: "Organic", emoji: "🌿" },
  { value: "textile", label: "Textile", emoji: "👕" },
];

const sellerTypes: { value: SellerType | "all"; label: string }[] = [
  { value: "all", label: "All Sellers" },
  { value: "producer", label: "Producers" },
  { value: "collector", label: "Collectors" },
  { value: "recycler", label: "Recyclers" },
];

const MarketplaceFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSellerType,
  onSellerTypeChange,
}: FiltersProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for materials, products, or sellers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base rounded-xl border-2 focus:border-primary"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(cat.value)}
              className="gap-2"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Seller Types */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Seller Type</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sellerTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedSellerType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => onSellerTypeChange(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
