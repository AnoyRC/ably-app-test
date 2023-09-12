'use client'

import Ably from 'ably';

const Wallet = () => {
  const connectWallet = async () => {
    const publicKey = 'hello';

    const authUrl = `http://localhost:5000/api/ably/getJWT?clientId=${publicKey}`;
    const realtime = new Ably.Realtime({ authUrl });

    console.log('Requesting Ably JWT token from auth server.');

    realtime.connection.once('connected', () => {
      const { tokenDetails } = realtime.auth;

      console.log(
        'Client successfully connected to Ably using JWT auth',
        tokenDetails
      );
    });
  };

  return (
    <button className="py-2 px-4 bg-gray-900" onClick={connectWallet}>
      Wallet
    </button>
  );
};
export default Wallet;
