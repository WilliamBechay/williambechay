import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { LogOut } from 'lucide-react';

const Admin = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: translations.contact.toast.error.title,
        description: 'Failed to fetch messages.',
        variant: 'destructive',
      });
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    const { data, error } = await supabase.functions.invoke('verify-admin-password', {
      body: { password },
    });
    
    setIsVerifying(false);

    if (error || !data?.success) {
      toast({
        title: 'Authentication Failed',
        description: translations.admin.login.error,
        variant: 'destructive',
      });
      console.error('Login error:', error || data?.error);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setMessages([]);
  };

  if (!translations) return null;

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{translations.admin.meta.title}</title>
          <meta name="description" content={translations.admin.meta.description} />
        </Helmet>
        <div className="container mx-auto px-4 py-16 sm:py-24 flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <div className="bg-secondary/50 p-8 rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold text-center mb-2 text-primary">
                {translations.admin.login.title}
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                {translations.admin.login.subtitle}
              </p>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    {translations.admin.login.password}
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={translations.admin.login.passwordPlaceholder}
                    required
                    className="bg-background border-border"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isVerifying}>
                  {isVerifying ? translations.admin.login.verifying : translations.admin.login.submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
  
  const getReasonLabel = (reasonKey) => {
    const reasonTranslations = translations?.contact?.form?.reason;
    if (!reasonTranslations) return reasonKey;
    
    const reasons = {
      project: reasonTranslations.project,
      bug: reasonTranslations.bug,
      collaboration: reasonTranslations.collaboration,
      general: reasonTranslations.general
    };
    return reasons[reasonKey] || reasonKey;
  }

  return (
    <>
      <Helmet>
        <title>{translations.admin.meta.title}</title>
        <meta name="description" content={translations.admin.meta.description} />
      </Helmet>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                {translations.admin.dashboard.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                {translations.admin.dashboard.subtitle}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {translations.admin.dashboard.logout}
            </Button>
          </div>
          
          <div className="bg-secondary/30 rounded-lg overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.name}</th>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.email}</th>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.reason}</th>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.subject}</th>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.message}</th>
                    <th className="px-6 py-3 font-medium text-foreground">{translations.admin.dashboard.date}</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-muted-foreground">Loading messages...</td>
                      </tr>
                    ) : messages.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-muted-foreground">{translations.admin.dashboard.noMessages}</td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <motion.tr
                          key={msg.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-border/50 hover:bg-secondary/40 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-foreground">{msg.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{msg.email}</td>
                          <td className="px-6 py-4 text-muted-foreground">{getReasonLabel(msg.reason) || '-'}</td>
                          <td className="px-6 py-4 text-muted-foreground">{msg.subject || '-'}</td>
                          <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">{msg.message}</td>
                          <td className="px-6 py-4 text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Admin;