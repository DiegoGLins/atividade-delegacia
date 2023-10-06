import { Arma } from "@prisma/client";

export interface CreateCrimeDto {
  local: string;
  descricaoDosFatos: string;
  qtdVitimas: number;
  dtHr: string;
  idCriminoso: string;
  idArma?: string
}

export interface CrimeUpdateDto {
  id: string;
  local: string;
  descricaoDosFatos: string;
  qtdVitimas: number;
  dtHr: string;
  armas?: Arma[]
}
