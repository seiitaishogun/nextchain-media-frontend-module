enum ContentTypeE {
  Saju = 'saju',
  Tarot = 'tarot',
}

interface ContentTypeT {
  id: number;
  name: ContentTypeE;
  description: string;
  is_skip: boolean;
}

interface ContentFileT {
  id: number;
  name: string;
  path: string;
}

export type { ContentTypeT, ContentFileT };
export { ContentTypeE };
