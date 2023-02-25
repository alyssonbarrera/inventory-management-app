import { z } from 'zod'
import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateRegisterUseCase } from './CreateRegisterUseCase'

class CreateRegisterController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const createRegisterBodySchema = z.object({
      product_id: z.string(),
      amount: z.number(),
      type: z.enum(['input', 'output']),
    })

    const data = createRegisterBodySchema.parse(request.body)
    const createRegisterUseCase = container.resolve(CreateRegisterUseCase)

    await createRegisterUseCase.execute(data)

    return reply.status(201).send()
  }
}

export { CreateRegisterController }
