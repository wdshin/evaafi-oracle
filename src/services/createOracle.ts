import { verify } from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import userKeyGen from "./userKeyGen";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const createOracle = async (req: any) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        console.log(jwtSecretKey)
        const verified = jwt.verify(token, jwtSecretKey ?? '');
        if (verified) {
            console.log(verified)
            console.log('test')
            const newOracle = 
            {
                oracleKey: makeid(16),
                oracleAddress: 'none',
                masterAddress: 'none',
                clientAddress: 'none',
                userAddress: 'none',
            }
            //@ts-ignore 
            const add = verified.wallet as string
            console.log(add)
            console.log(newOracle)
            await User.updateOne({ ownerAddress: add }, { $push: { oracles: newOracle } });
            return { status: 'ok', newOracle }
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

export default createOracle
