import { Router } from "express";
import * as marketController from "./controllers/marketsController";
import * as userController from "./controllers/userController";
import userKeyGen from './services/userKeyGen'
import userLogin from './services/userLogin'
import createOracle from './services/createOracle'
import uploadOracleWallet from './services/uploadOracleWallet';
import uploadMasterAddress from './services/uploadMasterAddress';

import accountInfo from './services/accountInfo';

import { Account } from "aws-sdk";

const router = Router();

router.get("/", (req, res) => res.send("Hello World"));
// router.get("/markets", marketController.getMarkets);
router.get("/users", userController.getUsers); // router.post("/updateUserData", );
router.post("/login", async (req, res) => res.send(JSON.stringify(await userLogin(req)))); // add signature check
router.post('/createOracle', async (req, res) => res.send(JSON.stringify(await createOracle(req))))
router.post('/uploadOracleWallet', async (req, res) => res.send(JSON.stringify(await uploadOracleWallet(req))))
router.post('/uploadMasterAddress', async (req, res) => res.send(JSON.stringify(await uploadMasterAddress(req))))
router.get('/account', async (req, res) => res.send(JSON.stringify(await accountInfo(req))))
export { router };

