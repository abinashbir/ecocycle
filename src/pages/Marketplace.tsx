import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import ItemCard from "@/components/marketplace/ItemCard";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import { mockMarketplaceItems } from "@/data/mockData";
import { ItemCategory, SellerType, MarketplaceItem } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "all">("all");
  const [selectedSellerType, setSelectedSellerType] = useState<SellerType | "all">("all");

  const filteredItems = useMemo(() => {
    return mockMarketplaceItems.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSellerType = selectedSellerType === "all" || item.seller.type === selectedSellerType;

      return matchesSearch && matchesCategory && matchesSellerType;
    });
  }, [searchQuery, selectedCategory, selectedSellerType]);

  const handleContactSeller = (item: MarketplaceItem) => {
    toast.success(`Starting chat with ${item.seller.name}`);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Marketplace</h1>
            <p className="text-muted-foreground">
              Buy and sell recyclable materials, raw materials, and reusable products
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="w-5 h-5" />
            List an Item
          </Button>
        </div>

        {/* Filters */}
        <MarketplaceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSellerType={selectedSellerType}
          onSellerTypeChange={setSelectedSellerType}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredItems.length}</span> items
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ItemCard item={item} onContact={handleContactSeller} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedSellerType("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
