import { verify } from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import userKeyGen from "./userKeyGen";

function findIndexByProperty(data: any, key: string, value: string) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] == value) {
      return i;
    }
  }
  return -1;
}

const uploadOracleWallet = async (req: any) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token)
    console.log(jwtSecretKey)
    const verified = jwt.verify(token, jwtSecretKey ?? '');
    if (verified) {
      console.log(verified)
      console.log(req.body.address)
      console.log(req.body.oracleKey)
      //@ts-ignore
      const user = await User.findOne({ ownerAddress: verified.wallet });
      console.log(user)
      if (user) {
        return { status: 'ok', account: user }
      }
      // return ("Successfully Verified");
    } else {
      // Access Denied
      return { status: 'denied' }
      console.log('denied')
      // return '';
    }
  } catch (error) {
    console.log(error)
    console.log('err')
    return { status: 'error', error }
    // Access Denied
    // return;
  }

  // const user = await User.findOne({ ownerAddress: req.body.ownerAddress });
  // if (user) {
  //     console.log(user);
  //     return user
  // } else {
  //     const res = userKeyGen(req.body.ownerAddress)
  //     const marketsList = [
  //         {
  //             ownerAddress: req.body.ownerAddress,
  //             apiKey: res.apiKey,
  //             oracles: []
  //         },
  //     ];
  //     marketsList.forEach((e) => User.create(e));
  //     return marketsList[0]
  // }
}

export default uploadOracleWallet 
