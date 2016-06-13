/**
 * Created by phucpnt on 6/12/16.
 */

export default function itemOps(podio, { taskAppId }) {

  const resolveByURL = url => {
    return podio.request('GET', '/reference/resolve', { url });
  };

  const getAllRefsToItem = ({ item_id }) => {
    return podio.request('GET', `/item/${item_id}/reference`);
  };

  return {
    resolveByURL,
    getAllRefsToItem,
  };
}
