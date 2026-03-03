import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import ItemCard from "@/components/marketplace/ItemCard";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import { ItemCategory, SellerType, MarketplaceItem } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMarketplaceItems } from "@/hooks/useMarketplace";
import CreateItemDialog from "@/components/marketplace/CreateItemDialog";
import { useAuth } from "@/contexts/AuthContext";

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "all">("all");
  const [selectedSellerType, setSelectedSellerType] = useState<SellerType | "all">("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { user } = useAuth();

  const { data: items = [], isLoading } = useMarketplaceItems();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSellerType = selectedSellerType === "all" || item.seller.type === selectedSellerType;

      return matchesSearch && matchesCategory && matchesSellerType;
    });
  }, [items, searchQuery, selectedCategory, selectedSellerType]);

  const handleContactSeller = async (item: MarketplaceItem) => {
    if (!user) {
      toast.error("Please sign in to chat with seller");
      navigate("/signin");
      return;
    }

    if (item.seller.id === user.uid) {
      toast.error("You cannot chat with yourself");
      return;
    }

    try {
      const { api } = await import("@/services/api");
      toast.message("Connecting to chat...");
      const roomId = await api.createChatRoom(item.seller.id);
      navigate(`/chat?room=${roomId}`);
    } catch (error) {
      console.error("Failed to start chat", error);
      toast.error("Failed to start chat");
    }
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
          <CreateItemDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            trigger={
              <Button
                variant="hero"
                className="gap-2"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    toast.error("Please sign in to list items");
                    navigate("/signin");
                  }
                }}
              >
                <Plus className="w-5 h-5" />
                List an Item
              </Button>
            }
          />
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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ItemCard
                  item={item}
                  onContact={handleContactSeller}
                  isOwner={user?.uid === item.seller.id}
                />
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

            {/* Helper removed */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
