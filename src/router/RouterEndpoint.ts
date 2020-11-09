export const RouterEndpoint = {
  signUp: (redirect?: string): string => {
    return redirect ? `/signup?redirect=${redirect}` : `/signup`;
  },
  signIn: (redirect?: string): string => {
    return redirect ? `/signin?redirect=${redirect}` : `/signin`;
  },
  signOut: (): string => `/signout`,
  shipping: (): string => `/shipping`,
  payment: (): string => `/payment`,
  order: (): string => `/order`,
  cart: (): string => `/cart`,
  products: (id: string): string => `/products/${id}`,
  home: (): string => `/`,
};
