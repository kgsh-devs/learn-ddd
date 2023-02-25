export default class Endereco {
  _logradouro: string = "";
  _numero: number = 0;
  _cep: string = "";
  _cidade: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._logradouro = street;
    this._numero = number;
    this._cep = zip;
    this._cidade = city;

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
      throw new Error("Logradouro é obrigatório");
    }
    if (this._numero === 0) {
      throw new Error("Numero é obrigatório");
    }
    if (this._cep.length === 0) {
      throw new Error("Cep é obrigatório");
    }
    if (this._cidade.length === 0) {
      throw new Error("Cidade é obrigatório");
    }
  }

  toString() {
    return `${this._logradouro}, ${this._numero}, ${this._cep} ${this._cidade}`;
  }
}