import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import ClienteCriadoEvent from './cliente-criado-event';

export default class EnviaConsoleLog2Handler
  implements EventHandlerInterface<ClienteCriadoEvent>
{
  handle(event: ClienteCriadoEvent): void {
    console.log(`Esse é o SEGUNDO console.log do evento: ClienteCriado`); 
  }
}