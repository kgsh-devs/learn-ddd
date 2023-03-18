import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import Cliente from '../../entity/cliente';
import EnderecoAlteradoEvent from './endereco-alterado-event';

export default class EnviaMensagem
  implements EventHandlerInterface<EnderecoAlteradoEvent>
{
  handle(event: EnderecoAlteradoEvent): void {
    const cliente = event.eventData as Cliente;
    console.log(`Endereço do cliente: ${cliente.id}, ${cliente.nome} alterado para: ${cliente.endereco.toString()}`); 
  }
}