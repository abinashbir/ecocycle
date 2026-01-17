import { ArrowDown, Package, Truck, Factory, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Producers List Waste",
    description: "Businesses and households list their waste materials on the platform",
    color: "bg-eco-producer",
  },
  {
    icon: Truck,
    title: "Collectors Pick Up",
    description: "NGOs, kabadiwalas, and agencies collect waste from producers",
    color: "bg-eco-collector",
  },
  {
    icon: Factory,
    title: "Recyclers Process",
    description: "Recyclers extract raw materials and process waste into reusable form",
    color: "bg-eco-recycler",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace Trade",
    description: "Raw materials and reusable items are traded in the marketplace",
    color: "bg-primary",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient-eco">EcoCycle</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A seamless flow connecting all stakeholders in the waste management ecosystem.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-card`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-start pl-9 py-4">
                    <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
