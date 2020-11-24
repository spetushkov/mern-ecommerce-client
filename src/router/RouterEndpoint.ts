export const RouterEndpoint = {
  signUp: (redirect?: string): string => (redirect ? `/signup?redirect=${redirect}` : `/signup`),
  signIn: (redirect?: string): string => (redirect ? `/signin?redirect=${redirect}` : `/signin`),
  signOut: (): string => `/signout`,
  cart: (): string => `/cart`,
  shipping: (): string => `/shipping`,
  payment: (): string => `/payment`,
  placeOrder: (): string => `/placeorder`,
  orders: (id?: string): string => (id ? `/orders/${id}` : `/orders`),
  products: (id: string): string => `/products/${id}`,
  home: (): string => `/`,
};
