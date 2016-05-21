import { isConnected } from './connect-podio';
import taskOps from './task';
import { DevTaskField} from './helper/podio-id-list';

export default function getApi({
    workspaceId = 4555999,
    phaseAppId = 15760239,
    milestoneAppId = 15759987,
    productAppId = 15759986,
    taskAppId=15818250,
}) {

  const api = podio => ({
    task: taskOps(podio, { appId: taskAppId, appField: DevTaskField }),
  });


  return isConnected().then(api).catch(err => {
    throw err;
  });
}
