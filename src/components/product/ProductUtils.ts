import { BASE_URL } from '../../app/AppApi';

const getProductImageUrl = (imageName: string): string => {
  return `${BASE_URL}/files/${imageName}`;
};

export const ProductUtils = {
  getProductImageUrl,
};
