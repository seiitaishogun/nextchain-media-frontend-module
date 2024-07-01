import TagManager from 'react-gtm-module';

function useDataCollection() {
  const handleEvent = ({
    eventName,
    traits,
  }: {
    eventName: string;
    traits: any;
  }) => {
    TagManager.dataLayer({
      dataLayer: { event: eventName, ...traits },
    });
  };

  /**
   * 컨텐츠 구매 이벤트
   */
  const handleContentPurchaseEvent = (data: any) => {
    const traits = {
      id: data.purchase.id,
      content_id: data.content.id,
      content_category: data.content?.category?.name || '미등록 카테고리',
      content_name: data.content.name,
      content_price: data.content.price,
    };

    if (data.content.price > 0) {
      handleEvent({
        eventName: 'purchase',
        traits,
      });
      handleEvent({
        eventName: 'result_purchase',
        traits,
      });
    } else {
      handleEvent({
        eventName: 'result_view',
        traits,
      });
    }
  };

  /**
   * 컨텐츠 오류 로그 수집 이벤트
   */
  const handleLogContentErrorEvent = (data: {
    content_id: number;
    current_page: 'purchase' | 'payment' | 'result';
    error_log: any;
    purchase_id?: number | null;
  }) => {
    handleEvent({
      eventName: 'log_content_error',
      traits: data,
    });
  };

  /**
   * 컨텐츠 구매 버튼 클릭 이벤트
   */
  const handleContentPurchaseClickEvent = ({
    content_category,
    ...data
  }: {
    content_id: number;
    content_category?: string | null;
    content_name: string;
    content_price: number;
  }) => {
    const eventName = data.content_price > 0 ? 'click_purchase' : 'click_view';
    const traits = {
      content_category: content_category || '미등록 카테고리',
      ...data,
    };

    handleEvent({
      eventName,
      traits,
    });
  };

  return {
    handleContentPurchaseEvent,
    handleLogContentErrorEvent,
    handleContentPurchaseClickEvent,
  };
}

export default useDataCollection;
