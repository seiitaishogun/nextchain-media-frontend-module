interface UpdateContentLikeRequest {
  content_id: number;
}

interface UpdateContentLikeResponse {
  data: {
    like_count: number;
  };
}

export type { UpdateContentLikeRequest, UpdateContentLikeResponse };
