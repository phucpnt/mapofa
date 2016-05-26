/**
 * Created by phucpnt on 5/24/16.
 */
import notifOps, {TYPE_MEMBER_REFERENCE_ADD} from '../notification';

export default function createBacklogByReference(podio, {appId, appField, workspaceId}){
  // retrieve top 100 notifications
  // indentify the reference_member_add
  // process the request reference -> create backlog -> assign suggested person first.
  // add description with links to request referenced item.

  api = notifOps(podio, {appId, appField});
  api.getAll(TYPE_MEMBER_REFERENCE_ADD).then();

}
