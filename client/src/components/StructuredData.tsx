export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Metrix Media",
    "description": "Professional digital marketing agency specializing in viral content, meme marketing, paid advertising, and data-driven campaigns.",
    "url": "https://metrixmedia.com",
    "logo": "https://metrixmedia.com/metrix-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-8900",
      "contactType": "customer service",
      "email": "hello@metrixmedia.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/metrixmedia",
      "https://instagram.com/metrixmedia", 
      "https://linkedin.com/company/metrixmedia",
      "https://tiktok.com/@metrixmedia"
    ],
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Nick"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "Organization",
      "name": "Metrix Media"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meme Marketing",
            "description": "Viral content creation that connects with Gen Z and Millennial audiences"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Campaign Management",
            "description": "End-to-end campaign strategy, execution, and optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Paid Advertising",
            "description": "Data-driven paid advertising across social media platforms"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Creation", 
            "description": "High-quality video, graphic, and written content"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Metrix Media",
    "url": "https://metrixmedia.com",
    "description": "Digital Marketing That Drives Results",
    "publisher": {
      "@type": "Organization",
      "name": "Metrix Media"
    }
  };

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}