import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxzicdjsyxsaxhsqdfko.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4emljZGpzeXhzYXhoc3FkZmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODYwMjIsImV4cCI6MjA4MDY2MjAyMn0.4TZMhgzTbF_lZ8aq8e745xM_iQTkwXF5kQbUA_XH4nQ';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
