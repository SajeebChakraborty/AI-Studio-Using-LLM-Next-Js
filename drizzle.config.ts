// Drizzle config - database functionality has been removed
// This file is kept to prevent errors but is not used

export default {
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: '',
  },
};
