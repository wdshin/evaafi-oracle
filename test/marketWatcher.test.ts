import { initMongo } from "../src/services/mongoService";
import { marketsWatcher } from "../src/crons/marketsWatcher";

describe("update markets Data", () => {
  beforeAll(() => initMongo());
  it("sync data", () => marketsWatcher(), 500000);
});
