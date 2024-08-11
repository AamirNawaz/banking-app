export class CreatePaymentDto {
  readonly booking: number;
  readonly payment_method: string;
  readonly amount: number;
  readonly status: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
