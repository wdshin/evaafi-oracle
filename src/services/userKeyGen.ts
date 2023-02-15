import jwt from 'jsonwebtoken';

// userKeyGen(req.body.wallet)
const userKeyGen = (userWallet: string) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        wallet: userWallet,
    }
    const token = jwt.sign(data, jwtSecretKey ?? '');
    return {
        apiKey: token
    }
}
// makeid(16)

export default userKeyGen 
