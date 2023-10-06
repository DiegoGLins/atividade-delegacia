import prisma from "../database/prisma.database";
import { Arma } from "../models/arma.model";
import { ResponseDto } from "../dtos/response.dto";

class ArmaService {
  public async listArmas(): Promise<ResponseDto> {

    const armas = await prisma.arma.findMany()
    if (!armas) {
      return {
        code: 404,
        message: "Nenhuma arma para listar"
      }
    }
    return {
      code: 200,
      message: "Armas listadas com sucesso",
      data: armas
    }
  }


  public async createArma(data: CreateArmaDto) {
    const newArma = new Arma(data.tipo, data.descricao, data.idCrime, data.idCriminoso)

    const createArma = await prisma.arma.create({
      data: newArma.toJson()
    })

    return createArma
  }

  public async update(data: UpdateArmaDto): Promise<ResponseDto> {
    const arma = await prisma.arma.findUnique({
      where: {
        id: data.idArma
      }
    })

    if (!arma) {
      return {
        code: 404,
        message: "Arma não encontrada"
      }
    }
    const updateArma = await prisma.arma.update({
      where: {
        id: data.idArma
      },
      data: {
        tipo: data.tipo,
        descricao: data.descricao,
      }
    })
    return {
      code: 200,
      message: "Arma editada com sucesso",
      data: updateArma
    }
  }

  public async delete(id: string): Promise<ResponseDto> {
    const arma = await prisma.arma.findUnique({
      where: {
        id
      }
    })

    if (!arma) {
      return {
        code: 404,
        message: "Arma não encontrada"
      }
    }

    await prisma.arma.delete({
      where: {
        id
      }
    })
    return {
      code: 200,
      message: "Arma deletada com sucesso"
    }
  }

}
export default new ArmaService();
