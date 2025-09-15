import { Twitter, Instagram, Linkedin } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
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

  return (
    <footer className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6" data-testid="footer-logo">
              <img 
                src="/metrix-logo.png" 
                alt="Metrix Media Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md" data-testid="footer-description">
              Digital marketing agency specializing in viral content, meme marketing, and data-driven campaigns that deliver real results.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-social-twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-social-linkedin"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-social-tiktok"
              >
                <SiTiktok size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-quick-links-title">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-services"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('case-studies')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-case-studies"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-service-meme">
                  Meme Marketing
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-service-campaigns">
                  Campaign Management
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-service-paid-ads">
                  Paid Advertising
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-service-content">
                  Content Creation
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground" data-testid="footer-copyright">
            © 2024 Metrix Media. All rights reserved. | 
            <button className="hover:text-primary transition-colors ml-1" data-testid="footer-privacy">Privacy Policy</button> | 
            <button className="hover:text-primary transition-colors ml-1" data-testid="footer-terms">Terms of Service</button>
          </p>
        </div>
      </div>
    </footer>
  );
}
