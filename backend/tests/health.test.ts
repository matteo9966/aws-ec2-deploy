import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

describe('health route', () => {
  it('returns ok status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('serves home page html', async () => {
    const response = await request(app).get('/home');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('Welcome to the home page');
  });

  it('returns mocked users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: '1',
          name: 'Mock User',
          email: 'mock.user@example.com',
        },
      ],
    });
  });
});
