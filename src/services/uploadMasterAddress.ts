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

const uploadMasterAddress = async (req: any) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, jwtSecretKey ?? '');
    if (verified) {
      //@ts-ignore
      const user = await User.findOne({ ownerAddress: verified.wallet });
      console.log(user)
      if (user) {
        const index = findIndexByProperty(user.oracles, 'oracleKey', req.body.oracleKey)

        if (user.oracles[index]) {
          console.log(user.oracles[index])
          //@ts-ignore
          user.oracles[index].masterAddress = req.body.masterAddress
          console.log(user.oracles[index])
          await User.updateOne({
            //@ts-ignore
            ownerAddress: verified.wallet
          }, { $set: { oracles: user.oracles } });
          return { status: 'ok' }
        }
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
  return { status: 'unknown error' }
}

export default uploadMasterAddress 
