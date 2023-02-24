import { FastifyInstance } from 'fastify'

export async function registerRoutes(app: FastifyInstance) {
  app.get('/', (request, reply) => {
    return reply.send('Register')
  })
}
