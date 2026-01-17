import Navbar from "@/components/layout/Navbar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Truck, RefreshCw } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your waste trading operations and connect with stakeholders
          </p>
        </div>

        {/* Role Tabs */}
        <Tabs defaultValue="producer" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="producer" className="gap-2">
              <Factory className="w-4 h-4" />
              <span className="hidden sm:inline">Producer</span>
            </TabsTrigger>
            <TabsTrigger value="collector" className="gap-2">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Collector</span>
            </TabsTrigger>
            <TabsTrigger value="recycler" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Recycler</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="producer" className="mt-6">
            <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-eco-producer flex items-center justify-center">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Waste Producer Dashboard</h2>
              </div>
              <p className="text-muted-foreground">
                List your waste materials, track pickups, and connect with collectors.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="collector" className="mt-6">
            <div className="bg-accent/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-eco-collector flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Waste Collector Dashboard</h2>
              </div>
              <p className="text-muted-foreground">
                Find waste sources, manage collection routes, and sell to recyclers.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recycler" className="mt-6">
            <div className="bg-muted/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-eco-recycler flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Waste Recycler Dashboard</h2>
              </div>
              <p className="text-muted-foreground">
                Source quality waste, track inventory, and connect with manufacturers.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Activity & Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
