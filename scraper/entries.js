const scrapeIt = require('scrape-it');

const url = league =>
  `https://web.cyanide-studio.com/ws/bb2/?league=${league.replace(/ /g, '+')}&platform=pc&ajax=entries`;

module.exports = league => scrapeIt(url(league), {
  matches: {
    listItem: 'tr',
    data: {
      competition: {
        data: {
          name: {
            selector: '.left > a',
            eq: 0,
          },
          image: {
            selector: '.left > a > span > img',
            attr: 'src',
            eq: 0,
          }
        }
      },
      home: {
        data: {
          coach: {
            selector: '.right > a',
            eq: 0
          },
          team: {
            selector: '.right > a',
            eq: 1
          }
        }
      },
      away: {
        data: {
          coach: {
            selector: '.left > a',
            eq: 3
          },
          team: {
            selector: '.left > a',
            eq: 2
          }
        }
      },
      result: {
        selector: '.center',
        eq: 1
      },
      id: {
        selector: '.center > a',
        attr: 'data',
        eq: 1
      }
    }
  }
});
