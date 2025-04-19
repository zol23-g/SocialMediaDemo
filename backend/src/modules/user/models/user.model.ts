// --- src/modules/user/models/user.model.ts ---
export interface User {
    id: number;
    username: string;
    email: string;
    bio?: string;
    profilePic?: string;
    createdAt: string;
  }