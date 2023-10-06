import { Request, Response } from "express";
import criminosoService from "../services/criminoso.service";

export class CriminosoController {
  public async list(req: Request, res: Response) {
    const result = await criminosoService.listAll();
    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { nome, cpf, endereco } = req.body;
      if (!nome || !cpf || !endereco) {
        return res.status(400).send({
          ok: false,
          message: "Dados incompletos"
        })
      }

      const result = await criminosoService.create({
        nome,
        cpf,
        endereco
      });
      return res.status(201).send({
        ok: true,
        message: "Criminoso criado com sucesso",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await criminosoService.delete(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, cpf, endereco } = req.body;

      const result = await criminosoService.update({
        id,
        nome,
        cpf,
        endereco,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}

export default CriminosoController
