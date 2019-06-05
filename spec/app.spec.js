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
    describe.only('/articles', () => {
        it('GET: should have total_count key', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((response) => {
                    expect(response.body.articles).to.have.keys(
                        'totalcount');
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
        it('GET: invalid input for sort_by throws 400 error', () => {
            return request(app)
                .get('/api/articles?sort_by=not-a-column')
                .expect(400)
            // and error message find out how to specificy response on tests

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
                        'body',
                        'comment_count'
                    );

                    expect(response.body.article.article_id).to.equal(2);
                })
        })
    })
    describe('/api/:articles_id', () => {
        it("GET bad request respond with 400", () => {
            return request(app)
                .get('/api/articles/dog')
                .expect(400)
        })
    })
    describe('/api/:articles_id', () => {
        it("responds to GET requests with a single article and comment count", () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then((response) => {
                    expect(response.body.article).to.have.keys(
                        'author',
                        'title',
                        'article_id',
                        'topic',
                        'created_at',
                        'votes',
                        'body',
                        'comment_count',
                    );

                    expect(response.body.article.article_id).to.equal(1);
                    expect(response.body.article.comment_count).to.equal('13');
                })
        })
    })
    describe('/api/:articles_id', () => {
        it("responds to GET requests with a single article and comment count", () => {
            return request(app)
                .get('/api/articles/1000')
                .expect(404)
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
                    expect(response.body.comments.length).to.equal(2);
                    expect(response.body.comments[0]).to.contain.keys('comment_id', 'author', 'votes', 'created_at', 'body', 'article_id');
                    expect(response.body.comments[0].body).to.eql('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.')
                })
        })
    });

    describe('/articles/:article_id/comments', () => {
        it('GET status: 404 as article has no comments', () => {
            return request(app)
                .get('/api/articles/2/comments')
                .expect(200)
                .then((response) => {


                    // expect(response.body.comments).to.equal(response.body.comments);
                    expect(response.body.comments).to.eql([])
                })
        })
    });
    describe('/articles/:article_id/comments', () => {
        it('POST expect unprocessable entity 422 error for large article ID', () => {
            return request(app)
                .post('/api/articles/2000/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(422)
        });
    });
    describe('/articles/:article_id/comments', () => {
        it('GET status: 200. Responds with status 200 and an array of comments for the given `article_id`', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then((response) => {

                    expect(response.body.comments.length).to.equal(13);
                    // expect(response.body.comments).to.contain.keys('comment_id', 'author', 'votes', 'created_at', 'body', 'article_id');
                    // expect(response.body[0].body).to.eql('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.')
                })
        })
    });
    describe('/articles/:article_id/comments', () => {
        it('GET: articles comments query sorts by given query', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes&order=asc')
                .expect(200)
                .then((response) => {
                    let len = response.body.comments.length - 1
                    expect(response.body.comments[0].votes).to.be.lessThan(response.body.comments[len].votes)
                    expect(response.body.comments[0].votes).to.be.lessThan(response.body.comments[len - 1].votes)
                    expect(response.body.comments[0].votes).to.be.lessThan(response.body.comments[len - 2].votes)

                    // expect(response.body.comments.votes).to.be.ascendingBy('votes')
                    // expect(response.body.comments.votes).to.not.be.descendingBy('votes');
                })
        })
    });
    // describe('/articles/:article_id/comments', () => {
    //     it('GET: defaults to created desc', () => {
    //         return request(app)
    //             .get('/api/articles/1/comments?order=asc')
    //             .expect(200)
    //             .then(([response]) => {
    //                 //works but test is wrong

    //                 // expect(response.body[0].created_at).to.be.sorted({ascending: true})
    //                 expect(response.body[0].created_at).to.be.lessThan(response.body[1].created_at);


    //                 // expect(response.body.comments.votes).to.be.ascendingBy('votes')
    //                 // expect(response.body.comments.votes).to.not.be.descendingBy('votes');
    //             })
    //     })
    // });
    describe('/articles/:article_id/comments', () => {
        it('GET: 404 when not a valid article_id', () => {
            return request(app)
                .get('/api/articles/1000/comments')
                .expect(404)
        })
    })

    describe('/articles/:article_id/comments', () => {
        it('POST accepts object with username and body property and res with posted comment', () => {
            return request(app)
                .post('/api/articles/2/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(201)
                .then((response) => {
                    expect(response.body.comment).to.contain({
                        article_id: 2,
                        author: 'icellusedkars',
                        body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                    });
                });
        });

    })
    describe('/articles/:article_id/comments', () => {
        it('POST status code 400 bad request when not valid article_id', () => {
            return request(app)
                .post('/api/articles/not-a-valid-id/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(400)
        });
    });
    describe('/articles/:article_id/comments', () => {
        it('POST expect unprocessable entity 422 error for large article ID', () => {
            return request(app)
                .post('/api/articles/2000/comments')
                .send({
                    author: 'icellusedkars',
                    body: 'TESSSSSSSSSSSSSSTTTTTTTTT'
                })
                .expect(422)
        });
    });





    describe('/comments/:comment_id', () => {
        it('Patch increments vote based on object key value', () => {
            return request(app)
                .patch('/api/comments/3')
                .send({
                    inc_votes: 500
                })
                .expect(200)
                .then((response) => {


                    expect(response.body.comment.votes).to.eql(600);
                    // no article id 

                });
        });
        describe('/comments/:comment_id', () => {
            it('Patch throws correct 400 error when invalid value', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: 'test'
                    })
                    .expect(400)
            });
        });

        describe('/comments/:comment_id', () => {
            it('Patch throws correct 404 error when invalid value', () => {
                return request(app)
                    .patch('/api/comments/not-a-valid-id')
                    .send({
                        inc_votes: 4
                    })
                    .expect(400)


            });
        });// accepts queries
        describe('/comments/:comment_id', () => {
            it('DELETE comment based on id given', () => {
                return request(app)
                    .delete('/api/comments/3')
                    .expect(204)
                    .then((response) => {


                        expect(response.body).to.eql({});
                        // no article id 

                    });
            });
        });
        describe('/comments/:comment_id', () => {
            it('DELETE comment returns correct error when invalid comment_id', () => {
                return request(app)
                    .delete('/api/comments/not-a-number')
                    .expect(400)
            });
        });
        describe('/comments/:comment_id', () => {
            it('DELETE comment returns correct error when comment_id format is valid but doesnt exist)', () => {
                return request(app)
                    .delete('/api/comments/1000')
                    .expect(404)
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
        describe('/users/:username', () => {
            it('GET invalid `user_id`, should throw a 404: Not Found status code', () => {
                return request(app)
                    .get('/api/users/not-a-username')
                    .expect(404)
            });
        });

    });
    describe('POST', () => {
        it('responds with the posted user, containing their username, avatar_url & name', () => {
            const test = {
                username: 'test',
                avatar_url: 'www.google.com',
                name: 'testName',
            };
            return request(app)
                .post('/api/users')
                .send(test)
                .expect(201)
                .then((response) => {
                    expect(response.body.postedUser).to.include({
                        username: 'test',
                        avatar_url: 'www.google.com',
                        name: 'testName',
                    });
                });

        });
    });
});