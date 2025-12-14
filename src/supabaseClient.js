import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyucusumuvcjnuakeuwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dWN1c3VtdXZjam51YWtldXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzU4MDEsImV4cCI6MjA4MTMxMTgwMX0.lAf-CvLacYS7OmY87OHqUle82yl_QBLrt60lUBBB6Ss';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
