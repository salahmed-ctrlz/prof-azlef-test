import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import heroImage from "@/assets/hero-image.png";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes." }),
  
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes." }),
  
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(100, { message: "Subject cannot exceed 100 characters." }),
  
  mobileRegion: z.enum(["algeria", "other"]),
  
  mobile: z
    .string()
    .min(8, { message: "Mobile number must be at least 8 characters." })
    .max(15, { message: "Mobile number cannot exceed 15 characters." })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number." }),
  
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message cannot exceed 1000 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const socialLinks = [
  {
    icon: "fas fa-envelope",
    title: "Email",
    link: "mailto:azlef.iskandar@gmail.com",
    text: "azlef.iskandar@gmail.com"
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Location",
    text: "Annaba, Algeria"
  },
  {
    icon: "fab fa-whatsapp",
    title: "Phone/WhatsApp",
    link: "tel:+213558502936",
    text: "+213 558 502 936"
  },
  {
    icon: "fab fa-instagram",
    title: "Instagram",
    link: "https://instagram.com/prof.azlef/",
    text: "@prof.azlef",
    description: "Community of 25,000+ followers",
    isExternal: true
  }
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgAnimationRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const controls = useAnimation();
  
  // Background animation effect
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { duration: 1.5 }
      });
    }
  }, [isInView, controls]);

  // Handle parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgAnimationRef.current) return;
      
      const elements = bgAnimationRef.current.querySelectorAll('.bg-element') as NodeListOf<HTMLElement>;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((el: HTMLElement, i: number) => {
        const depth = 1 + (i % 3) * 0.5;
        const moveX = (clientX - innerWidth / 2) / (50 / depth);
        const moveY = (clientY - innerHeight / 2) / (50 / depth);
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      mobileRegion: "algeria",
      mobile: "",
      message: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form data:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      setFormSubmitted(true);
      form.reset();
      setTimeout(() => {
        setFormSubmitted(false);
      }, 8000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Generate background elements
  const generateBgElements = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.04 + 0.01,
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15,
    }));
  };

  const bgElements = generateBgElements(8);

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
      ref={sectionRef}
    >
      {/* Hero-like Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-dark via-brown to-brown-dark overflow-hidden">
        <div ref={bgAnimationRef} className="absolute inset-0">
          {bgElements.map((el) => (
            <motion.div
              key={el.id}
              className="absolute rounded-full bg-element bg-gold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
              style={{
                width: `${el.size}px`,
                height: `${el.size}px`,
                left: `${el.x}%`,
                top: `${el.y}%`,
                opacity: el.opacity,
                filter: 'blur(30px)',
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 70% 60%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 40% 80%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 60% 20%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold/80 text-sm tracking-wider uppercase font-medium mb-2">REACH OUT</span>
          <h2 className="font-balooBhaijaan text-4xl md:text-5xl lg:text-6xl mb-4 text-gold">Let's Connect</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-1 bg-gold/70 mx-auto rounded-full mb-6"
          />
          <p className="mt-4 max-w-2xl mx-auto text-beige text-lg leading-relaxed">
            Interested in booking a session, discussing educational collaborations, or have questions? Reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Modern Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="card w-full max-w-md mx-auto lg:ml-0">
              <button className="mail">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </button>
              
              <div className="profile-pic">
                <img 
                  src={heroImage} 
                  alt="Iskandar Azlef" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="bottom">
                <div className="content">
                  <span className="name">Iskandar Azlef</span>
                  <span className="about-me">
                    Educator and content creator based in Annaba, Algeria. 
                    Passionate about transforming educational experiences through innovative teaching.
                  </span>
                </div>
                
                <div className="bottom-bottom">
                  <div className="social-links-container">
                    <a href="mailto:azlef.iskandar@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </a>
                    
                    <a href="https://instagram.com/prof.azlef/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                      </svg>
                    </a>
                    
                    <a href="tel:+213558502936" aria-label="WhatsApp">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                    </a>
                    
                    <a href="https://linkedin.com/in/iskander-azlef" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                      </svg>
                    </a>
                  </div>
                  
                  <a 
                    href="mailto:azlef.iskandar@gmail.com" 
                    className="button"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
            
            {/* Additional Contact Info */}
            <div className="mt-8 bg-brown/90 p-6 rounded-xl border border-gold/10 backdrop-blur-sm shadow-lg">
              <h3 className="font-balooBhaijaan text-xl text-gold mb-4">Contact Information</h3>
              
              <div className="space-y-5">
                {socialLinks.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-4 relative overflow-hidden group"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-gold/5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-lg"></div>
                    
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:bg-gold/30 transition-colors">
                      <i className={`${item.icon} text-gold text-lg`}></i>
                    </div>
                    
                    <div className="z-10">
                      <h4 className="font-balooBhaijaan text-lg text-beige mb-1">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-gold hover:text-gold-light transition-colors block"
                          target={item.isExternal ? "_blank" : undefined}
                          rel={item.isExternal ? "noopener noreferrer" : undefined}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gold">{item.text}</span>
                      )}
                      {item.description && (
                        <p className="text-sm text-beige-light/80 mt-1">{item.description}</p>
                      )}
                    </div>
                    
                    {hoveredSocial === index && item.link && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold"
                      >
                        <i className="fas fa-arrow-right"></i>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 bg-brown-dark/30 p-4 rounded-lg">
                <p className="text-beige-light text-center italic">
                  "I strive to respond to all messages within 24-48 hours. Looking forward to hearing from you!"
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-brown/90 p-8 rounded-xl shadow-lg border border-gold/10 backdrop-blur-sm">
              <h3 className="font-balooBhaijaan text-2xl text-gold mb-6">Book a Session</h3>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-gradient-to-r from-gold/20 to-gold/10 rounded-xl border border-gold/30 shadow-lg text-center"
                >
                  <div className="mb-6 w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <i className="fas fa-check text-gold text-3xl"></i>
                  </div>
                  <h4 className="text-gold text-2xl font-balooBhaijaan mb-3">Message Sent!</h4>
                  <p className="text-beige mb-6">
                    Thank you for reaching out! I'll respond to your message within 24-48 hours.
                  </p>
                  <p className="text-beige-light/80 text-sm mb-4">
                    This form will reset in a few seconds, or you can manually reset it now.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="bg-gold/30 hover:bg-gold/40 text-gold hover:text-gold-light border border-gold/30 px-6 py-2 rounded-full transition-all hover:shadow-gold"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="p-6 rounded-lg bg-brown-dark/30 border border-gold/10 mb-2">
                    <h4 className="text-gold text-lg font-balooBhaijaan mb-4">Personal Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-beige-light">First Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Your first name"
                                className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-beige-light">Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Your last name"
                                className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-beige-light">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                type="email"
                                placeholder="your.email@example.com"
                                className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                      <div className="md:col-span-1">
                        <FormField
                          control={form.control}
                          name="mobileRegion"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-beige-light">Region</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2 mt-2"
                                >
                                  <div className="flex items-center space-x-2 bg-brown-dark/20 p-2 rounded-lg transition-colors hover:bg-brown-dark/30">
                                    <RadioGroupItem value="algeria" id="algeria" className="text-gold border-gold" />
                                    <FormLabel htmlFor="algeria" className="text-beige-light font-normal cursor-pointer m-0">
                                      Algeria (+213)
                                    </FormLabel>
                                  </div>
                                  <div className="flex items-center space-x-2 bg-brown-dark/20 p-2 rounded-lg transition-colors hover:bg-brown-dark/30">
                                    <RadioGroupItem value="other" id="other" className="text-gold border-gold" />
                                    <FormLabel htmlFor="other" className="text-beige-light font-normal cursor-pointer m-0">
                                      Other
                                    </FormLabel>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-beige-light">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field}
                                  type="tel"
                                  placeholder={form.watch('mobileRegion') === 'algeria' ? "05X XXX XXXX" : "+XX XXX XXX XXXX"}
                                  className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Details */}
                  <div className="p-6 rounded-lg bg-brown-dark/30 border border-gold/10 mt-6">
                    <h4 className="text-gold text-lg font-balooBhaijaan mb-4">Your Message</h4>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-beige-light">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="What is your message about?"
                              className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-beige-light">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field}
                                rows={5}
                                placeholder="Type your message here..."
                                className="bg-brown-light/20 backdrop-blur-sm border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold text-beige resize-none"
                              />
                            </FormControl>
                            <div className="flex justify-between mt-1">
                              <FormMessage className="text-red-400" />
                              <div className="text-xs text-beige-light/70">
                                {field.value.length} / 1000 characters
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className="w-full relative overflow-hidden bg-gold text-brown font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg border-2 border-gold flex items-center justify-center gap-2 group"
                    disabled={form.formState.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Button glow effect */}
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-brown border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <motion.i 
                          className="fas fa-paper-plane" 
                          initial={{ x: 0 }}
                          whileHover={{ x: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <span className="relative z-10">Send Message</span>
                        <motion.i 
                          className="fas fa-long-arrow-alt-right ml-1 opacity-0 group-hover:opacity-100"
                          initial={{ x: -5, opacity: 0 }}
                          whileHover={{ x: 5, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      </>
                    )}
                  </motion.button>
                </form>
              </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for the contact card */}
      <style>{`
        .card {
          background: rgba(69, 41, 32, 0.85);
          border-radius: 32px;
          padding: 3px;
          position: relative;
          box-shadow: 0px 70px 30px -50px rgba(96, 75, 74, 0.3);
          transition: all 0.5s ease-in-out;
          height: 350px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 163, 115, 0.2);
        }

        .card .mail {
          position: absolute;
          right: 2rem;
          top: 1.4rem;
          background: transparent;
          border: none;
          z-index: 10;
        }

        .card .mail svg {
          stroke: #D4A373;
          stroke-width: 3px;
          transition: stroke 0.3s ease;
        }

        .card .mail svg:hover {
          stroke: #f5e2c9;
        }

        .card .profile-pic {
          position: relative;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          top: 3px;
          left: 3px;
          border-radius: 40px;
          z-index: 1;
          border: 0px solid rgba(252, 194, 137, 0.36);
          overflow: hidden;
          transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
        }

        .card .bottom {
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          background:rgb(112, 85, 57);
          top: 80%;
          border-radius: 29px;
          z-index: 2;
          box-shadow: inset 0px 5px 5px 0px rgba(96, 75, 74, 0.19);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
        }

        .card .bottom .content {
          margin-top: 4rem;
          position: absolute;
          margin-bottom: 3rem;
          bottom: 0;
          left: 1.5rem;
          right: 1.5rem;
          height: 160px;
        }

        .card .bottom .content .name {
          font-size: 2rem;
          color: white;
          font-weight: bold;
          font-family: 'BalooBhaijaan', sans-serif;
        }

        .card .bottom .content .about-me {
          position: absolute;
          margin-bottom: 1rem;
          display: block;
          font-size: 1rem;
          color: rgb(255, 255, 255);
        }

        .card .bottom .bottom-bottom {
          position: absolute;
          bottom: 1rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card .bottom .bottom-bottom .social-links-container {
          display: flex;
          gap: 1rem;
        }

        .card .bottom .bottom-bottom .social-links-container svg {
          height: 20px;
          fill: white;
          filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.13));
          transition: all 0.3s ease;
        }

        .card .bottom .bottom-bottom .social-links-container svg:hover {
          fill: #503620;
          transform: scale(1.2);
        }

        .card .bottom .bottom-bottom .button {
          background: rgba(165, 132, 130, 0.13);
          color:rgb(255, 255, 255);
          border: none;
          border-radius: 24px;
          font-size: 0.75rem;
          padding: 0.4rem 0.8rem;
          box-shadow: 0px 5px 5px 0px rgba(165, 132, 130, 0.13);
          transition: all 0.3s ease;
          cursor: pointer;
          font-weight: 600;
        }

        .card .bottom .bottom-bottom .button:hover {
          background: #503620;
          color: white;
        }

        .card:hover {
          border-top-left-radius: 55px;
        }

        .card:hover .bottom {
          top: 20%;
          border-radius: 80px 29px 29px 29px;
          transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
        }

        .card:hover .profile-pic {
          width: 100px;
          height: 100px;
          aspect-ratio: 1;
          top: 10px;
          left: 10px;
          border-radius: 50%;
          z-index: 3;
          border: 4px solid  #D4A373;
          box-shadow: 0px 5px 5px 0px rgba(96, 75, 74, 0.19);
          transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
        }

        .card:hover .profile-pic:hover {
          transform: scale(1.3);
          border-radius: 40px;
        }
      `}</style>
    </section>
  );
};

export default Contact;