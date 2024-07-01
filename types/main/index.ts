import { TagT } from '@module/types/common';

interface MainContentT {
  id: number;
  name: string;
  summary: string;
  is_new: boolean;
  is_hot: boolean;
  thumbnail: string | null;
  thumbnail_large: string | null;
  tags: TagT[];
}

interface MainContentResponse {
  data: MainContentT[];
}

export type { MainContentT, MainContentResponse };
