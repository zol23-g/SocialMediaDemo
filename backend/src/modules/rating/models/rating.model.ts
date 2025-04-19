// --- src/modules/rating/models/rating.model.ts ---
export interface Rating {
    id: number;
    value: number;
    userId: number;
    postId: number;
  }