import { AxiosRequestConfig } from 'axios';
import { BaseApi } from '../../api/BaseApi';
import { Result } from '../../api/type/Result';
import { Review } from './type/Review';

export type ReviewApiResponse = Result<Review, Error>;
const baseUrl = '/reviews';

const save = async (token: string | null, entity: Review): Promise<ReviewApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.post<ReviewApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ReviewApi = {
  save,
};
