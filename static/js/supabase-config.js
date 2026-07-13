(function () {
  'use strict';

  const SUPABASE_URL =
    'https://ossxhmlwjlnnvbdfnltu.supabase.co';

  const SUPABASE_PUBLISHABLE_KEY =
    'sb_publishable_O2HZ06zOteRorwcYAJYTqw_azmfAwLE';

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error('A biblioteca do Supabase não foi carregada.');
  }

  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  console.info('Supabase conectado.');
})();