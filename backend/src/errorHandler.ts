// --- src/utils/errorHandler.ts ---
export const formatError = (error: any) => {
    return {
      message: error.message,
      path: error.path,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  };
  