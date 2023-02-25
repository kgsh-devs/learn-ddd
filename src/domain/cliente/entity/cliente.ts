class Cliente {
  _id: string;
  _nome: string;
  _endereco: string;
  _ativo: boolean;

  constructor(id: string, nome: string, endereco: string) {
    this._id = id;
    this._nome = nome;
    this._endereco = endereco;
    this._ativo = true;
    this.validar();
  }

  validar() {
    if (this._nome.length === 0)
      throw new Error('O Nome deve ser informado');
    if (this._id.length === 0)
      throw new Error('O Id deve ser informado');
  }

  alterarNome(nome: string) {
    this._nome = nome;
    this.validar()
  }

  ativar() {
    if (this._endereco.length === 0)
      throw new Error('O Endereço deve ser informado');
    this._ativo = true;
  }

  inativar() {
    this._ativo = false;
  }
}
