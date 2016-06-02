/**
 * Created by phucpnt on 6/3/16.
 */

import { IFRAME_FULL_HIDE, IFRAME_FULL_SHOW } from '../../constants/action-type';

export function show(url) {
  return { type: IFRAME_FULL_SHOW, payload: { url } };
}

export function hide() {
  return { type: IFRAME_FULL_HIDE};
}
