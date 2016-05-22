/**
 * Created by phucpnt on 5/21/16.
 */

export default function personOps(podio, { workspaceId }) {

  const getAll = () => {
    return podio.request('GET', `/space/${workspaceId}/member/v2`);
  };

  return {
    getAll,
  };
}
