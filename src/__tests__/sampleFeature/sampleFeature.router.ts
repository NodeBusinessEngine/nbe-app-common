import { exception } from "console";
import express, { Request, Response } from "express";
import HttpException from "../../common-domain/http-exception";
const featureRouter = express.Router();

const testUserData = [
  {id: 1, name: 'Suren Rodrigo', age: 39, sex: 'Male'},
  {id: 2, name: 'Thamali Rodrigo', age: 43, sex: 'Female'},
  {id: 3, name: 'Patrick Rodrigo', age: 73, sex: 'Male'},
  {id: 4, name: 'Dilika Rodrigo', age: 46, sex: 'Female'},
  {id: 5, name: 'Irangani Rodrigo', age: 74, sex: 'Female'},
];

featureRouter.get('/', async (req: Request, res: Response) => {
   res.status(200).send(testUserData);
})

featureRouter.get('/:id/:throwException?', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const throwException = req.params.throwException ? true : false;
  try {
    if (throwException) throw new Error('Testing Error Thrown');
    const result = testUserData.find(user => user.id === id);
    if(result) {
      res.status(200).send(result)
    } else {
      res.status(404).send('User not found');
    }
  } catch(e) {
    res.status(500).send(e.message);
  }
})

featureRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {id=0, name='', age=0, sex=''} = req.body;
    if(!id || !name || !age || !sex) {
      res.status(400).send('Data Missing to create the user')
    } else {
      const newUser = {id, name, age, sex};
      testUserData.push(newUser)
      res.status(201).send(newUser)
    }

  } catch(e) {
    res.status(500).send(e.message);
  }
})

export default featureRouter;