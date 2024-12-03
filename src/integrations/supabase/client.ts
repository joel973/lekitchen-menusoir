import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gwrpzshjodnlffyssokx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cnB6c2hqb2RubGZmeXNzb2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjcwMjIsImV4cCI6MjA0ODcwMzAyMn0.Y54S52QtRwUSonIs1n_GNhEG-SNA-bF8JWA_ztJFpCs";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Add error handling for fetch operations
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      console.error('Fetch error:', {
        status: response.status,
        statusText: response.statusText,
        url: args[0]
      });
    }
    return response;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};