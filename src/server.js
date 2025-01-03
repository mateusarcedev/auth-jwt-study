import express, { response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { user, PRIVATE_KEY, tokenValited } from './auth.js'

const api = express();
api.use(express.json());

api.get("/", (_, res) => res.status(200).send({
  message: 'This is a PUBLIC router'
}));

api.get('/login', (req, res) => {
  const [, hash] = req.headers.authorization?.split(' ') || [' ', ' '];
  const [email, password] = Buffer.from(hash, "base64").toString().split(':');

  try {
    const correctPassword = email === 'mateus@teste.com' && password === '1234';

    if (!correctPassword) return response.status(401).send('Email ou senha incorretos');

    const token = jsonwebtoken.sign(
      { user: JSON.stringify(user) },
      PRIVATE_KEY,
      { expiresIn: '60m' }
    );

    return res.status(200).json({ data: { user, token } });

  } catch (error) {
    return res.send(error);
  }
});

api.use('*', tokenValited);

api.get('/private', (req, res) => {
  const { user } = req.headers
  const currentUser = JSON.parse(user);
  return res.status(200).json({
    message: 'This is a PRIVATE router',
    data: {
      userLogged: currentUser
    }
  })
});

api.listen(3333, () => console.log('server running...'))