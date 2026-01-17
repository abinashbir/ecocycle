import { Package, MessageCircle, ShoppingCart, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "listing",
    title: "New listing created",
    description: "Industrial Plastic Scrap - HDPE",
    time: "2 hours ago",
    icon: Package,
  },
  {
    id: 2,
    type: "message",
    title: "New message received",
    description: "From EcoPlast Recyclers about copper scrap",
    time: "4 hours ago",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "order",
    title: "Order confirmed",
    description: "500kg Paper Waste to GreenCycle NGO",
    time: "6 hours ago",
    icon: ShoppingCart,
  },
  {
    id: 4,
    type: "completed",
    title: "Transaction completed",
    description: "Payment received for metal scrap",
    time: "1 day ago",
    icon: CheckCircle,
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
      <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-sm text-muted-foreground truncate">{activity.description}</div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
