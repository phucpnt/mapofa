/**
 * Created by phucpnt on 6/4/16.
 */

import faye from 'faye';

export default function createPushService(podio, { workspaceId, messageHandle }) {


  return podio.request('GET', `/space/${workspaceId}`).then(response => {
    return new Promise((resolve, reject) => {
      // Initialize faye client
      const fayeClient = new faye.Client('https://push.podio.com/faye');

      // Simple push object for handling a subscription
      const push = {
        subscription: null,
        channel: null,
        messageReceived(message) {
          messageHandle(message);
        },
        addSubscription(channel) {
          this.channel = channel;
          this.subscription = fayeClient.subscribe(this.channel.channel, this.messageReceived);

          this.subscription.then(function () {
            console.log('Subscription is now active');
            resolve(fayeClient);
          }, function (error) {
            console.error('Subscription failed: ', error.message, error);
            reject(error);
          });
        }
      };

      // Extend faye client with signature and timestamp used for authentication
      fayeClient.addExtension({
        outgoing: function (message, callback) {
          message.ext = message.ext || {};
          message.ext = {
            private_pub_signature: push.channel.signature,
            private_pub_timestamp: push.channel.timestamp
          };
          callback(message);
        }
      });
      push.addSubscription(response.push);

    });
  });
}
