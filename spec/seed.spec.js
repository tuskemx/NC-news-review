process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const { articleData } = require('../db/data/test-data/index');
const { formatDate, createRef, formatComments } = require('../formattingfunctions')

const app = require('../app');
const connection = require('../db/connection');

describe('test date', () => {
  it('changes date', () => {
    const testData = [
      {
        title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1416140514171,
      },
    ];
    const actual = formatDate(testData);
    const expected = [
      {
        title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: '2014-11-16T12:21:54.171Z',
      },
    ];
    expect(actual).to.eql(expected);
  });
});

describe('createRef', () => {
  it('check to see if ref obj created', () => {
    const testArticles = [{
      article_id: 1,
      title: 'A',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Delicious tin of cat food',
      created_at: 911564514171,
    },
    {
      article_id: 2,
      title: 'Z',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'I was hungry.',
      created_at: 785420514171,
    }];
    const result = { 'A': 1, 'Z': 2 };
    expect(createRef(testArticles, 'title', 'article_id')).to.eql(result);
  });
});





// describe('dateRemoveLetters', () => {
//   it('function removes letters from string', () => {
//     const input = '2018-11-15T00:00:00.000Z'
//     const result = 20181115000000000
//     expect(dateRemoveLetters(input)).to.eql(result);
//   });
// });

