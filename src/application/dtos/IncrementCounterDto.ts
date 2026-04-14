export interface IncrementCounterInputDto {
  counterId: string;
  amount: number;
}

export interface IncrementCounterOutputDto {
  counterId: string;
  value: number;
  updatedAt: string;
}