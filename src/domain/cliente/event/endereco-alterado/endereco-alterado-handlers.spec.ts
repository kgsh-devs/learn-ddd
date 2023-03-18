import EventDispatcher from '../../../@shared/event/event-dispatcher';
import Cliente from '../../entity/cliente';
import Endereco from '../../value-object/endereco';
import EnderecoAlteradoEvent from './endereco-alterado-event';
import EnviaMensagem from './envia-mensagem-handler';

describe('Endereco Alterado Event - unit tests', () => {

  it('deve enviar mensagem', () => {
    const eventDispatcher = new EventDispatcher();

    const enviaMensagemHandler = new EnviaMensagem();
    eventDispatcher.register('EnderecoAlteradoEvent', enviaMensagemHandler);
    expect(eventDispatcher.getEventHandlers['EnderecoAlteradoEvent'][0]).toMatchObject(enviaMensagemHandler);

    const spyEventHandler = jest.spyOn(enviaMensagemHandler, 'handle');
    const logSpy = jest.spyOn(global.console, 'log');    

    const cliente = new Cliente('123', 'John');
    const endereco = new Endereco('Rua Xyz', 123, '86100-000', 'Londrina');
    cliente.alterarEndereco(endereco);
    expect(cliente.endereco).toEqual(endereco);    

    const enderecoAlteradoEvent = new EnderecoAlteradoEvent(cliente);
    // Quando o notify for executado o TestHandler.handle() deve ser chamado
    eventDispatcher.notify(enderecoAlteradoEvent);
    expect(spyEventHandler).toHaveBeenCalled();

    const textLog = `Endereço do cliente: ${cliente.id}, ${cliente.nome} alterado para: ${cliente.endereco.toString()}`; 

    expect(logSpy).toHaveBeenCalledWith(textLog);
    // expect(logSpy.mock.calls).toContainEqual(['some other message']);    

  });

});
