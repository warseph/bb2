const nockUtils = require("nock-utils");
const entries = require("../entries");
const recorder = new nockUtils.HttpRecorder(
  `${__dirname}/cassettes/entries.json`
);
const league = "Obscuria Potentis";
const match = 50;

describe("Entries Scraper", () => {
  jest.setTimeout(60000);
  beforeEach(() => recorder.start());
  afterEach(() => recorder.stop());

  it("scraps the home team name", async () => {
    const result = await entries(league);
    expect(result[match].home.team).toMatch(/^[a-z0-9 ]+$/i);
  });

  it("scraps the home team coach", async () => {
    const result = await entries(league);
    expect(result[match].home.coach).toMatch(/^[a-z0-9 ]+$/i);
  });

  it("scraps the away team name", async () => {
    const result = await entries(league);
    expect(result[match].away.team).toMatch(/^[a-z0-9 ]+$/i);
  });

  it("scraps the away team coach", async () => {
    const result = await entries(league);
    expect(result[match].away.coach).toMatch(/^[a-z0-9 ]+$/i);
  });

  it("scraps the result", async () => {
    const result = await entries(league);
    expect(result[match].result).toMatch(/^[0-9?] - [0-9?]$/);
  });

  it("scraps the id", async () => {
    const result = await entries(league);
    expect(result[match].id).toMatch(/^[\da-f]+$/i);
  });

  it("scraps the competition name", async () => {
    const result = await entries(league);
    expect(result[match].competition.name).toMatch(/^[a-z0-9 ]+$/i);
  });

  it("scraps the competition image", async () => {
    const result = await entries(league);
    expect(result[match].competition.image).toMatch(/^https?:\/\/.*$/i);
  });
});
