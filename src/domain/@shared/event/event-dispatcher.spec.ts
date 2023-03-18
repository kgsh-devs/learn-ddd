import EventDispatcher from './event-dispatcher';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

describe('Domain events tests', () => {

  class TestEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    constructor(eventData: any) {
      this.dataTimeOccurred = new Date();
      this.eventData = eventData;
    }
  }  
  class TestHandler implements EventHandlerInterface<TestEvent>
  {
    handle(event: TestEvent): void {
      console.log(`Someting to do ...`); 
    }
  }  

  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new TestHandler();

    eventDispatcher.register('Evento X', eventHandler);
    expect(eventDispatcher.getEventHandlers['Evento X']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['Evento X'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['Evento X'][0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new TestHandler();

    eventDispatcher.register('Evento Y', eventHandler);
    expect(eventDispatcher.getEventHandlers['Evento Y'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister('Evento Y', eventHandler);
    expect(eventDispatcher.getEventHandlers['Evento Y']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['Evento Y'].length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new TestHandler();

    eventDispatcher.register('Evento Z', eventHandler);
    expect(eventDispatcher.getEventHandlers['Evento Z'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers['Evento Z']).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new TestHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('TestEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['TestEvent'][0]).toMatchObject(eventHandler);

    const testEvent = new TestEvent({
      name: 'Nome do objeto qq',
      description: 'Descrição do do objeto qq',
    });
    // Quando o notify for executado o TestHandler.handle() deve ser chamado
    eventDispatcher.notify(testEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});