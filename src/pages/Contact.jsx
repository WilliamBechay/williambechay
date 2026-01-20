import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Loader2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const Contact = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTranslation = (path, fallback) => {
    if (!translations) return fallback;
    return path.split('.').reduce((obj, key) => obj && obj[key], translations) || fallback;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonChange = (value) => {
    setFormData((prev) => ({ ...prev, reason: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, reason, message } = formData;
    const { error } = await supabase.from('contact_messages').insert([{ name, email, subject, reason, message }]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: getTranslation('contact.toast.error.title', 'Error!'),
        description: getTranslation('contact.toast.error.description', 'Your message could not be sent. Please try again.'),
        variant: 'destructive',
      });
      console.error('Error submitting form:', error);
    } else {
      toast({
        title: getTranslation('contact.toast.success.title', 'Message Sent!'),
        description: getTranslation('contact.toast.success.description', 'Thank you for your message. I will get back to you shortly.'),
      });
      setFormData({ name: '', email: '', subject: '', reason: '', message: '' });
    }
  };

  const contactReasons = [
    { value: "project", label: getTranslation("contact.form.reason.project", "New Project Inquiry") },
    { value: "bug", label: getTranslation("contact.form.reason.bug", "Bug Report") },
    { value: "collaboration", label: getTranslation("contact.form.reason.collaboration", "Collaboration Proposal") },
    { value: "general", label: getTranslation("contact.form.reason.general", "General Question") },
  ];
  
  const socialLinks = [
    { href: 'https://www.linkedin.com/in/william-bechay', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" /> },
    { href: 'https://github.com/williambechay', label: 'GitHub', icon: <Github className="w-5 h-5" /> },
  ];

  return (
    <>
      <Helmet>
        <title>{getTranslation('contact.meta.title', 'Contact - William Béchay')}</title>
        <meta name="description" content={getTranslation('contact.meta.description', 'Get in touch with William Béchay. Send a message for project inquiries, collaborations, or general questions.')} />
      </Helmet>
      
      <div className="relative min-h-[calc(100vh-8rem)] py-12 md:py-16 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent animate-gradient-xy" />
        <div className="absolute top-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8 md:mb-12 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg"
              >
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                {getTranslation('contact.form.title', 'Get In Touch')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                {getTranslation('contact.subtitle', "Fill out the form below and I'll get back to you as soon as possible.")}
              </p>
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl mb-8 md:mb-12"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {getTranslation('contact.form.name', 'Name')}
                  </label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder={getTranslation('contact.form.namePlaceholder', 'Your Name')} 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {getTranslation('contact.form.email', 'Email')}
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder={getTranslation('contact.form.emailPlaceholder', 'Your Email')} 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    {getTranslation('contact.form.subject', 'Subject')}
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    type="text" 
                    placeholder={getTranslation('contact.form.subjectPlaceholder', 'What is this about?')} 
                    value={formData.subject} 
                    onChange={handleChange} 
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium text-foreground">
                    {getTranslation('contact.form.reason.label', 'Reason for contact')}
                  </label>
                  <Select onValueChange={handleReasonChange} value={formData.reason}>
                    <SelectTrigger id="reason" className="w-full bg-background/50 border-border/50 focus:border-primary transition-colors">
                      <SelectValue placeholder={getTranslation('contact.form.reason.placeholder', 'Select a reason')} />
                    </SelectTrigger>
                    <SelectContent>
                      {contactReasons.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {getTranslation('contact.form.message', 'Message')}
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder={getTranslation('contact.form.messagePlaceholder', 'Your message here...')} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={5} 
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {getTranslation('contact.form.sending', 'Sending...')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> 
                        {getTranslation('contact.form.submit', 'Send Message')}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Other Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {getTranslation('contact.options.title', 'Other Ways to Connect')}
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href={`mailto:${getTranslation('contact.options.email', 'williambechay@hotmail.com')}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5"/>
                  <span className="text-sm md:text-base">{getTranslation('contact.options.email', 'williambechay@hotmail.com')}</span>
                </a>
                
                <div className="flex items-center gap-4">
                  {socialLinks.map(link => (
                    <a 
                      key={link.label} 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={link.label} 
                      className="p-3 rounded-xl glass hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-border/50">
                <p className="text-muted-foreground">{getTranslation('contact.helpText', 'Need help on a project? You can contact me.')}</p>
                <p className="text-sm font-medium bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic">
                  {getTranslation('contact.tagline', "Can't build it, can't understand it.")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;