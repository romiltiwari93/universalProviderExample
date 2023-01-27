import {SignClient} from '@walletconnect/sign-client';

export default class DefaultSignClient {
  static mySignClient: SignClient;

  static async getInstance() {
    if (!this.mySignClient) {
      this.mySignClient = await Promise.resolve(
        SignClient.init({
          projectId: '0fc4d97d5b72b1dac812820e4893ba0a',
          metadata: {
            description: 'Obvious 🐙 - Your Crypto Money Manager',
            url: 'https://obvious.technology',
            icons: ['http://resources.obvious.technology/app_icon_128px.png'],
            name: 'Obvious 🐙',
          },
        }),
      );
    }
    return this.mySignClient;
  }
}
