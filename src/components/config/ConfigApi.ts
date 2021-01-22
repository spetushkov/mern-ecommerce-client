import { BaseApi } from '../../api/BaseApi';
import { Result } from '../../api/type/Result';
import { Config } from './type/Config';

export type ConfigApiResponse = Result<Config, Error>;
const baseUrl = '/configs';

const findById = async (id: keyof Config): Promise<ConfigApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    const response = await BaseApi.instance.get<ConfigApiResponse>(endpoint);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConfigApi = {
  findById,
};
