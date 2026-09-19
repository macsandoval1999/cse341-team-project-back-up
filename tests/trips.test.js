import { describe, expect, test } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Trip pages', () => {
  test('renders trips loaded through the Mongoose Trip model', async () => {
    const response = await request(app).get('/trips');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Alpine Panorama Express');
    expect(response.text).toContain('Coastal Breeze Line');
  });

  test('renders a trip detail loaded through the Mongoose Trip model', async () => {
    const response = await request(app).get('/trips/alpine-panorama');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Alpine Panorama Express');
  });
});