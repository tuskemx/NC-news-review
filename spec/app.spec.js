process.env.NODE_ENV = 'test';
const chaiSorted = require('chai-sorted')
const chai = require('chai')
const {
    expect
} = require('chai');
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection')
const { dateRemoveLetters } = require('../formattingfunctions')

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
        it('GET: author query sorts by default value', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((result) => {
                    expect(dateRemoveLetters(result.body.articles[0].created_at)).to.greaterThan(dateRemoveLetters(result.body.articles[21].created_at));
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value comment count', () => {
            return request(app)
                .get('/api/articles?sort_by=comment_count')
                .expect(200)
                .then((result) => {
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
                .send({ inc_votes: 5 })
                .expect(200)
                .then((result) => {
                    expect(result.body.article.article_id).to.eql(1);
                    expect(result.body.article.votes).to.eql(105);
                });
        });

    })
    describe('/articles/:article_id/comments', () => {
        it('GET status: 200. Responds with status 200 and an array of comments for the given `article_id`', () => {
            return request(app)
                .get('/api/articles/5/comments')
                .expect(200)
                .then((res) => {

                    expect(res.body.length).to.equal(2);
                    expect(res.body[0]).to.contain.keys('comment_id', 'author', 'votes', 'created_at', 'body', 'article_id');
                    expect(res.body[0].body).to.eql('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.')
                })
        })
    });
    describe('/articles/:article_id/comments', () => {
        it('GET status: 200. tests queries for comments when given article_id', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes&order=asc')
                .expect(200)
                .then((res) => {
                    expect(res.body.length).to.equal(13);
                    const len = res.body.length;
                    expect(res.body[0].votes).to.be.lessThan(res.body[len - 1].votes)
                    expect(res.body[1].votes).to.be.lessThan(res.body[len - 1].votes)
                    expect(res.body[5].votes).to.be.lessThan(res.body[len - 1].votes)
                    expect(res.body[6].votes).to.be.lessThan(res.body[len - 3].votes)
                })
        })
    });
    describe('/articles/:article_id/comments', () => {
        it('Patch accepts object with username and body property and res with posted comment', () => {
            return request(app)
                .patch('/api/articles/2/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(200)
                .then((result) => {

                    expect(result.body).to.have.keys('comm');
                    expect(result.body.comm[0].article_id).to.eql(2);
                    // no article id 

                });
        });

    })
    describe('/comments/:comment_id', () => {
        it('Patch accepts object with username and body property and res with posted comment', () => {
            return request(app)
                .patch('/api/comments/3')
                .send({
                    inc_votes: 500
                })
                .expect(200)
                .then((result) => {

                    console.log(result.body.comment.votes);
                    expect(result.body.comment.votes).to.eql(600);
                    // no article id 

                });
        });
    });// accepts queries
    describe('/comments/:comment_id', () => {
        it('Patch accepts object with username and body property and res with posted comment', () => {
            return request(app)
                .delete('/api/comments/3')
                .expect(204)
                .then((result) => {

                    console.log(result.body);
                    expect(result.body).to.eql({});
                    // no article id 

                });
        });
    });
    describe('/users/:username', () => {
        it('GET request to users which responds with username, avatar_url and name', () => {
            return request(app)
                .delete('/users/mitch')
                .expect(200)
                .then((result) => {

                    console.log(result.body);
                    expect(result.body).to.eql('test');
                    // no article id 

                });
        });
    });

});





    //desc / it / return request(app).delete('/api/house/invalid_id_format).expect(400)
    //.then({body}) => {
        //expect(body.msg).to.equal('bad request')
