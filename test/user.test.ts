import { initMongo } from "../src/services/mongoService";
import { User } from "../src/models/User";

describe("user", () => {
  beforeAll(() => initMongo());
  it("add user in db", async () => {
    const marketsList = [
      {
        ownerAddress: 'EQD7TNVnRnSGHq-E0xDokOqOI8zHlJPHPqb_RmeUgaC8MXGi',
        apiKey: 'test',
        oracles: [{
          oracleKey: 'test',
          oracleAddress: 'test',
          masterAddress: 'test',
          clientAddress: 'test',
          userAddress: 'test',
        }]
      },
      {
        ownerAddress: 'test',
        apiKey: 'test',
        oracles: []
      },
    ];
    await User.deleteMany({});
    // marketsList.forEach((e) => User.create(e));
  }, 1000000);
});
