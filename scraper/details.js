const scrapeIt = require('scrape-it');

const url = (league, id) =>
  `https://web.cyanide-studio.com/ws/bb2/?league=${league.replace(/ /g, '+')}&platform=pc&ajax=entry&id=${id}`;

const scrap = (league, id) => scrapeIt(url(league, id), {
  stats: {
    listItem: 'tr',
    data: {
      name: {
        selector: 'td',
        eq: 0
      },
      home: {
        selector: 'td',
        eq: 1
      },
      away: {
        selector: 'td',
        eq: 2
      }
    }
  }
});

module.exports = async (league, id) =>
  (await scrap(league,id))
    .data
    .stats
    .slice(1)
    .reduce((acc, {name, home, away}) => ({
      ...acc,
      [name]: {home, away}
    }), {});