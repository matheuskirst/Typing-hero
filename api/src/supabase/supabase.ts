import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.DATABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Database URL and or Key were not found")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
