// --- src/modules/comment/models/comment.model.ts ---
export interface Comment {
    id: number;
    content: string;
    timestamp: string;
    userId: number;
    postId: number;
    parentId?: number;
  }