/**
 * Created by phucpnt on 6/5/16.
 */

const listenerList = [];
export function handleReceiveUpdate(message) {
  listenerList.forEach(listener => listener(message));
}

export function registerUpdateListener(listener) {
  listenerList.push(listener);
}