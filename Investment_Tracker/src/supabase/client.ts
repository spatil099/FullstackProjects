import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qljooxeoltfftkgwymud.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsam9veGVvbHRmZnRrZ3d5bXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMDQzMjUsImV4cCI6MjA1Mjg4MDMyNX0.MjxysCb4BJ-rVNNsk1RUGiJycxDtMvbwO2eFn5FHurg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
