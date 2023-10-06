
import { v4 as createUuid } from "uuid";
import { Arma } from "./arma.model";
import { Crime } from "./crime.model";

export class Criminoso {
  private _id: string;
  public armas: Arma[]
  private fichaCriminal: Crime[]
  constructor(
    private _nome: string,
    private _cpf: string,
    public endereco: string
  ) {
    this.fichaCriminal = []
    this.armas = []
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get ficha() {
    return this.fichaCriminal
  }

  public get nome() {
    return this._nome;
  }
  public get cpf() {
    return this._cpf;
  }

  public toJson() {
    return {
      id: this._id,
      nome: this._nome,
      cpf: this._cpf,
      endereco: this.endereco,
      fichaCriminal: this.fichaCriminal
    };
  }
}
