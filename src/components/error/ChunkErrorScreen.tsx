import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import { useNetworkState } from 'react-use';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { logoThumbnail } from '../../assets/images';
import NetworkErrorScreen from './NetworkErrorScreen';

async function checkNetwork() {
  try {
    await apiClient.get('/api/v2/check', {
      timeout: 5000,
    });
    return true;
  } catch (e) {
    return false;
  }
}
function ChunkErrorScreen() {
  const [networkStatus, setNetworkStatus] = useState<'offline' | 'online' | null>(null);

  const network = useNetworkState();

  console.log(networkStatus);

  useEffect(() => {
    if (network && network.online !== undefined) {
      setNetworkStatus(network.online ? 'online' : 'offline');
    }
  }, [network]);

  useEffect(() => {
    const fn = async () => {
      const online = await checkNetwork();
      setNetworkStatus(online ? 'online' : 'offline');
    };
    fn();
  }, [network.online]);

  if (networkStatus === null) return null;
  if (networkStatus === 'online') {
    return (
      <ErrorScreenTemplate
        image={logoThumbnail}
        message={'site is updated, please refresh to use.'}
        onButtonClick={() => window.location.reload()}
        buttonText='Refresh'
      />
    );
  }
  return <NetworkErrorScreen />;
}

export default ChunkErrorScreen;
