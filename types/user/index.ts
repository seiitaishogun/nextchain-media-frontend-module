const enum GenderE {
  Male = 0,
  Female = 1,
}

const enum MaritalE {
  Single = 'single',
  Couple = 'couple',
  Married = 'married',
}

/**
 * @description 양력/음력/윤달
 */
const enum CalendarE {
  Solar = 'solar',
  Lunar = 'lunar',
  Leap = 'leap',
}

interface UserInfoT {
  name: string;
  phone: string;
  pin: string;
}

export { GenderE, CalendarE, MaritalE };
export type { UserInfoT };
