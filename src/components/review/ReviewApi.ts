import { AxiosRequestConfig } from 'axios';
import { AppApi } from '../../app/AppApi';
import { Result } from '../../type/Result';
import { Review } from './type/Review';

export type ReviewApiResponse = Result<Review, Error>;
const baseUrl = '/reviews';

const save = async (token: string | null, entity: Review): Promise<ReviewApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.post<ReviewApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ReviewApi = {
  save,
};
