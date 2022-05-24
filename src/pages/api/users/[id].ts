import { NextApiRequest, NextApiResponse } from 'next';

const user = (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);

  const users = [
    { id: 1, name: 'Pedro' },
    { id: 2, name: 'Diego' },
    { id: 3, name: 'Dani' },
  ]
  const user = users.find(user => user.id == request.query.id)
  return response.json(user)
}

export default user

