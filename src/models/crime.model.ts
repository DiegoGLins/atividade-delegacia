
import { v4 as createUuid } from "uuid";
import { Arma } from "./arma.model";

export class Crime {
  private _id: string;
  public armas: Arma[]
  constructor(
    private _local: string,
    private _descricaoDosFatos: string,
    private _qtdVitimas: number,
    private _dtHr: Date,
    public idCriminoso: string,
  ) {
    this.armas = []
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get local() {
    return this._local;
  }

  public get dtHr() {
    return this._dtHr;
  }
  public get qtdVitimas() {
    return this._qtdVitimas;
  }
  public get descricaoDosFatos() {
    return this._descricaoDosFatos;
  }

  public toJson() {
    return {
      id: this._id,
      local: this._local,
      descricaoDosFatos: this._descricaoDosFatos,
      quantidade_de_Vitimas: this._qtdVitimas,
      dtHr: this._dtHr,
    };
  }
}
