import EventDispatcher from '../../../@shared/event/event-dispatcher';
import Cliente from '../../entity/cliente';
import ClienteCriadoEvent from './cliente-criado-event';
import EnviaConsoleLog1Handler from './envia-console-log1-handler';
import EnviaConsoleLog2Handler from './envia-console-log2-handler';

describe('Cliente Criado Event - unit tests', () => {
  const eventName = 'ClienteCriadoEvent';
  const eventDispatcher = new EventDispatcher();
  const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
  const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
  const cliente = new Cliente('1', 'Customer 1');
  let clienteCriadoEvent: ClienteCriadoEvent;

  beforeAll(() => {
    eventDispatcher.register(eventName, enviaConsoleLog1Handler);
    eventDispatcher.register(eventName, enviaConsoleLog2Handler);
    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(enviaConsoleLog1Handler);
    expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(enviaConsoleLog2Handler);
  });

  beforeEach(() => {
    clienteCriadoEvent = new ClienteCriadoEvent(cliente);
  });

  it('deve enviar consoleLog1', () => {
    const spyEventHandler = jest.spyOn(enviaConsoleLog1Handler, 'handle');
    const logSpy = jest.spyOn(global.console, 'log');    

    eventDispatcher.notify(clienteCriadoEvent);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Esse é o PRIMEIRO console.log do evento: ClienteCriado');
  });

  it('deve enviar consoleLog2', () => {
    const spyEventHandler = jest.spyOn(enviaConsoleLog2Handler, 'handle');
    const logSpy = jest.spyOn(global.console, 'log');    

    eventDispatcher.notify(clienteCriadoEvent);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Esse é o SEGUNDO console.log do evento: ClienteCriado');
  });

});
