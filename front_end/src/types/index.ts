export interface Question {
  id: number;
  title: string;
  description: string;
  forecast: number;
}

export interface CreateQuestionPayload {
  title: string;
  description: string;
  forecast: number;
}
