import {isConnected} from './connect-podio';
import taskOps from './task';

export default function getApi({
    workspaceId = 4555999,
    phaseAppId = 15760239,
    milestoneAppId = 15759987,
    productAppId = 15759986,
    taskAppId=15818250,
}) {

  const api = podio => ({
    task: taskOps(podio)
  });


  return isConnected().then(api).catch(err => {
    throw err;
  });
}
