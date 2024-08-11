export class CreateBookingDto {
  readonly user: number;
  readonly service: string;
  readonly status: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
