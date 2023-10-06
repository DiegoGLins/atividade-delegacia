import prisma from "../database/prisma.database";
import { CreateCrimeDto, CrimeUpdateDto } from "../dtos/crime.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Crime } from "../models/crime.model";

class CrimeService {
  public async listCrimes(): Promise<ResponseDto> {

    const allCrimes = await prisma.crime.findMany({
      include: {
        arma: true,
        criminoso: true
      }
    })

    if (!allCrimes) {
      return {
        code: 404,
        message: "Nenhum crime para listar"
      }
    }
    return {
      code: 200,
      message: "Crimes listados com sucesso",
      data: allCrimes
    }
  }
  public async ArmasFromCrime(idCrime: string) {

    const crime = await prisma.crime.findUnique({
      where: {
        id: idCrime
      }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado"
      }
    }

    const listArmaFromCrime = await prisma.arma.findMany(
      {
        where: {
          idCrime
        },
        include: {
          criminoso: true
        }
      }
    )
    return {
      code: 200,
      message: "Armas listadas com sucesso",
      data: listArmaFromCrime
    }
  }

  public async CrimesFromCriminoso(idCriminoso: string) {

    const criminoso = await prisma.criminoso.findUnique({
      where: {
        id: idCriminoso
      }
    })

    if (!criminoso) {
      return {
        code: 404,
        message: "Criminoso não encontrado"
      }
    }

    const listCrimesFromCriminoso = await prisma.crime.findMany(
      {
        where: {
          idCriminoso
        }
      }
    )

    return {
      code: 200,
      message: "Crimes listadas com sucesso",
      data: listCrimesFromCriminoso
    }
  }

  public async create(data: CreateCrimeDto) {

    const newCrime = new Crime(data.local, data.descricaoDosFatos, data.qtdVitimas, new Date(data.dtHr), data.idCriminoso);

    const createCrime = await prisma.crime.create({
      data: {
        local: newCrime.local,
        descricaoDosFatos: newCrime.descricaoDosFatos,
        qtdVitimas: newCrime.qtdVitimas,
        dtHr: newCrime.dtHr,
        idCriminoso: newCrime.idCriminoso,
      }
    });

    return createCrime
  }

  public async update(data: CrimeUpdateDto): Promise<ResponseDto> {
    const crime = await prisma.crime.findUnique({
      where: {
        id: data.id
      }
    })
    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado"
      }
    }

    const updateCrime = await prisma.crime.update({
      where: {
        id: data.id
      },
      data: {
        local: data.local,
        descricaoDosFatos: data.descricaoDosFatos,
        dtHr: data.dtHr,
        qtdVitimas: data.qtdVitimas,
      }
    })
    return {
      code: 200,
      message: "Crime editado com sucesso",
      data: updateCrime
    }
  }

  public async delete(id: string): Promise<ResponseDto> {
    const crime = await prisma.crime.findUnique({
      where: {
        id
      }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado"
      }
    }

    await prisma.crime.delete({
      where: {
        id
      }
    })
    return {
      code: 200,
      message: "Crime deletado com sucesso"
    }
  }
}

export default new CrimeService();
