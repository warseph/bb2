const nockUtils = require("nock-utils");
const details = require("../details");
const recorder = new nockUtils.HttpRecorder(
  `${__dirname}/cassettes/details.json`
);
const league = "Obscuria Potentis";
const id = "100086e993";

describe("Details Scraper", () => {
  jest.setTimeout(60000);
  beforeEach(() => recorder.start());
  afterEach(() => recorder.stop());

  it.each([
    "value",
    "winning dices",
    "supporters",
    "ball possession",
    "occupation: own",
    "occupation: their",
    "mvp",
    "passes",
    "catches",
    "interceptions",
    "touchdowns",
    "casualties",
    "tackles",
    "ko",
    "injuries",
    "dead",
    "meters running",
    "meters passing",
    "pushouts",
  ])("scraps the %s", async (stat) => {
    const result = await details(league, id);
    expect(result[stat].home).toMatch(/^\d+$/);
    expect(result[stat].away).toMatch(/^\d+$/);
  });
});
