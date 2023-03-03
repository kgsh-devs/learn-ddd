import Endereco from '../value-object/endereco';
import { Cliente } from './cliente';

describe('Cliente - unit tests', () => {
  it('deve gerar erro quando id for vazio', () => {
    expect(() => {
      let cliente = new Cliente('', 'John');
    }).toThrowError('id é requerido');
  });

  it('deve gerar erro quando nome for vazio', () => {
    expect(() => {
      let cliente = new Cliente('123', '');
    }).toThrowError('nome é requerido');
  });

  it('deve alterar o nome', () => {
    // Arrange
    const cliente = new Cliente('123', 'John');
    // Act
    cliente.alterarNome('Jane');
    // Assert
    expect(cliente.nome).toBe('Jane');
  });

  it('deve alterar o endereco', () => {
    // Arrange
    const cliente = new Cliente('123', 'John');
    // Act
    const endereco = new Endereco('Rua Xyz', 123, '86100-000', 'Londrina');
    cliente.alterarEndereco(endereco);
    // Assert
    expect(cliente.endereco).toEqual(endereco);
  });

  it('deve ativar o cliente', () => {
    const cliente = new Cliente('1', 'cliente 1');
    const address = new Endereco('Street 1', 123, '13330-250', 'São Paulo');
    cliente.alterarEndereco(address);

    cliente.ativar();

    expect(cliente.estaAtivo()).toBe(true);
  });

  it('deve gerar erro se endereco for indefinido quando ativar o cliente', () => {
    expect(() => {
      const cliente = new Cliente('1', 'cliente 1');
      cliente.ativar();
    }).toThrowError('endereco é requerido para ativar o Cliente');
  });

  it('deve inaivar o cliente', () => {
    const cliente = new Cliente('1', 'cliente 1');

    cliente.inativar();

    expect(cliente.estaAtivo()).toBe(false);
  });

});