process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const { articleData } = require('../db/data/test-data/index');
const { formatDate, createRef, formatComments } = require('../formattingfunctions')

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

describe('date fixing function', () => {
  it('parses the dates on an array', () => {
    const testData = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      },
    ];
    const actual = formatDate(testData);
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: '2016-08-18T12:07:52.389Z',
      },
    ];
    expect(actual).to.eql(expected);
  });
});

describe('createRef', () => {
  it('test if a reference object is created from an array', () => {
    const testArticles = [{
      article_id: 17,
      title: 'Which current Premier League manager was the best player?',
      body:
        "Premier League managers work with some of the top players in world football - but were they any good in their day? From European Cup and league title winners to one manager who only played at university, there's a diverse range of experience among the top-flight bosses. We've taken a look at the playing achievements and ability of the current Premier League managers and ranked them. Read on to see who ranks where...",
      votes: 0,
      topic: 'football',
      author: 'cooljmessy',
      created_at: '2016 - 07 - 11T23: 00: 00.000Z',
    },
    {
      article_id: 18,
      title:
        'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      body:
        'With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.',
      votes: 0,
      topic: 'football',
      author: 'grumpy19',
      created_at: '2018 - 03 - 27T23: 00: 00.000Z',
    }];
    const result = { 'Which current Premier League manager was the best player?': 17, 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18 };
    expect(createRef(testArticles, 'title', 'article_id')).to.eql(result);
  });
});

describe('formatComments', () => {
  it('tests the comments are formatted correctly except for the date', () => {
    const testComments = [{
      body: 'Ea iure voluptas. Esse vero et dignissimos blanditiis commodi rerum dicta omnis modi.',
      belongs_to: 'Who are the most followed clubs and players on Instagram?',
      created_by: 'cooljmessy',
      votes: -1,
      created_at: 1472375043865,
    },
    {
      body: 'Incidunt quidem ut. Voluptatem blanditiis ipsa commodi suscipit quae et. Magni assumenda veritatis voluptatem dolor qui.',
      belongs_to: 'Thanksgiving Drinks for Everyone',
      created_by: 'weegembump',
      votes: 7,
      created_at: 1476619021010,
    }];
    const testRef = {
      'Who are the most followed clubs and players on Instagram?': 1,
      'Thanksgiving Drinks for Everyone': 99,
    };
    const result = [{
      body: 'Ea iure voluptas. Esse vero et dignissimos blanditiis commodi rerum dicta omnis modi.',
      article_id: 1,
      author: 'cooljmessy',
      votes: -1,
      created_at: 1472375043865,
    },
    {
      body: 'Incidunt quidem ut. Voluptatem blanditiis ipsa commodi suscipit quae et. Magni assumenda veritatis voluptatem dolor qui.',
      article_id: 99,
      author: 'weegembump',
      votes: 7,
      created_at: 1476619021010,
    }];
    expect(formatComments(testComments, testRef)).to.eql(result);
  });
});
