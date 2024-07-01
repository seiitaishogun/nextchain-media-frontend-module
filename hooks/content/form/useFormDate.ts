import { useFormContext, useWatch } from 'react-hook-form';
import {
  daysGenerator,
  hourGenerator,
  minutesGenerator,
  monthsGenerator,
  yearsGenerator,
} from '@module/utils/date';
import { getName } from '@module/utils/content/form';

function useFormDate({ isUser }: { isUser: boolean }) {
  const { control } = useFormContext();

  const currentDate = new Date();
  const month = useWatch({
    control,
    name: getName({
      property: 'month',
      isUser,
    }),
  });
  const years = yearsGenerator({ to: currentDate.getFullYear() });
  const months = monthsGenerator();
  const days = daysGenerator({
    year: currentDate.getFullYear(),
    month: Number(month),
  });
  const hours = hourGenerator();
  const minutes = minutesGenerator();
  const is_birthed_time = useWatch({
    control,
    name: getName({
      property: 'is_birthed_time',
      isUser,
    }),
  });

  return {
    years,
    months,
    days,
    hours,
    minutes,
    is_birthed_time,
  };
}

export default useFormDate;
