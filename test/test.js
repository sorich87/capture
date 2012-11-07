var app = require('../app')
  , assert = require('assert')
  , request = require('supertest');

describe ('GET /', function () {
  it ('should return screenshot when URL is provided', function (done) {
    request(app)
      .get('/?url=http://google.com')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .expect(/PNG/, done)
  });

  it ('should respond 400 to malformed requests', function (done) {
    request(app)
      .get('/')
      .expect(400)
  });

  it ('should respond 404 to incorrect URLs', function (done) {
    request(app)
      .get('/?url=t')
      .expect(404)
  })
})

