import { z } from 'zod'
import { container } from 'tsyringe'
import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProductUseCase } from './CreateProductUseCase'

class CreateProductController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const createProductBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      amount: z.number(),
    })

    const data = createProductBodySchema.parse(request.body)
    const createProductUseCase = container.resolve(CreateProductUseCase)

    await createProductUseCase.execute(data)

    return reply.status(201).send({ message: 'Product created' })
  }
}

export { CreateProductController }
