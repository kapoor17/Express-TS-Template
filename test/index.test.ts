// eslint-disable-next-line node/no-unpublished-import
import supertest from 'supertest';
import expressLoader from '../src/loaders/express';

describe('Hello World', () => {
  it('Returns Hello World', async () => {
    await supertest(expressLoader()).get('/hello').expect('Hello World!');
  });
});
