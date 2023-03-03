import Endereco from "./endereco";

describe('Endereco - unit tests', () => {
  it('deve gerar erro quando Logradouro for vazio', () => {
    expect(() => {
      let endereco = new Endereco('', 123, '86100-000', 'Londrina');
    }).toThrowError('Logradouro é requerido');
  });
  it('deve gerar erro quando Numero for vazio', () => {
    expect(() => {
      let endereco = new Endereco('Rua Xyz', 0, '86100-000', 'Londrina');
    }).toThrowError('Numero é requerido');
  });
  it('deve gerar erro quando Cep for vazio', () => {
    expect(() => {
      let endereco = new Endereco('Rua Xyz', 123, '', 'Londrina');
    }).toThrowError('Cep é requerido');
  });
  it('deve gerar erro quando Cidade for vazio', () => {
    expect(() => {
      let endereco = new Endereco('Rua Xyz', 123, '86100-000', '');
    }).toThrowError('Cidade é requerido');
  });
  it('deve criar o endereco', () => {
    const endereco = new Endereco('Street 1', 123, '13330-250', 'São Paulo');
    expect(endereco.logradouro).toBe('Street 1');
    expect(endereco.numero).toBe(123);
    expect(endereco.cep).toBe('13330-250');
    expect(endereco.cidade).toBe('São Paulo');
  });
});