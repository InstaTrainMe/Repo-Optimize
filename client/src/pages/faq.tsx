import { useLocation } from "wouter";
import { useEffect } from "react";
import { useCanonical } from "@/hooks/useCanonical";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigation } from "@/components/navigation";
import { Mail } from "lucide-react";

function SEOHead({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  useEffect(() => {
    document.title = "FAQ - InstaTrainMe® | Frequently Asked Questions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Find answers to common questions about InstaTrainMe® - booking trainers, payments, certifications, cancellation policy, and more.");
    }

    const existingSchema = document.querySelector('script[data-schema="faq"]');
    if (existingSchema) existingSchema.remove();

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "faq");
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="faq"]');
      if (schemaScript) schemaScript.remove();
    };
  }, [faqs]);

  return null;
}

const faqs = [
  {
    id: "what-is",
    question: "What is InstaTrainMe®?",
    answer: "InstaTrainMe® is a fitness marketplace app that instantly connects you with certified personal trainers, yoga instructors, and sports coaches. Whether you need on-demand training or want to schedule sessions, we make it easy to find qualified fitness professionals in your area or online."
  },
  {
    id: "how-to-book",
    question: "How do I book a trainer?",
    answer: "Simply download the InstaTrainMe® app, create your profile, and browse through our network of certified trainers. You can filter by location, specialization, ratings, and availability. Once you find your ideal trainer, select your preferred session type (on-demand or scheduled) and book instantly through the app."
  },
  {
    id: "trainers-certified",
    question: "Are all trainers certified?",
    answer: "Yes! Every trainer on InstaTrainMe® is thoroughly vetted and verified. We require all trainers to provide proof of certification from recognized fitness organizations. We verify credentials, background checks, and insurance to ensure you're working with qualified professionals."
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment gateway. All transactions are encrypted and protected. You'll only be charged when you confirm your booking, and you can view all payment history in your app."
  },
  {
    id: "virtual-or-inperson",
    question: "Can I train virtually or does it have to be in person?",
    answer: "You have the flexibility to choose! InstaTrainMe® supports both virtual training sessions (via video call within the app) and onsite training at your preferred location. When booking, simply select your preferred session type based on what works best for you."
  },
  {
    id: "cancellation-policy",
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation options. You can cancel scheduled sessions up to 24 hours before the session start time for a full refund. Cancellations made within 24 hours may incur a cancellation fee. On-demand sessions can be cancelled within 15 minutes of booking for a full refund."
  },
  {
    id: "communication",
    question: "How do I communicate with my trainer?",
    answer: "InstaTrainMe® has a secure in-app messaging system where you can communicate with your trainer before, during, and after sessions. All communication happens within the app to protect your privacy and security. You can discuss workout plans, ask questions, and coordinate session details."
  },
  {
    id: "rebook-trainer",
    question: "Can I rebook the same trainer?",
    answer: "Absolutely! If you find a trainer you love, you can easily rebook them for future sessions. Your favorite trainers are saved in your profile, making it quick and convenient to schedule repeat sessions. Many users build ongoing relationships with their preferred trainers."
  },
  {
    id: "training-types",
    question: "What types of training are available?",
    answer: "InstaTrainMe® offers diverse training options including personal training, yoga, pilates, boxing, kickboxing, sports-specific coaching, nutrition counseling, strength training, cardio training, HIIT, bootcamp, and more. Each trainer lists their specializations, so you can find the perfect fit for your fitness goals."
  },
  {
    id: "membership-fee",
    question: "Is there a minimum commitment or membership fee?",
    answer: "No! Unlike traditional gyms, InstaTrainMe® has no membership fees or long-term commitments. You simply pay for the sessions you book. This gives you complete flexibility to train as often or as little as you want, without being locked into contracts."
  },
  {
    id: "become-trainer",
    question: "How do I become a trainer on InstaTrainMe®?",
    answer: "If you're a certified fitness professional, you can apply through our Partners section on the home page. We'll review your credentials, certifications, and experience. Once approved, you'll gain access to our platform to connect with clients, manage your schedule, and grow your fitness business."
  }
];

export default function FAQ() {
  useCanonical("/faq");
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead faqs={faqs} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90">
            Find answers to common questions about InstaTrainMe®
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border rounded-lg px-6 bg-card shadow-sm"
                data-testid={`faq-item-${faq.id}`}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5" data-testid={`faq-trigger-${faq.id}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed" data-testid={`faq-content-${faq.id}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-5 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="text-still-questions">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our support team is here to help you
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
            onClick={() => window.open("https://support.instatrainme.com/support/home", "_blank")}
            data-testid="button-contact-us"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
