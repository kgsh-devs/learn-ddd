import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import ClienteCriadoEvent from './cliente-criado-event';

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<ClienteCriadoEvent>
{
  handle(event: ClienteCriadoEvent): void {
    console.log(`Esse é o PRIMEIRO console.log do evento: ClienteCriado`); 
  }
}