import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Loader2 } from 'lucide-react';
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

  // Safely get nested translation values with fallback
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
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-8 sm:py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* Form Section */}
          <div className="bg-secondary/30 p-6 sm:p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-center text-primary">{getTranslation('contact.form.title', 'Contact Us')}</h2>
            <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">{getTranslation('contact.subtitle', 'Fill out the form below and I\'ll get back to you as soon as possible.')}</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1"><label htmlFor="name" className="text-sm font-medium">{getTranslation('contact.form.name', 'Name')}</label><Input id="name" name="name" type="text" placeholder={getTranslation('contact.form.namePlaceholder', 'Your Name')} value={formData.name} onChange={handleChange} required className="bg-background"/></div>
              <div className="space-y-1"><label htmlFor="email" className="text-sm font-medium">{getTranslation('contact.form.email', 'Email')}</label><Input id="email" name="email" type="email" placeholder={getTranslation('contact.form.emailPlaceholder', 'Your Email')} value={formData.email} onChange={handleChange} required className="bg-background"/></div>
              <div className="space-y-1"><label htmlFor="subject" className="text-sm font-medium">{getTranslation('contact.form.subject', 'Subject')}</label><Input id="subject" name="subject" type="text" placeholder={getTranslation('contact.form.subjectPlaceholder', 'What is this about?')} value={formData.subject} onChange={handleChange} className="bg-background"/></div>
              <div className="space-y-1">
                <label htmlFor="reason" className="text-sm font-medium">{getTranslation('contact.form.reason.label', 'Reason for contact')}</label>
                <Select onValueChange={handleReasonChange} value={formData.reason}>
                  <SelectTrigger id="reason" className="w-full bg-background"><SelectValue placeholder={getTranslation('contact.form.reason.placeholder', 'Select a reason')} /></SelectTrigger>
                  <SelectContent>{contactReasons.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-1"><label htmlFor="message" className="text-sm font-medium">{getTranslation('contact.form.message', 'Message')}</label><Textarea id="message" name="message" placeholder={getTranslation('contact.form.messagePlaceholder', 'Your message here...')} value={formData.message} onChange={handleChange} required rows={3} className="bg-background"/></div>
              <div className="md:col-span-2">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full mt-2">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{getTranslation('contact.form.sending', 'Sending...')}</> : <><Send className="mr-2 h-4 w-4" /> {getTranslation('contact.form.submit', 'Send Message')}</>}
                </Button>
              </div>
            </form>
          </div>

          {/* Other Contact Methods Section */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-foreground">{getTranslation('contact.options.title', 'Other Ways to Connect')}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <a href={`mailto:${getTranslation('contact.options.email', 'williambechay@hotmail.com')}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors"><Mail className="mr-2 w-4 h-4"/>{getTranslation('contact.options.email', 'williambechay@hotmail.com')}</a>
              <div className="flex items-center gap-4">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;