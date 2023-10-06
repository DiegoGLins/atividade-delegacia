import { Request, Response } from "express";
import crimeService from "../services/crime.service";

export class CrimeController {
  public async list(req: Request, res: Response) {
    const result = await crimeService.listCrimes()
    return res.status(result.code).send(result)

  }

  public async listCrimeCriminoso(req: Request, res: Response) {
    try {
      const { idCriminoso } = req.params

      const result = await crimeService.CrimesFromCriminoso(idCriminoso)
      return res.status(result.code).send(result)

    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }

  public async listArmaCrime(req: Request, res: Response) {
    try {
      const { idCrime } = req.params

      const result = await crimeService.ArmasFromCrime(idCrime)
      return res.status(result.code).send(result)
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }


  public async create(req: Request, res: Response) {
    try {
      const { local, descricaoDosFatos, qtdVitimas, dtHr, idCriminoso } = req.body
      if (!local || !descricaoDosFatos || !qtdVitimas || !dtHr || !idCriminoso) {
        return res.status(400).send({
          ok: false,
          message: "Por favor informe todos os campos para cadastro de crime"
        })
      }

      const result = await crimeService.create({
        local,
        descricaoDosFatos,
        qtdVitimas,
        dtHr,
        idCriminoso,
      })

      return res.status(201).send({
        ok: true,
        message: "Crime cadastrado com sucesso",
        data: result
      })
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }


  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { local, descricaoDosFatos, dtHr, qtdVitimas } = req.body
      const result = await crimeService.update({
        id,
        local,
        descricaoDosFatos,
        dtHr,
        qtdVitimas,
      })

      return res.status(result.code).send(result)
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await crimeService.delete(id)
      return res.status(result.code).send(result)
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }
}

export default CrimeController
