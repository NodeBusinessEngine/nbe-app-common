import { GetNBEBaseServer, BaseExpress } from '../index';
import request from 'supertest';

import featureRouter from './sampleFeature/sampleFeature.router';
import express from 'express';
describe('Base Express Server Tests', () => {
  let app: any = null;
  
  beforeEach(() => {
    const routes = [{baseUrl: '/api/sample/feature', handler: featureRouter}];
    app = GetNBEBaseServer(express(), routes);
  })
  describe('Test Server can instentiate properly', () => {
    test('Health Chck for Base server should return 200', async () => {
      const response = await request(app).get('/health');
      const { status = ''} = response.body;
      expect(response.statusCode).toEqual(200);
      expect(status).toEqual('UP');
    }),
  
    test('Can Add CustomRoutes to the server', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toEqual(200);
      const allUsersResponse = await request(app).get('/api/sample/feature');
      const allUsers = allUsersResponse.body
      expect(allUsersResponse.statusCode).toEqual(200);
      expect(allUsers.length).toEqual(5);
    })
  })

  describe('Test REST API Behaviour ',  () => {
    test('Can get single user by Id', async () => {
      const user1Response = await request(app).get('/api/sample/feature/1')
      expect(user1Response.statusCode).toEqual(200);
      const {id = 0, name=''} = user1Response.body;
      expect(name).toEqual('Suren Rodrigo');
      expect(id).toEqual(1);
    }),
    test('Create a new user', async () => {
      const newUser = {id: 6, name: 'Dinuka Rodrigo', age: 40, sex: 'Female'};
      const newUserReponse = await request(app).post('/api/sample/feature').send(newUser);
      expect(newUserReponse.statusCode).toEqual(201);
      const {id = 0, name=''} = newUserReponse.body;
      expect(name).toEqual('Dinuka Rodrigo');
      expect(id).toEqual(6);
    })
  })
})