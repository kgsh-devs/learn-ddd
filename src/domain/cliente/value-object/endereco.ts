export default class Endereco {
  private _logradouro: string = "";
  private _numero: number = 0;
  private _cep: string = "";
  private _cidade: string = "";

  constructor(logradouro: string, numero: number, cep: string, cidade: string) {
    this._logradouro = logradouro;
    this._numero = numero;
    this._cep = cep;
    this._cidade = cidade;

    this.validar();
  }

  get logradouro(): string {
    return this._logradouro;
  }

  get numero(): number {
    return this._numero;
  }

  get cep(): string {
    return this._cep;
  }

  get cidade(): string {
    return this._cidade;
  }
  
  validar() {
    if (this._logradouro.length === 0) {
      throw new Error("Logradouro é requerido");
    }
    if (this._numero === 0) {
      throw new Error("Numero é requerido");
    }
    if (this._cep.length === 0) {
      throw new Error("Cep é requerido");
    }
    if (this._cidade.length === 0) {
      throw new Error("Cidade é requerido");
    }
  }

  toString() {
    return `${this._logradouro}, ${this._numero}, ${this._cep} ${this._cidade}`;
  }
}