/**
 * Created by phucpnt on 6/3/16.
 */


import { IFRAME_FULL_HIDE, IFRAME_FULL_SHOW } from '../../constants/action-type';
import update from 'react-addons-update';

export default function (state = { url: null, status: 0 }, action) {

  switch (action.type) {
    case IFRAME_FULL_HIDE:
      return update(state, { url: { $set: null }, status: { $set: 0 } });
    case IFRAME_FULL_SHOW:
      return update(state, { url: { $set: action.payload.url }, status: { $set: 1 } });
    default:
      return state;
  }

}
