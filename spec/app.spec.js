process.env.NODE_ENV = 'test';
const chaiSorted = require('chai-sorted')
const chai = require('chai')
const {
    expect
} = require('chai');
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection')

chai.use(chaiSorted);



describe('/api', () => {
    beforeEach(() => connection.seed.run());
    after(() => connection.destroy());
    describe('/topics', () => {
        it('responds to GET request with array of topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then((res) => {
                    expect(res.body.topics).to.be.an('array');
                    expect(res.body.topics[0]).to.have.keys('description', 'slug');
                })
        })
    })
    describe('/articles', () => {
        it('GET: should respond with array of all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((result) => {
                    expect(result.body.articles).to.be.an('array');
                    expect(result.body.articles).to.have.lengthOf(26);
                    expect(result.body.articles[0]).to.have.keys(
                        'author',
                        'title',
                        'article_id',
                        'topic',
                        'created_at',
                        'votes',
                        'comment_count');
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query filters articles by user value specified in query', () => {
            return request(app)
                .get('/api/articles?author=butter_bridge')
                .expect(200)
                .then((result) => {
                    const len = result.body.articles.length - 1;
                    expect(result.body.articles[len].author).to.equal('butter_bridge');
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((result) => {
                    expect(result.body.articles[0].created_at).to.lessThan(result.body.articles[1].created_at);
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value comment count', () => {
            return request(app)
                .get('/api/articles?sort_by=comment_count')
                .expect(200)
                .then((result) => {
                    console.log(result.body);
                    const len = result.body.articles.length - 1;
                    expect(Number(result.body.articles[0].comment_count)).to.greaterThan(Number(result.body.articles[len].comment_count));
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value topic', () => {
            return request(app)
                .get('/api/articles?topic=cats')
                .expect(200)
                .then((result) => {
                    console.log(result.body);
                    expect(result.body.articles[0].topic).to.eql(result.body.articles[1].topic);
                });
        });
    });
    // should accept queries sort_by / order / author / topic
    describe('/api/:articles_id', () => {
        it("responds to GET requests with a single article and comment count", () => {
            return request(app)
                .get('/api/articles/2')
                .expect(200)
                .then((response) => {
                    expect(response.body.article).to.have.keys(
                        'author',
                        'title',
                        'article_id',
                        'topic',
                        'created_at',
                        'votes',
                        'comment_count',
                    );
                    expect(response.body.article.article_id).to.equal(2);
                })
        })
    })
    describe('/:article_id', () => {
        it('PATCH: should respond vote incremented article object', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 1 })
                .expect(200)
                .then((result) => {
                    
                    console.log(result.body.article.votes);
                    expect(result.body.article.article_id).to.eql(1);
                    expect(result.body.article.votes).to.eql(101);
                });
        });

    })
});




    //desc / it / return request(app).delete('/api/house/invalid_id_format).expect(400)
    //.then({body}) => {
        //expect(body.msg).to.equal('bad request')
