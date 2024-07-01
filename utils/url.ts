const getContentURL = (id: string | number) => `/contents/${id}`;

const getMobileContentURL = (id: string | number) => `/m/contents/${id}`;

const getPurchaseURL = ({
  contentId,
  purchaseId,
}: {
  contentId: string | number;
  purchaseId: string | number;
}) => `/contents/${contentId}/result/${purchaseId}`;

const getMobilePurchaseURL = ({
  contentId,
  purchaseId,
}: {
  contentId: string | number;
  purchaseId: string | number;
}) => `/m/contents/${contentId}/result/${purchaseId}`;

export {
  getContentURL,
  getMobileContentURL,
  getPurchaseURL,
  getMobilePurchaseURL,
};
