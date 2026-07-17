export type Tone = 'casual' | 'neutral' | 'formal' | 'very-polite';

export type Formality = 'casual' | 'neutral' | 'keigo';

export type StylePill = 'short-direct' | 'detailed' | 'friendly' | 'concise-professional';

export interface CustomizeOptions {
  subject: string;
  formality: Formality;
  styles: StylePill[];
  addJapaneseClosing: boolean;
  includeSignature: boolean;
}

export interface GenerateRequest {
  originalEmail: string;
  tone: Tone;
  customize: CustomizeOptions;
}
