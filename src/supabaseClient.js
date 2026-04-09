import { createClient } from '@supabase/supabase-js'

// إعدادات الربط الخاصة بنظام النزيه للمحاسبة
const supabaseUrl = 'https://fbhb4dip_tltvpqpwglt.supabase.co' 
const supabaseAnonKey = 'sb_publishable_ZjaWX6-4ze1xAmSd2SXLog_axq6Lpml'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

