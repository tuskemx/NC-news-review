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
                .then((response) => {
                    expect(response.body.topics).to.be.an('array');
                    expect(response.body.topics[0]).to.have.keys('description', 'slug');
                })
        })
    })
    describe('/articles', () => {
        it('GET: should respond with array of all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((response) => {
                    expect(response.body.articles).to.be.an('array');
                    expect(response.body.articles).to.have.lengthOf(12);
                    expect(response.body.articles[0]).to.have.keys(
                        'author',
                        'title',
                        'article_id',
                        'topic',
                        'created_at',
                        'votes',
                        'body',
                        'comment_count');
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query filters articles by user value specified in query', () => {
            return request(app)
                .get('/api/articles?author=butter_bridge')
                .expect(200)
                .then((response) => {
                    const len = response.body.articles.length - 1;
                    expect(response.body.articles[len].author).to.equal('butter_bridge');
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by default value', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((response) => {

                    expect(dateRemoveLetters(response.body.articles[0].created_at)).to.greaterThan(dateRemoveLetters(response.body.articles[5].created_at))

                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value comment count', () => {
            return request(app)
                .get('/api/articles?sort_by=comment_count')
                .expect(200)
                .then((response) => {
                    const len = response.body.articles.length - 1;
                    expect(Number(response.body.articles[0].comment_count)).to.greaterThan(Number(response.body.articles[len].comment_count));
                });
        });
    });
    describe('/articles', () => {
        it('GET: author query sorts by user value topic', () => {
            return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then((response) => {
                    expect(response.body.articles[0].topic).to.eql(response.body.articles[1].topic);
                });
        });
    });
    describe('/articles', () => {
        it('GET: query for author that doenst exist should 404', () => {
            return request(app)
                .get('/api/articles?author=not-an-author')
                .expect(404)
                .then((response) => {
                    expect(response.body.msg).to.eql('Articles Not Found');
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
                .then((response) => {
                    expect(response.body.article.article_id).to.eql(1);
                    expect(response.body.article.votes).to.eql(105);
                });
        });

    })
    describe('/articles/:article_id/comments', () => {
        it('GET status: 200. Responds with status 200 and an array of comments for the given `article_id`', () => {
            return request(app)
                .get('/api/articles/5/comments')
                .expect(200)
                .then((response) => {

                    expect(response.body.length).to.equal(2);
                    expect(response.body[0]).to.contain.keys('comment_id', 'author', 'votes', 'created_at', 'body', 'article_id');
                    expect(response.body[0].body).to.eql('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.')
                })
        })
    });
    describe('/articles/:article_id/comments', () => {
        it('GET: articles comments query sorts by given query', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes&order=asc')
                .expect(200)
                .then((response) => {
                    expect(response.body.length).to.equal(13);
                    const len = response.body.length;
                    expect(response.body[0].votes).to.be.lessThan(response.body[len - 1].votes)
                    expect(response.body[1].votes).to.be.lessThan(response.body[len - 1].votes)
                    expect(response.body[5].votes).to.be.lessThan(response.body[len - 1].votes)
                    expect(response.body[6].votes).to.be.lessThan(response.body[len - 3].votes)
                })
        })
    });
    describe.only('/articles/:article_id/comments', () => {
        it('POST accepts object with username and body property and res with posted comment', () => {
            return request(app)
                .post('/api/articles/2/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(201)
                .then((response) => {
                    console.log(response.body);
                    expect(response.body.comment[0]).to.contain({
                        article_id: 2,
                        author: 'icellusedkars',
                        body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                    });
                });
        });

    })


    describe('/comments/:comment_id', () => {
        it('Patch increments vote based on objet key value', () => {
            return request(app)
                .patch('/api/comments/3')
                .send({
                    inc_votes: 500
                })
                .expect(200)
                .then((response) => {

                    console.log(response.body.comment.votes);
                    expect(response.body.comment.votes).to.eql(600);
                    // no article id 

                });
        });
    });// accepts queries
    describe('/comments/:comment_id', () => {
        it('DELETE comment based on id given', () => {
            return request(app)
                .delete('/api/comments/3')
                .expect(204)
                .then((response) => {

                    console.log(response.body);
                    expect(response.body).to.eql({});
                    // no article id 

                });
        });
    });
    describe('/users', () => {
        it('GET: should respond with all user records, as array of objects', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .then((response) => {
                    expect(response.body.users).to.be.an('array');
                    expect(response.body.users[0].username).to.eql('butter_bridge');
                    expect(response.body.users).to.have.length(4);
                });
        });
    });

    describe('/users/:username', () => {
        it('GET should respond with relevant user object, based on request username', () => {
            return request(app)
                .get('/api/users/butter_bridge')
                .expect(200)
                .then((response) => {
                    expect(response.body.user).to.be.an('object');
                    expect(response.body.user.username).to.eql('butter_bridge');
                    expect(response.body.user.name).to.eql('jonny');

                });
        });
    });

});


