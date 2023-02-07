export interface UnsavedWord {
  word: string;
  definition?: string;
  example?: string;
  synonym?: string[];
  phonetic?: string;
  partOfSpeech?: string;
}

export interface Word extends UnsavedWord {
  _id: string;
  stage: number;
  status: WordStatus;
  reviewAt: Date;
  user: string;
  history: History;
  deletedAt?: Date;
}

export enum WordStatus {
  Idle = 0,
  Pushed = 1,
}

interface History {
  pushedAt: Date[];
  answeredAt: Date[];
  answers: Answer[];
}

export enum Answer {
  IDoNotRemember = 0,
  IRemember = 1,
  IRememberVeryWell = 2,
}
