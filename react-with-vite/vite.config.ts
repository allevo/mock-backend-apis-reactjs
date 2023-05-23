import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Fastify from 'fastify'
import { setTimeout } from 'timers/promises'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    myCustomPlugin(),
  ],
})

function myCustomPlugin() {
  
  return {
    name: "my-dev-server",
    async configureServer(devServer) {
      const server = Fastify()
      const movies = []
      server.get('/movies', function (req, res) {
        return movies
      })
      server.post('/movies', function (req, res) {
        movies.push({
          ...req.body,
          id: movies.length + 1,
        })
        return {}
      })

      devServer.middlewares.use(
        '/api',
        async function(req, res) {
          await setTimeout(1_000)

          console.log(req.method, req.url)
          const response = await server.inject({
            method: req.method,
            url: req.url,
            payload: req,
            headers : {
              'Content-type': req.headers['content-type']
            }
          })

          res.statusCode = response.statusCode
          res.setHeader('Content-type', response.headers['content-type'])
          res.end(response.body)
        }
      )
    }
  }
}