let timer: NodeJS.Timeout;

const asyncAction = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve(false);
    }, 3000);
  });
};

const runAsyncAction = async () => {
  try {
    const result = await asyncAction();
    console.log('resolve result', result);
    clearTimer();
  } catch (error) {
    console.log('reject reason', error);
    clearTimer();
  }
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    console.log('timer cleared');
  }
};
