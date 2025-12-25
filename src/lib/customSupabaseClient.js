import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxzicdjsyxsaxhsqdfko.supabase.co';
const supabaseAnonKey = 'sb_publishable_YH3VurNFDsKExRaIb_4Ijg_yjL2RCxG';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
