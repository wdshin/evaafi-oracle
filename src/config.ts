import path from "path";
import { config } from "dotenv";
import { loadVar } from "./utils";

config({ path: path.join(__dirname, "../.env") });
config({ path: path.join(__dirname, ".env") });
type TChainId = "T" | "W";
export const mongoUrl = loadVar("MONGO_URL");
export const port = loadVar("PORT", true);
export const chainId: TChainId = loadVar("CHAIN_ID") as TChainId;

export const NODE_URL_MAP = {
  W: "https://nodes-puzzle.wavesnodes.com",
  T: "https://nodes-testnet.wavesnodes.com",
};
