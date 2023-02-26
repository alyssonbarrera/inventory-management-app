import { inject, injectable } from 'tsyringe'
import { IRegistersRepository } from '@modules/registers/repositories/IRegistersRepository'

@injectable()
class ListRegistersUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
  ) {}

  async execute() {
    return await this.registersRepository.list()
  }
}

export { ListRegistersUseCase }
