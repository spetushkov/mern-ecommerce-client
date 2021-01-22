const initSdk = (clientId: string, onLoadHandler: () => void): void => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  script.onload = onLoadHandler;
  document.body.appendChild(script);
};

export const PayPalUtils = {
  initSdk,
};
