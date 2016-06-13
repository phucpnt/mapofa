import { isConnected } from './connect-podio';
import taskOps from './task';
import contactOps from './contact';
import itemOps from './item';
import { DevTaskField } from './helper/podio-id-list';
import createPushServicePodio from './create-push-service';

export default function getApi({
    workspaceId = 4555999,
    phaseAppId = 15760239,
    milestoneAppId = 15759987,
    productAppId = 15759986,
    taskAppId=15818250,
}) {

  const updateCallbacks = [];

  const api = podio => ({
    task: taskOps(podio, { appId: taskAppId, appField: DevTaskField }),
    contact: contactOps(podio, { workspaceId }),
    item: itemOps(podio, { taskAppId }),
    registerUpdateHandler(messageHandle) {
      createPushServicePodio(podio, { workspaceId, messageHandle });
    }
  });

  return isConnected().then(api).catch(err => {
    throw err;
  });
}
