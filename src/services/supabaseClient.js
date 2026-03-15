import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = () => localStorage.getItem('supabase_url') || '';
const getSupabaseKey = () => localStorage.getItem('supabase_key') || '';

// Singleton-like getter to initialize only when API keys are present
export const getSupabaseClient = () => {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  
  if (!url || !key) {
    return null;
  }
  
  return createClient(url, key);
};

export const saveResumeToDatabase = async (resumeData, templateStr) => {
  const supabase = getSupabaseClient();
  if (!supabase) return { error: "Supabase credentials not configured in Settings." };

  try {
    const { data, error } = await supabase
      .from('resumes')
      .insert([
        { 
          resume_data: resumeData, 
          template: templateStr,
          created_at: new Date().toISOString()
        }
      ]);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Database save error:", error);
    return { error: error.message };
  }
};
