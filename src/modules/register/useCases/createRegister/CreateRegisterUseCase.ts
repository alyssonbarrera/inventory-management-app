import { inject, injectable } from 'tsyringe'
import { IRegistersRepository } from '@modules/register/repositories/IRegistersRepository'
import { ICreateRegisterDTO } from '@modules/register/dtos/ICreateRegisterDTO'

@injectable()
class CreateRegisterUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
  ) {}

  async execute(data: ICreateRegisterDTO) {
    return await this.registersRepository.create(data)
  }
}

export { CreateRegisterUseCase }
