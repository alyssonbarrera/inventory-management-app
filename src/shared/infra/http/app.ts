import 'reflect-metadata'
import '../../container/index'

import fastify from 'fastify'

import { productsRoutes } from './routes/products'
import { registerRoutes } from './routes/register'
import { AppError } from '@shared/errors/AppError'

const app = fastify()

app.register(productsRoutes, { prefix: '/products' })
app.register(registerRoutes, { prefix: '/registers' })

app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  } else {
    return reply.status(500).send({ message: 'Internal server error' })
  }
})

export { app }
