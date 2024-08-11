export class UpdateReviewDto {
  readonly booking?: number;
  readonly rating?: number;
  readonly review?: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
