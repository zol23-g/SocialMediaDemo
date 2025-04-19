// --- src/middlewares/role.ts ---
export const requireRole = (allowedRoles: string[]) => {
    return (resolve: any, parent: any, args: any, context: any, info: any) => {
      const user = context.user;
      if (!user || !allowedRoles.includes(user.role)) {
        throw new Error('Access denied');
      }
      return resolve(parent, args, context, info);
    };
  };