import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zimwtaobvrruqxpfbnwl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbXd0YW9idnJydXF4cGZibndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNzA5MjUsImV4cCI6MjA3OTk0NjkyNX0.dv7SAzXZZCTCEIf7NF5W_13W1QUpjkOS39BN7FESMDQ';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
