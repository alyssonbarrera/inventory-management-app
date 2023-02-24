import { z } from 'zod'
import { container } from 'tsyringe'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateProductUseCase } from './UpdateProductUseCase'

class UpdateProductController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const updateProductBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      amount: z.number().optional(),
    })

    const data = updateProductBodySchema.parse(request.body)
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Missing id' })
    }

    const keys = Object.keys(data)

    if (keys.length === 0) {
      return reply
        .status(400)
        .send({ error: 'At least one field must be provided' })
    }

    const updateProductUseCase = container.resolve(UpdateProductUseCase)

    await updateProductUseCase.execute({ id, ...data })

    return reply.status(200).send({ message: 'Product updated' })
  }
}

export { UpdateProductController }
