import { initMongo } from "../src/services/mongoService";
import { Market } from "../src/models/Market";

describe("update ", () => {
  beforeAll(() => initMongo());
  it("fill markets in db", async () => {
    const marketsList = [
      {
        coin: "Ton",
        price: 100000000,
      },
    ];
    await Market.deleteMany({});
    marketsList.forEach((e) => Market.create(e));
  }, 1000000);
});
