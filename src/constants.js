export const isProduction = import.meta.env.MODE === 'production';
export const dbUrl = isProduction ? 'https://pgbouncertest.onrender.com' : '/api';
export const supavisorUrl = isProduction ? 'https://supavisortest.onrender.com' : '/api';
