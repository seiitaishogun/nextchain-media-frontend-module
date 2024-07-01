import { ContentDetailT } from '@module/types/content/detail';
import { CalendarE, GenderE, MaritalE } from '@module/types/user';
import {
  ChildrenDataT,
  OriginChildrenT,
  OriginParentT,
  ParentT,
} from '@module/types/content/fortune';

interface PurchaseUserT {
  name: string;
  gender: GenderE;
  marital: MaritalE;
  birthed_at: string;
  calendar: CalendarE;
}

interface PurchaseT extends PurchaseUserT {
  content_id: number;
  is_birthed_time: boolean;
  value: string | null;
  available_at: string;
  id: number;
  partner: PurchaseUserT | null;
}

interface DaeunT {
  order: string;
  daeunsu: number;
  ganji: string[];
}

interface SajuT {
  cheongan: string[][];
  daeun: {
    name: string;
    gan: string[];
    ji: string[];
    age: string[];
  };
  jiji: string[][];
}

interface OriginContentResultT {
  children: OriginChildrenT[];
  children_data: ChildrenDataT[];
  content: ContentDetailT;
  daeun: DaeunT;
  parents: OriginParentT[];
  purchase: PurchaseT;
  saju: SajuT[];
}

interface ContentResultT
  extends OriginContentResultT {
  parents: ParentT[];
}

interface ContentResultRequest {
  id: number;
  share_code?: string;
  purchase_hash?: string;
}

interface ContentResultResponse {
  data: OriginContentResultT;
}

export type {
  ContentResultRequest,
  ContentResultResponse,
  OriginContentResultT,
  DaeunT,
  SajuT,
  PurchaseT,
  PurchaseUserT,
  ContentResultT,
};
