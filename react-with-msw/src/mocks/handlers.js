import { rest } from 'msw'

const movies = []
export const handlers = [
  rest.post('/api/movies', async (req, res, ctx) => {
    const body = await req.json()
    movies.push({
      ...body,
      id: movies.length + 1,
    })

    return res(
      ctx.status(200),
      ctx.json({}),
    )
  }),

  rest.get('/api/movies', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(movies),
    )
  }),
]