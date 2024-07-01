import Image from 'next/image';
import {
  FeedbackIconBox,
  FeedbackItem as Layout,
  FeedbackItemCount,
  FeedbackItemName,
} from '@module/components/Feedback/Feedback.styled';
import { FeedbackT } from '@module/types/content/feedback';

interface Props {
  feedback: FeedbackT;
  status: number | null;
  isFeedbackAction?: boolean;
  handleClickFeedback: (feedback: FeedbackT) => void;
}

function FeedbackItem({
  feedback,
  status,
  isFeedbackAction,
  handleClickFeedback,
}: Props) {
  const feedbackImg = `${process.env.APP_IMAGE_URL}/content/feedback/feedback_icon_${feedback.id}.svg`;
  const isSelected = status === feedback.id;

  return (
    <Layout
      $isFeedbackAction={isFeedbackAction}
      onClick={() => handleClickFeedback(feedback)}
    >
      <FeedbackIconBox $isSelected={isSelected}>
        <Image src={feedbackImg} width={50} height={50} alt="" />
      </FeedbackIconBox>
      {feedback.count > 0 && (
        <FeedbackItemCount>{feedback.count}</FeedbackItemCount>
      )}
      <FeedbackItemName>{feedback.name}</FeedbackItemName>
    </Layout>
  );
}

export default FeedbackItem;
