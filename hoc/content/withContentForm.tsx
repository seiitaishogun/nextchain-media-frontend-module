import React, { ComponentType, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  contentFormSelector,
  isContentFormSelector,
} from '@module/store/content/form';
import { ContentDetailT } from '@module/types/content/detail';
import useContentRecourse from '@module/hooks/content/useContentRecourse';
import useFormTrigger from '@module/hooks/form/useFormTrigger';
import useAlert from '@module/hooks/common/useAlert';
import useContentPurchase from '@module/hooks/content/useContentPurchase';
import useSaveContentForm from '@module/hooks/content/useSaveContentForm';
import { ContentTypeE } from '@module/types/content';
import { CalendarE } from '@module/types/user';
import { userContentFormAtom } from '@module/store/user';
import { getLocalStorageItem } from '@module/utils/storage/localStorage';
import { userContentFormKey } from '@module/constants/user';
import { parseJSON } from '@module/utils/storage';

const Layout = styled.form`
  position: relative;
`;

const Loading = dynamic(
  () => import('@module/components/Common/Popup/Loading'),
  {
    ssr: false,
  }
);

interface Props {
  content: ContentDetailT;
}

function withContentForm(FormComponent: ComponentType<any>) {
  return function CustomForm({ content }: Props) {
    const rUserInfo = useRecoilValue(userContentFormAtom);
    const contentForm = useRecoilValue(contentFormSelector(content.id));
    const isContentForm = useRecoilValue(isContentFormSelector(content.id));

    const { schema, defaultValues } = useContentRecourse({
      type: content.type.name,
      isPartner: content.is_partner,
      tarotCount: content.tarot_count || 0,
    });
    const methods = useForm<any>({
      mode: 'all',
      resolver: yupResolver(schema as any),
      defaultValues,
    });
    const {
      trigger,
      getValues,
      setValue,
      reset,
      formState: { isDirty },
      handleSubmit,
      watch,
    } = methods;
    const { handleTrigger } = useFormTrigger({ trigger });
    const { renderMessage, setAlertOptions } = useAlert();
    const { handleSubmit: handleFormSubmit, isLoading } = useContentPurchase({
      content,
      getValues,
      setAlertOptions,
    });

    useSaveContentForm({
      contentId: content.id,
      isDirty,
      formValues: watch(),
    });

    useEffect(() => {
      if (isContentForm) {
        Object.entries(contentForm).forEach(([key, value]) => {
          if (key === 'tarot' && content.type.name === ContentTypeE.Tarot) {
            setValue(key, []);
          } else {
            setValue(key, value);
          }
        });
      } else if (content.type.name === ContentTypeE.Saju) {
        setValue('user', {
          name: '',
          gender: '',
          marital: '',
          calendar: CalendarE.Solar,
          year: 1980,
          month: 1,
          day: 1,
          hour: '',
          minute: '',
          is_birthed_time: true,
        });
      } else if (content.type.name === ContentTypeE.Tarot) {
        setValue('user', {
          name: '',
          gender: '',
        });
      }

      const savedData = parseJSON(getLocalStorageItem(userContentFormKey));

      const userInfo = {
        ...rUserInfo,
        ...savedData,
      };

      if (userInfo?.user?.name) {
        if (content.type.name === ContentTypeE.Saju) {
          setValue('user', {
            name: userInfo?.user.name || '',
            gender: userInfo?.user.gender || '',
            marital: userInfo?.user.marital || '',
            calendar: userInfo?.user.calendar || CalendarE.Solar,
            year: userInfo?.user.year || 1980,
            month: userInfo?.user.month || 1,
            day: userInfo?.user.day || 1,
            hour: userInfo?.user.hour || '',
            minute: userInfo?.user.minute || '',
            is_birthed_time: !!userInfo?.user.is_birthed_time,
          });
        } else if (content.type.name === ContentTypeE.Tarot) {
          setValue('user', {
            name: userInfo?.user.name || '',
            gender: userInfo?.user.gender || '',
          });
        }
      }

      handleTrigger();

      return () => {
        reset();
      };
    }, []);

    return (
      <FormProvider {...methods}>
        <Layout onSubmit={handleSubmit(handleFormSubmit)}>
          <FormComponent content={content} />
        </Layout>

        {renderMessage()}
        <Loading isOpen={isLoading} />
      </FormProvider>
    );
  };
}

export default withContentForm;
