/**
 * Created by phucpnt on 6/12/16.
 */

/**
 * TODO: unit test
 */
export default function itemOps(podio, { taskAppId }) {

  function checkExistedFrontEndTaskRef(refList) {
    return refList.some(ref => ref.app.app_id === taskAppId) ? 1 : 0;
  }

  function buildTaskFromWorkItem(item) {

  }

  const resolveByURL = url => {
    return podio.request('GET', '/reference/resolve', { url });
  };

  const getAllRefsToItem = ({ itemId }) => {
    return podio.request('GET', `/item/${itemId}/reference`).then(refList => {
      return {
        itemId,
        isExistInFe: checkExistedFrontEndTaskRef(refList),
        refList,
      };
    });
  };

  return {
    resolveByURL,
    getAllRefsToItem,
  };
}
