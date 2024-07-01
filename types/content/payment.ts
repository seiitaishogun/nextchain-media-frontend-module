interface PaymentHashRequest {
  name: string;
  phone: string;
  pin: string;
  price: number;
  date: number;
}

interface PaymentHashResponse {
  data: {
    payment_hash: string;
    purchase_hash: string;
  };
}

export type { PaymentHashRequest, PaymentHashResponse };
