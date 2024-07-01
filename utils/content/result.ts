import { fortuneTextReplace } from '@module/utils/content/text';
import {
  ContentResultT,
  OriginContentResultT,
} from '@module/types/content/result';

const formatContentResultData = ({
  parents: origin_parents,
  children: origin_children,
  children_data: origin_children_data,
  purchase,
  daeun,
  ...res
}: OriginContentResultT) => {
  const userName = purchase?.name || '';
  const partnerName = purchase?.partner?.name || '';
  const daeunsu = daeun?.daeunsu || '';

  let manName = '';
  if (purchase?.gender === 0) {
    manName = purchase?.name || '';
  } else if (purchase?.partner?.gender === 0) {
    manName = purchase?.partner.name || '';
  }

  let womanName = '';
  if (purchase?.gender === 1) {
    womanName = purchase?.name || '';
  } else if (purchase?.partner?.gender === 1) {
    womanName = purchase?.partner.name || '';
  }

  const parents = origin_parents
    .map(p => ({
      ...p,
      name: fortuneTextReplace({
        text: p.name,
        userName,
        partnerName,
        daeunsu,
        manName,
        womanName,
      }),
    }))
    .sort((a, b) => a.order - b.order);

  const children = origin_children
    .map(c => ({
      ...c,
      name: fortuneTextReplace({
        text: c.name,
        userName,
        partnerName,
        daeunsu,
        manName,
        womanName,
      }),
    }))
  const children_data = origin_children_data.map(d => ({
    ...d,
    name: fortuneTextReplace({
      text: d.name,
      userName,
      partnerName,
      daeunsu,
      manName,
      womanName,
    }),
    summary: fortuneTextReplace({
      text: d.summary,
      userName,
      partnerName,
      daeunsu,
      manName,
      womanName,
    }),
    contents: fortuneTextReplace({
      text: d.contents,
      userName,
      partnerName,
      daeunsu,
      manName,
      womanName,
    }),
  }));

  return {
    ...res,
    purchase,
    daeun,
    children,
    parents: parents.map((p, pI) => ({
      ...p,
      order: pI,
      children: children
        .filter(c => c.parent_id === p.id)
        .map((c, cI) => {
          const newChildrenData = children_data
            .filter(f => f.child_id === c.id)
            .map((f, fI) => ({ ...f, order: fI }));
          let template = null;
          let first_template_id = null;

          if (newChildrenData.length > 0) {
            const newTemplate = newChildrenData[0].template;
            const check = newChildrenData.every(
              e => e.template.id === newTemplate.id
            );

            if (check) {
              template = newTemplate;
            }

            first_template_id = newChildrenData[0].template.id;
          }

          return {
            ...c,
            order: cI,
            template,
            first_template_id,
            children_data: newChildrenData,
          };
        }),
    })),
  } as unknown as ContentResultT;
};

export { formatContentResultData };
