// services/envAdapter.ts
export const envAdapter = {
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000',
    API_KEY: process.env.API_KEY || 'default-api-key',
    NODE_ENV: process.env.NODE_ENV || 'development',
};
