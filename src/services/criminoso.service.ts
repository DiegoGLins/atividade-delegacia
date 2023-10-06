import prisma from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateCriminosoDto, UpdateCriminosoDto } from "../dtos/criminoso.dto";
import { Criminoso } from "../models/criminoso.model";


class CriminosoService {
  public async listAll(): Promise<ResponseDto> {
    const data = await prisma.criminoso.findMany();

    return {
      code: 200,
      message: "criminosos listados com sucesso",
      data,
    };
  }

  public async create(data: CreateCriminosoDto) {

    const criminoso = new Criminoso(data.nome, data.cpf, data.endereco);

    const criacaoCriminoso = await prisma.criminoso.create({
      data: {
        nome: criminoso.nome,
        cpf: criminoso.cpf,
        endereco: criminoso.endereco
      }
    });

    return criacaoCriminoso;
  }

  public async delete(id: string): Promise<ResponseDto> {
    // 1- verificar se criminoso existe
    const criminoso = await prisma.criminoso.findUnique({
      where: {
        id,
      },
    });

    if (!criminoso) {
      return {
        code: 404,
        message: "criminoso não existe",
      };
    }

    // 2- deletar o criminoso
    await prisma.criminoso.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: "criminoso excluído com sucesso",
    };
  }

  public async update(data: UpdateCriminosoDto): Promise<ResponseDto> {
    // 1 - verificar se o criminoso existe
    const criminoso = await prisma.criminoso.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!criminoso) {
      return {
        code: 404,
        message: "Criminoso não existe",
      };
    }

    // 2 - atualizar o criminoso
    const atualizaCriminoso = await prisma.criminoso.update({
      where: {
        id: data.id,
      },
      data: {
        nome: data.nome,
        cpf: data.cpf,
        endereco: data.endereco,
      },
    });

    return {
      code: 200,
      message: "Criminoso atualizado com sucesso",
      data: atualizaCriminoso,
    };
  }
}
export default new CriminosoService();
