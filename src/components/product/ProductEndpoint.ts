const baseUrl = '/products';

export const ProductEndpoint = {
  base: (): string => `${baseUrl}`,
  byId: (id: string): string => `${baseUrl}/${id}`,
};
