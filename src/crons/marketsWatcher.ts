import { Market, IMarket } from "../models/Market";
import CoinGecko from "coingecko-api";
import { tonPusher } from "../pushers/ton";

export const marketsWatcher = async (): Promise<void> => {
	const CoinGeckoClient = new CoinGecko();
	const tonPrice = (await CoinGeckoClient.coins.fetch("the-open-network", {})).data
		.market_data.current_price.usd;
	const tonFormattedPrice = Number(tonPrice) * 1000000000;

	tonPusher(tonFormattedPrice)
	await Market.create(
		{
			coin: "Ton",
			price: tonFormattedPrice,
		}
	)
};
