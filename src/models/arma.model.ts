
import { v4 as createUuid } from "uuid";

export class Arma {
  private _id: string;
  constructor(public tipo: string, public descricao: string, public idCrime: string, public idCriminoso: string) {
    this.idCriminoso = idCriminoso;
    this.idCrime = this.idCrime;
    this.descricao = descricao;
    this.tipo = tipo;
    this._id = createUuid();
  }
  public get id() {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get idArma() {
    return this._id
  }

  public toJson() {
    return {
      id: this._id,
      tipo: this.tipo,
      descricao: this.descricao,
      idCrime: this.idCrime,
      idCriminoso: this.idCriminoso,
    };
  }
}
