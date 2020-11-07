export const Endpoint = {
  signUp: (): string => `/signup`,
  signIn: (): string => `/signin`,
  signOut: (): string => `/signout`,
  shipping: (): string => `/shipping`,
  payment: (): string => `/payment`,
  order: (): string => `/order`,
  cart: (): string => `/cart`,
  products: (id: string): string => `/products/${id}`,
};
