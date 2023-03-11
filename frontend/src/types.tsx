export interface Party {
  id: number;
  name_fi: string;
  color: string;
}

export interface Question {
  id: number;
  text_fi: string;
}

export interface Summary {
  partyId: number;
  questionId: number;
  countOnes: number;
  countTwos: number;
  countFours: number;
  countFives: number;
  countTotal: number;
}

export interface Option {
  value: number;
  label: string;
}
