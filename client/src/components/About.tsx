import { Check } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8" data-testid="about-title">About Metrix Media</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p data-testid="about-story">
                Founded by Nick in 2020, Metrix Media emerged from a simple observation: traditional marketing wasn't keeping up with how people actually consume content online.
              </p>
              <p data-testid="about-mission">
                We specialize in creating authentic, engaging content that resonates with modern audiences. From viral meme marketing to sophisticated paid advertising campaigns, we bridge the gap between entertainment and conversion.
              </p>
              <p data-testid="about-approach">
                Our data-driven approach ensures every campaign delivers measurable results, while our creative team keeps your brand at the forefront of digital culture.
              </p>
            </div>
            
            {/* Mission Points */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start space-x-4" data-testid="mission-data-driven">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-primary-foreground text-sm" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data-Driven Strategy</h4>
                  <p className="text-muted-foreground">Every decision backed by analytics and performance metrics</p>
                </div>
              </div>
              <div className="flex items-start space-x-4" data-testid="mission-creative">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-primary-foreground text-sm" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Creative Excellence</h4>
                  <p className="text-muted-foreground">Award-winning content that captures attention and drives engagement</p>
                </div>
              </div>
              <div className="flex items-start space-x-4" data-testid="mission-results">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-primary-foreground text-sm" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Measurable Results</h4>
                  <p className="text-muted-foreground">Transparent reporting and clear ROI on every campaign</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Metrix Media team collaboration" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="img-team-collaboration"
            />
            
            {/* Floating stats card */}
            <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-lg border border-border" data-testid="card-experience">
              <div className="text-3xl font-bold text-primary">5 Years</div>
              <div className="text-muted-foreground">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
