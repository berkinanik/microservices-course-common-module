export enum Subjects {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',

  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',

  ExpirationComplete = 'expiration:complete',

  PaymentComplete = 'payment:complete',
  PaymentAwaited = 'payment:awaited',
}
