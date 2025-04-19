// --- src/modules/post/models/post.model.ts ---
export interface Post {
    id: number;
    caption?: string;
    media: string;
    timestamp: string;
    userId: number;
  }
  