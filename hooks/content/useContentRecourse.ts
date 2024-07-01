import * as yup from 'yup';
import { ContentTypeE } from '@module/types/content';
import { CalendarE } from '@module/types/user';

interface Props {
  type: ContentTypeE;
  isPartner: boolean;
  tarotCount: number;
}

function useContentRecourse({ type, isPartner, tarotCount }: Props) {
  switch (type) {
    case ContentTypeE.Saju:
      return {
        schema: isPartner
          ? yup.object().shape({
              user: sajuSchema,
              partner: sajuSchema,
              isAgree: yup.boolean().required().oneOf([true]),
            })
          : yup.object().shape({
              user: sajuSchema,
              isAgree: yup.boolean().required().oneOf([true]),
            }),
        defaultValues: {
          user: defaultSajuValues,
          partner: isPartner ? defaultSajuValues : undefined,
          isAgree: false,
        },
      };
    case ContentTypeE.Tarot:
      return {
        schema: isPartner
          ? yup.object().shape({
              tarot: yup.array().of(yup.string().required()).length(tarotCount),
              user: tarotSchema,
              partner: tarotSchema,
              isAgree: yup.boolean().required().oneOf([true]),
            })
          : yup.object().shape({
              tarot: yup.array().of(yup.string().required()).length(tarotCount),
              user: tarotSchema,
              isAgree: yup.boolean().required().oneOf([true]),
            }),
        defaultValues: {
          tarot: [],
          user: defaultTarotValues,
          partner: isPartner ? defaultTarotValues : undefined,
          isAgree: false,
        },
      };
    default:
      return {
        schema: yup.object().shape({}),
        defaultValues: {},
      };
  }
}

export default useContentRecourse;

const sajuSchema = yup.object().shape({
  name: yup.string().ensure().required(),
  gender: yup.string().ensure().required(),
  marital: yup.string().ensure().required(),
  year: yup.number().required(),
  month: yup.number().required(),
  day: yup.number().required(),
  calendar: yup.string().required(),
  hour: yup.number().when('is_birthed_time', {
    is: true,
    then: schema => schema.required(),
    otherwise: schema => schema.transform(() => 1).notRequired(),
  }),
  minute: yup.number().when('is_birthed_time', {
    is: true,
    then: schema => schema.required(),
    otherwise: schema => schema.transform(() => 1).notRequired(),
  }),
  is_birthed_time: yup.boolean().required(),
});

const defaultSajuValues = {
  name: '',
  gender: '',
  marital: '',
  year: 1980,
  month: 1,
  day: 1,
  calendar: CalendarE.Solar,
  hour: '',
  minute: '',
  is_birthed_time: true,
};

const tarotSchema = yup.object().shape({
  name: yup.string().ensure().required(),
  gender: yup.string().ensure().required(),
});

const defaultTarotValues = {
  name: '',
  gender: '',
};
