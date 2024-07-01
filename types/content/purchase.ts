interface ContentPurchaseRequest {
  content_id: number;
  data: any;
  purchase_name?: string | null;
  pin?: string | null;
  phone?: string | null;
}

interface ContentPurchaseResponse {
  data: {
    purchase_id: string;
  };
}

export type { ContentPurchaseRequest, ContentPurchaseResponse };
