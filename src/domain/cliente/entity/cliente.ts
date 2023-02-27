import Endereco from "../value-object/endereco";

export class Cliente {
  _id: string;
  _nome: string;
  _endereco!: Endereco;
  _ativo: boolean;

  constructor(id: string, nome: string) {
    this._id = id;
    this._nome = nome;
    this._ativo = true;
    this.validar();
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }  

  validar() {
    if (this._nome.length === 0)
      throw new Error('nome é requerido');
    if (this._id.length === 0)
      throw new Error('id é requerido');
  }

  alterarNome(nome: string) {
    this._nome = nome;
    this.validar()
  }

  get endereco(): Endereco {
    return this._endereco;
  }
  
  alterarEndereco(endereco: Endereco) {
    this._endereco = endereco;
  }

  estaAtivo(): boolean {
    return this._ativo;
  }

  ativar() {
    if (this._endereco === undefined)
      throw new Error('endereco é requerido para ativar o Cliente');
    this._ativo = true;
  }

  inativar() {
    this._ativo = false;
  }
}
