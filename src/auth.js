import jsonwebtoken from "jsonwebtoken";

export const PRIVATE_KEY = '1010FFF'
export const user = {
  name: 'Mateus Arce',
  email: 'mateus@teste.com'
}

export function tokenValited(
  request,
  response,
  next
) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];

  if (!token) return response.status(401).send('Acess denied.');

  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if (!user && !userIdFromToken) {
      return response.send(401).json({ message: 'Invalid Token' })
    }

    request.headers['user'] = payload.user;

    return next;
  } catch (error) {
    console.error(error);
    return response.status(401).json({
      message: 'Invalid token'
    })
  }
}