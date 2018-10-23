// @flow

async function send<P, R: void>(event: string, payload: P): Promise<R> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ event, payload }, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

export { send };
