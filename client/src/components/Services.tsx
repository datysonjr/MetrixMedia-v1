import { Smile, Megaphone, Target, Video, Check } from "lucide-react";

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    {
      icon: <Smile className="text-primary text-xl" />,
      title: "Meme Marketing",
      description: "Viral content that connects with Gen Z and Millennial audiences through humor and cultural relevance.",
      features: ["Viral content creation", "Trend analysis", "Community management"]
    },
    {
      icon: <Megaphone className="text-primary text-xl" />,
      title: "Campaign Management",
      description: "End-to-end campaign strategy, execution, and optimization for maximum impact and ROI.",
      features: ["Strategy development", "Multi-platform execution", "Performance tracking"]
    },
    {
      icon: <Target className="text-primary text-xl" />,
      title: "Paid Advertising",
      description: "Data-driven paid advertising across Facebook, Instagram, TikTok, and Google Ads platforms.",
      features: ["Ad creation & testing", "Audience targeting", "Budget optimization"]
    },
    {
      icon: <Video className="text-primary text-xl" />,
      title: "Content Creation",
      description: "High-quality video, graphic, and written content optimized for each social platform.",
      features: ["Video production", "Graphic design", "Copywriting"]
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "$2,500",
      period: "/month",
      features: ["Basic meme marketing", "Social media management", "Monthly reporting"],
      popular: false
    },
    {
      name: "Growth",
      price: "$5,000",
      period: "/month",
      features: ["Advanced campaigns", "Paid advertising", "Content creation", "Weekly reporting"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Full-service marketing", "Dedicated account manager", "Custom reporting", "Priority support"],
      popular: false
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="services-title">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            Comprehensive digital marketing solutions tailored to your business goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl border border-border card-hover" data-testid={`service-card-${index}`}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4" data-testid={`service-title-${index}`}>{service.title}</h3>
              <p className="text-muted-foreground mb-6" data-testid={`service-description-${index}`}>
                {service.description}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center" data-testid={`service-feature-${index}-${featureIndex}`}>
                    <Check className="text-primary mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Service Packages */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12" data-testid="packages-title">Choose Your Package</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`bg-card p-8 rounded-2xl text-center relative ${
                  pkg.popular ? 'border-2 border-primary' : 'border border-border'
                }`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium" data-testid="package-popular-badge">
                    Most Popular
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-4" data-testid={`package-name-${index}`}>{pkg.name}</h4>
                <div className="text-4xl font-bold text-primary mb-6" data-testid={`package-price-${index}`}>
                  {pkg.price}<span className="text-lg text-muted-foreground">{pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`package-feature-${index}-${featureIndex}`}>
                      <Check className="text-primary mr-3" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`block w-full py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid={`package-button-${index}`}
                >
                  {pkg.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
