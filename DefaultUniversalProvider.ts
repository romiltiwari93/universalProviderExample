import UniversalProvider from '@walletconnect/universal-provider';

import DefaultSignClient from './DefaultSignClient';

export default class DefaultUniversalProvider {
  static myUniversalProvider: UniversalProvider;

  static async getInstance() {
    if (!this.myUniversalProvider) {
      const client = await DefaultSignClient.getInstance();
      this.myUniversalProvider = await UniversalProvider.init({
        logger: 'debug',
        projectId: '0fc4d97d5b72b1dac812820e4893ba0a',
        metadata: {
          description: 'Obvious 🐙 - Your Crypto Money Manager',
          url: 'https://obvious.technology',
          icons: ['http://resources.obvious.technology/app_icon_128px.png'],
          name: 'Obvious 🐙',
        },
        client,
      });
    }
    return this.myUniversalProvider;
  }
}
