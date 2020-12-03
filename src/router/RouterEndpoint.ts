export const RouterEndpoint = {
  signUp: (redirect?: string): string => (redirect ? `/signup?redirect=${redirect}` : `/signup`),
  signIn: (redirect?: string): string => (redirect ? `/signin?redirect=${redirect}` : `/signin`),
  signOut: (): string => `/signout`,
  cart: (): string => `/cart`,
  shipping: (): string => `/shipping`,
  payment: (): string => `/payment`,
  placeOrder: (): string => `/placeorder`,
  userOrders: (id?: string): string => (id ? `/user/orders/${id}` : `/user/orders`),
  adminUsers: (id?: string): string => (id ? `/admin/users/${id}` : `/admin/users`),
  adminOrders: (id?: string): string => (id ? `/admin/orders/${id}` : `/admin/orders`),
  adminProducts: (id?: string): string => (id ? `/admin/products/${id}` : `/admin/products`),
  adminCreateProduct: (): string => `/admin/products/create`,
  products: (id?: string): string => (id ? `/products/${id}` : `/products`),
  unauthorized: (): string => `/unauthorized`,
  search: (keyword: string): string => `/search/${keyword}`,
  home: (): string => `/`,
};
