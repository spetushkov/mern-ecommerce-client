export const RouterEndpoint = {
  signUp: (redirect?: string): string => {
    return redirect ? `/signup?redirect=${redirect}` : `/signup`;
  },
  signIn: (redirect?: string): string => {
    return redirect ? `/signin?redirect=${redirect}` : `/signin`;
  },
  signOut: (): string => `/signout`,
  cart: (): string => `/cart`,
  shipping: (): string => `/shipping`,
  payment: (): string => `/payment`,
  placeOrder: (): string => `/placeorder`,
  orders: (id: string): string => `/orders/${id}`,
  products: (id: string): string => `/products/${id}`,
  home: (): string => `/`,
};
