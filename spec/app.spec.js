process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const { articleData } = require('../db/data/test-data/index');
const { formatDate } = require('../formattingfunctions')

const app = require('../app');
const connection = require('../db/connection');

describe('/', () => {
  // beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
});

describe('formatDate()', () => {
  it('check func runs cause its not atm', () => {

    const input = articleData;
    console.log('hello')
    const checkTimefunc = formatDate(input);
    console.log(checkTimefunc);
    console.log(input[0]);
    expect(formatDate(input[0])).to.equal([
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: "2018-11-15T12:21:54.171Z"
      }]);
  });
});

// describe('createRef()', () => {
//   it('check func runs cause its not atm', () => {

//     const input = articleData;
//     console.log('hello')
//     const checkTimefunc = formatDate(input);
//     console.log(checkTimefunc);
//     console.log(input[0]);
//     expect(formatDate(input[0])).to.equal([
//       {
//         title: 'Running a Node App',
//         topic: 'coding',
//         author: 'jessjelly',
//         body:
//           'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
//         created_at: "2018-11-15T12:21:54.171Z"
//       }]);
//   });
// });



