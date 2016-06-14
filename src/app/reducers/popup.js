/**
 * Created by phucpnt on 5/15/16.
 */
import { combineReducers } from 'redux';
import update from 'react-addons-update';
import { ITEM_REF_REQUEST, ITEM_REF_RECEIVE } from '../constants/action-type';


export default combineReducers({
  focusItem(state = { url: '' }, action) {
    switch (action.type) {
      case ITEM_REF_RECEIVE:
        return update(state, { url: { $set: action.payload.url } });
      default:
        return state;
    }
  },
  curRefItem(state = {
    itemId: null,
    refList: [],
    isLoading: 0,
    isExistInFe: 0,
  }, action) {
    switch (action.type) {
      case ITEM_REF_REQUEST:
        return update(state, { isLoading: { $set: 1 } });
      case ITEM_REF_RECEIVE:
        return update(state, {
          itemId: { $set: action.payload.itemId },
          isLoading: { $set: 0 },
          isExistInFe: { $set: action.payload.isExistInFe },
          refList: { $set: action.payload.refList }
        });
      default:
        return state;
    }
  }
});
