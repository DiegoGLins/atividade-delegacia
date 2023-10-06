// import { Endereco } from "../models/endereco.model";

export interface CreateCriminosoDto {
  nome: string;
  cpf: string;
  endereco: string
}

export interface UpdateCriminosoDto {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
}
