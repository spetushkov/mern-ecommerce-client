import { BASE_URL } from '../../api/BaseApi';

const getProductImageUrl = (imageName: string): string => {
  return `${BASE_URL}/files/${imageName}`;
};

export const ProductUtils = {
  getProductImageUrl,
};
