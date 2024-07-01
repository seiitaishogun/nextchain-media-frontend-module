const enum ShareType {
  Copy = 'copy',
  KAKAO = 'kakao',
}

interface ContentShareRequest {
  path: string;
  purchase_hash?: string | null;
}

interface ContentShareResponse {
  data: string | null;
}

export { ShareType };
export type { ContentShareRequest, ContentShareResponse };
