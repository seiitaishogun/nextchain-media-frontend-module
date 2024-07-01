import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import {
  Layout,
  FeedbackTitle,
  FeedbackList,
} from '@module/components/Feedback/Feedback.styled';
import FeedbackItem from '@module/components/Feedback/FeedbackItem';
import Snackbar from '@module/components/Common/Snackbar';
import {
  fetchFeedbacks,
  fetchFeedbackStore,
} from '@module/api/content/feedback';
import { FeedbackT } from '@module/types/content/feedback';
import { purchaseFeedbackSelector } from '@module/store/content/feedback';

interface Props {
  title?: string | React.ReactNode;
  isFeedbackAction?: boolean;
}

function ContentFeedback({ title, isFeedbackAction }: Props) {
  const params = useParams();

  const [openSnackbar, setOpenSnackbar] = useState('');

  const content_id = Number(params.id);
  const purchase_id = Number(params.purchaseId || 0) || undefined;
  const { data } = useQuery(
    ['feedbacks', { content_id }],
    () => fetchFeedbacks({ content_id, purchase_id }),
    {
      initialData: {
        data: {
          feedback: [],
          status: null,
        },
      },
      select: res => res.data,
    }
  );
  const [status, setStatus] = useRecoilState(
    purchaseFeedbackSelector(purchase_id)
  );

  const { mutate, isLoading, isSuccess } = useMutation(
    ['feedbackStore'],
    fetchFeedbackStore
  );

  const handleHideSnackbar = () => {
    setOpenSnackbar('');
  };

  const handleClickFeedback = (feedback: FeedbackT) => {
    if (isLoading || !isFeedbackAction || data.status || isSuccess) return;

    const reqParams = {
      content_id,
      purchase_id: purchase_id ?? 0,
      feedback_id: feedback.id,
    };
    mutate(reqParams, {
      onSuccess: () => {
        setStatus(feedback.id);
        setOpenSnackbar('후기가 등록되었습니다.');
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || '오류가 발생했습니다.';
        alert(message);
      },
    });
  };

  return (
    <Layout>
      {title && <FeedbackTitle>{title}</FeedbackTitle>}
      <FeedbackList>
        {data.feedback.map(item => (
          <FeedbackItem
            key={item.id}
            feedback={item}
            status={status as number | null}
            isFeedbackAction={isFeedbackAction && !!status}
            handleClickFeedback={handleClickFeedback}
          />
        ))}
      </FeedbackList>

      <Snackbar
        isOpen={!!openSnackbar}
        setIsOpen={handleHideSnackbar}
        message={openSnackbar}
      />
    </Layout>
  );
}

export default ContentFeedback;
