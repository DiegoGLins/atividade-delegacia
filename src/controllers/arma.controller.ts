import { Request, Response } from "express";
import armaService from "../services/arma.service";

export class ArmaController {
  public async list(req: Request, res: Response) {
    const armas = await armaService.listArmas()
    return res.status(armas.code).send(armas)
  }

  public async create(req: Request, res: Response) {
    try {
      const { idCrime, idCriminoso } = req.params
      const { tipo, descricao } = req.body

      if (!idCrime || !idCriminoso || !tipo || !descricao) {
        return res.status(400).send({
          ok: false,
          message: "Forneça todos os dados para cadastrar a arma"
        })
      }

      const result = await armaService.createArma({
        tipo,
        descricao,
        idCrime: idCrime,
        idCriminoso: idCriminoso
      })

      return res.status(201).send({
        ok: true,
        message: "Arma cadastrada com sucesso",
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
      const { idArma } = req.params
      const { tipo, descricao } = req.body

      const result = await armaService.update({
        idArma,
        tipo,
        descricao
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
      const { idArma } = req.params
      const result = await armaService.delete(idArma)

      return res.status(result.code).send(result)
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString()
      })
    }
  }
}

export default ArmaController
