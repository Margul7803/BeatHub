// db.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKeyUser = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUser = createClient(supabaseUrl, supabaseKeyUser);

const supabaseKeyAdmin = process.env.SERVICE_ROLE;
const supabaseAdmin = createClient(supabaseUrl, supabaseKeyAdmin);

module.exports = {
  supabaseUser,
  supabaseAdmin,
};
