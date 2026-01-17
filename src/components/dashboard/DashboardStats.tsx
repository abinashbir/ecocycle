import { TrendingUp, TrendingDown, Package, Truck, DollarSign, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon }: StatCardProps) => (
  <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{title}</div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    { title: "Total Listings", value: "124", change: "+12%", isPositive: true, icon: Package },
    { title: "Active Orders", value: "18", change: "+5%", isPositive: true, icon: Truck },
    { title: "Revenue", value: "₹2.4L", change: "+23%", isPositive: true, icon: DollarSign },
    { title: "Connections", value: "56", change: "+8%", isPositive: true, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
