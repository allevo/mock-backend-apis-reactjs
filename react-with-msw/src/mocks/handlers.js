import { rest } from 'msw'

const movies = []

const baseUrl = import.meta.env.MODE === 'test' ? 'http://localhost:8080' : ''
export const handlers = [
  rest.post(baseUrl + '/api/movies', async (req, res, ctx) => {
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

  rest.get(baseUrl + '/api/movies', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(movies),
    )
  }),
]