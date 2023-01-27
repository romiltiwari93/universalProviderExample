/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import '@walletconnect/react-native-compat';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DefaultSignClient from './DefaultSignClient';
import DefaultUniversalProvider from './DefaultUniversalProvider';
import {Web3Provider} from '@ethersproject/providers';
import {SessionTypes} from '@walletconnect/types';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  type ConnectedWallet = {
    address: string;
    connection_key: string;
    session: any;
  };

  const DEEP_LINK_PREFIX = 'obv://';

  const [zerion, setZerion] = useState<SessionTypes.Struct>();
  const [trust, setTrust] = useState<SessionTypes.Struct>();

  async function connectZerion() {
    const client = await DefaultSignClient.getInstance();
    const {uri, approval} = await client.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged'],
        },
      },
    });
    if (uri) {
      await Linking.openURL(
        `https://wallet.zerion.io/wc?uri=${encodeURIComponent(
          uri,
        )}&redirectUrl=${encodeURIComponent(DEEP_LINK_PREFIX)}`,
      );
      const session = await approval();
      if (session) {
        const connectedZerion: ConnectedWallet = {
          address: session.namespaces.eip155.accounts[0].split(':')[2],
          connection_key: session.topic,
          session,
        };
        setZerion(connectedZerion);
        console.log(`ZERION_SESSION`, session);
      }
    }
  }

  async function signRequestZerion() {
    const client = await DefaultSignClient.getInstance();

    //SENDING REQUEST VIA SIGN_CLIENT WORKS
    const result = await client.request({
      topic: zerion.connection_key,
      chainId: 'eip155:1',
      request: {
        method: 'personal_sign',
        params: [
          'Hello Zerion, from Obvious',
          '0x25b2100911cceb45d32adc4201cfdc8d5d4c26c6',
        ],
      },
    });

    //FIXME: SENDING REQUEST VIA UNIVERSAL PROVIDER DOESN"T WORK
    /* const universalProvider = await DefaultUniversalProvider.getInstance();
    const session = await universalProvider.connect({
      skipPairing: true,
      pairingTopic: zerion.connection_key,
      namespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {
            1: 'https://eth-mainnet.g.alchemy.com/v2/5wsYnw53O9WrMmktnvaE_oRMmmqpbXmJ',
          },
        },
      },
    });
    console.log(`UNIV_PROVIDER_ZERION_SESSION`, session);
    const provider = new Web3Provider(universalProvider);
    const signer = provider.getSigner();
    const result = await signer.signMessage(
      'Hello Zerion. Say hi to Obvious',
    ); */
    console.log(`SIGN_RESULT_ZERION`, result);
  }

  async function connectTrust() {
    const client = await DefaultSignClient.getInstance();
    const {uri, approval} = await client.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged'],
        },
      },
    });
    if (uri) {
      await Linking.openURL(
        `https://link.trustwallet.com/wc?uri=${encodeURIComponent(
          uri,
        )}&redirectUrl=${encodeURIComponent(DEEP_LINK_PREFIX)}`,
      );
      const session = await approval();
      if (session) {
        const connectedTrust: ConnectedWallet = {
          address: session.namespaces.eip155.accounts[0].split(':')[2],
          connection_key: session.topic,
          session,
        };
        setTrust(connectedTrust);
        console.log(`TRUST_SESSION`, session);
      }
    }
  }

  async function signRequestTrust() {
    const client = await DefaultSignClient.getInstance();

    //SENDING REQUEST VIA THE SIGN_CLIENT WORKS
    const result = await client.request({
      topic: trust.connection_key,
      chainId: 'eip155:1',
      request: {
        method: 'personal_sign',
        params: [
          'Hello Trust Wallet, from Obvious',
          '0xEb4b55e3a20002a7A3f70651187c60539AA739D0',
        ],
      },
    });

    //FIXME: SENDING REQUEST VIA UNIVERSAL PROVIDER DOESN'T WORK
    /* const universalProvider = await DefaultUniversalProvider.getInstance();
    await universalProvider.connect({
      skipPairing: true,
      pairingTopic: trust.connection_key,
      namespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {
            1: 'https://eth-mainnet.g.alchemy.com/v2/5wsYnw53O9WrMmktnvaE_oRMmmqpbXmJ',
          },
        },
      },
    });
    const provider = new Web3Provider(universalProvider);
    const signer = provider.getSigner();
    const result = await signer.signMessage(
      'Hello Trust Wallet. Say hello to Obvious',
    ); */
    console.log(`SIGN_RESULT_TRUST`, result);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <TouchableOpacity
          onPress={() => connectZerion()}
          style={{
            padding: 16,
            margin: 16,
            backgroundColor: 'pink',
            alignSelf: 'center',
          }}>
          <Text>Connect Zerion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => connectTrust()}
          style={{
            padding: 16,
            margin: 16,
            backgroundColor: 'pink',
            alignSelf: 'center',
          }}>
          <Text>Connect Trust Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signRequestZerion()}
          style={{
            padding: 16,
            margin: 16,
            backgroundColor: 'pink',
            alignSelf: 'center',
          }}>
          <Text>Sign Zerion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signRequestTrust()}
          style={{
            padding: 16,
            margin: 16,
            backgroundColor: 'pink',
            alignSelf: 'center',
          }}>
          <Text>Sign Trust Wallet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default App;
