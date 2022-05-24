import { NextApiRequest, NextApiResponse } from 'next';

export default function User(request: NextApiRequest, response: NextApiResponse) {

  const users = [
    { id: 1, name: 'Pedro' },
    { id: 2, name: 'Diego' },
    { id: 3, name: 'Dani' },
  ]

  return response.json(users)
}