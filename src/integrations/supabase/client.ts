// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gwrpzshjodnlffyssokx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cnB6c2hqb2RubGZmeXNzb2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjcwMjIsImV4cCI6MjA0ODcwMzAyMn0.Y54S52QtRwUSonIs1n_GNhEG-SNA-bF8JWA_ztJFpCs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);