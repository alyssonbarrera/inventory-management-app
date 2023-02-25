import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateRegisterUseCase } from './UpdateRegisterUseCase'

class UpdateRegisterController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ message: 'Missing id' })
    }

    const updateRegisterBodySchema = z.object({
      product_id: z.string().optional(),
      amount: z.number().optional(),
      type: z.enum(['input', 'output']).optional(),
    })

    const data = updateRegisterBodySchema.parse(request.body)

    const keys = Object.keys(data)

    if (keys.length === 0) {
      return reply
        .status(400)
        .send({ message: 'At least one field must be provided' })
    }

    const updateRegisterUseCase = container.resolve(UpdateRegisterUseCase)
    await updateRegisterUseCase.execute({ id, ...data })

    return reply.status(200).send({ message: 'Register updated' })
  }
}

export { UpdateRegisterController }
