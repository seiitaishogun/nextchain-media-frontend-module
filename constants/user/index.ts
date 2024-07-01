import { CalendarE, GenderE, MaritalE } from '@module/types/user';

const GENDER_TEXT = {
  [GenderE.Male]: '남',
  [GenderE.Female]: '여',
};

const GENDER_OPTION = [
  {
    text: GENDER_TEXT[GenderE.Male],
    value: GenderE.Male,
  },
  {
    text: GENDER_TEXT[GenderE.Female],
    value: GenderE.Female,
  },
];

const MARITAL_TEXT = {
  [MaritalE.Single]: '미혼(싱글)',
  [MaritalE.Couple]: '미혼(커플)',
  [MaritalE.Married]: '기혼',
};

const MARITAL_OPTION = [
  {
    text: MARITAL_TEXT[MaritalE.Single],
    value: MaritalE.Single,
  },
  {
    text: MARITAL_TEXT[MaritalE.Couple],
    value: MaritalE.Couple,
  },
  {
    text: MARITAL_TEXT[MaritalE.Married],
    value: MaritalE.Married,
  },
];

const CALENDAR_TEXT = {
  [CalendarE.Solar]: '양력',
  [CalendarE.Lunar]: '음력',
  [CalendarE.Leap]: '윤달',
};

const CALENDAR_OPTION = [
  {
    text: CALENDAR_TEXT[CalendarE.Solar],
    value: CalendarE.Solar,
  },
  {
    text: CALENDAR_TEXT[CalendarE.Lunar],
    value: CalendarE.Lunar,
  },
  {
    text: CALENDAR_TEXT[CalendarE.Leap],
    value: CalendarE.Leap,
  },
];

const userContentFormKey = 'userContentForm';
const userInfoKey = 'userInfoState';

export {
  GENDER_TEXT,
  GENDER_OPTION,
  MARITAL_TEXT,
  MARITAL_OPTION,
  CALENDAR_TEXT,
  CALENDAR_OPTION,
  userContentFormKey,
  userInfoKey,
};
