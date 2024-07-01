interface OriginParentT {
  id: number;
  name: string | 'null';
  order: number;
}

interface ParentT extends OriginParentT {
  children: ChildrenT[];
}

interface OriginChildrenT {
  count: number;
  id: number;
  name: string | 'null';
  order: number;
  parent_id: number;
  sign: string | null;
}

interface ChildrenT extends OriginChildrenT {
  first_template_id: number;
  children_data: ChildrenDataT[];
}

interface ChildrenDataT {
  child_id: number;
  contents: string | null;
  fortune_id: number;
  id: number;
  name: string | null;
  summary: string | null;
  template: { id: number; name: string };
  type: { id: number; name: string };
}

export type {
  OriginParentT,
  OriginChildrenT,
  ChildrenDataT,
  ParentT,
  ChildrenT,
};
