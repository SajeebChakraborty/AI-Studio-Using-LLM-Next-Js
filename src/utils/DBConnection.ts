// Database connection stub - database functionality has been removed
// This file is kept to prevent import errors

export const createDbConnection = () => {
  // Return a mock db object
  return {
    query: {
      counterSchema: {
        findFirst: async () => ({ count: 0 }),
      },
    },
    insert: () => ({
      values: () => ({
        onConflictDoUpdate: () => ({
          returning: async () => [{ count: 0 }],
        }),
      }),
    }),
  };
};
