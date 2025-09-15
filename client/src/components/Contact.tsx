import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SiTiktok } from "react-icons/si";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (data: any) => {
      if (data.ok) {
        toast({
          title: "Message sent!",
          description: data.message || "Thank you for your message! We'll get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="contact-title">Get Started Today</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="contact-description">
            Ready to transform your digital presence? Let's discuss how we can help you achieve your marketing goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h3 className="text-2xl font-semibold mb-6" data-testid="form-title">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-testid="label-name">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-name" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-testid="label-email">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          {...field} 
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-email" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-testid="label-company">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company name" 
                          {...field} 
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-company" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-testid="label-message">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project and goals..." 
                          rows={5}
                          className="resize-none"
                          {...field} 
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-message" />
                    </FormItem>
                  )}
                />
                
                {/* Honeypot field (hidden from users) */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem style={{ display: 'none' }}>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6" data-testid="contact-info-title">Get in touch</h3>
              <p className="text-muted-foreground text-lg leading-relaxed" data-testid="contact-info-description">
                Ready to start your next campaign? We'd love to hear about your project and discuss how we can help you achieve your marketing goals.
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4" data-testid="contact-email">
                <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="text-primary text-sm" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:hello@metrixmedia.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@metrixmedia.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4" data-testid="contact-phone">
                <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="text-primary text-sm" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4" data-testid="contact-response-time">
                <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="text-primary text-sm" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Response Time</h4>
                  <p className="text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4" data-testid="social-follow-title">Follow us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="social-twitter"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="social-instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="social-linkedin"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="social-tiktok"
                >
                  <SiTiktok size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
