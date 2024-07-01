interface FeedbackT {
  id: number;
  name: string;
  count: number;
}

interface FeedbackShowRequest {
  content_id: number;
  purchase_id?: number;
}

interface FeedbackShowResponse {
  data: {
    feedback: FeedbackT[];
    status: 1 | 2 | 3 | null;
  };
}

interface FeedbackStoreRequest {
  purchase_id: number;
  feedback_id: number;
}

type FeedbackStoreResponse = boolean;

interface FeedbackStoreErrorResponse {
  data: {
    message: string;
  };
}

export type {
  FeedbackT,
  FeedbackShowRequest,
  FeedbackShowResponse,
  FeedbackStoreRequest,
  FeedbackStoreResponse,
  FeedbackStoreErrorResponse,
};
