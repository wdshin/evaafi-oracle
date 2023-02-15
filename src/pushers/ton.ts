import TonWeb from "tonweb";
const nacl = TonWeb.utils.nacl;
import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";

export const tonPusher = async (tonPrice: number): Promise<void> => {
  // Generate new key
  let mnemonics = (process.env.TON_MNEMONIC ?? '').split(' ');
  let keypair = await mnemonicToPrivateKey(mnemonics);

  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
    apiKey: "a8d8e24af2a27066b01f6362f513a29b2adacd6586a9a22af0abdecb4c9332aa"
  }));

  let wallet = new tonweb.wallet.all["v3R2"](tonweb.provider, {
    publicKey: keypair.publicKey,
  });

  const address = await wallet.getAddress();

  console.log(address.toString(true, true, true))
  const seqno = (await wallet.methods.seqno().call()) || 0;

  const toAddress = new tonweb.utils.Address(
    'EQBUL9aM4IKaBerYv8hZP1qLgRnEPnV2DYswO0aGsywZHsVW'
  ).toString(true, true, false);

  try {
    const transfer = await wallet.methods.transfer({
      secretKey: keypair.secretKey,
      toAddress: toAddress,
      amount: TonWeb.utils.toNano('0.1'), // 0.01 TON
      seqno: seqno,
      payload: tonPrice + '',
      sendMode: 3,
    });

    await transfer.send();
  } catch (e) {
    console.log(e)
    setTimeout(() => tonPusher(tonPrice), 10000)
  }
}
//import { TonClient, Address, toNano, WalletContractV4, internal } from "ton";
//import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";
//
//export const tonPusher = async (tonPrice: number): Promise<void> => {
//  // Create Clien
//  const client = new TonClient({
//    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
//  });
//
//  // Generate new key
//  let mnemonics = (process.env.TON_MNEMONIC ?? '').split(' ');
//  console.log(mnemonics);
//  let keyPair = await mnemonicToPrivateKey(mnemonics);
//  
//  // Create wallet contract
//  let workchain = 0; // Usually you need a workchain 0
//  let wallet = WalletContractV4.create();
//  let contract = client.openWalletDefaultFromSecretKey({ workchain, secretKey: keyPair.secretKey });
//  
//  // Create a transfer
//  let seqno: number = await contract.getSeqNo();
//  let transfer = await contract.transfer({
//    seqno,
//    value: toNano('1.5'),
//    dest: new Address(0, new Buffer('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N')),
//    body: 'Hello world'
//  });
//  
//     
//};
