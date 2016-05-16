import {isConnected} from './connect-podio';

export default function getApi({
    workspaceId = 4555999,
    phaseAppId = 15760239,
    milestoneAppId = 15759987,
    productAppId = 15759986,
}) {

  const api = podio => ({
    getProduct({filter}) {
    },

    getPhase({filter}) {
    },

    getMilestone({filter}) {
    },

    getTask({filter}) {
    },
  });


  return isConnected().then(api).catch(err => {
    throw err;
  });
}
