export const SLIDE_FOOTER = 'AIML501 | Assignment 3.4 | AI Infrastructure';

export type SlideId =
  | 'title'
  | 'pipeline'
  | 'resources'
  | 'models'
  | 'costs'
  | 'takeaways'
  | 'references';

export interface SlideMeta {
  id: SlideId;
  number: number;
  variant: 'title' | 'content';
}

export const slides: SlideMeta[] = [
  { id: 'title', number: 1, variant: 'title' },
  { id: 'pipeline', number: 2, variant: 'content' },
  { id: 'resources', number: 3, variant: 'content' },
  { id: 'models', number: 4, variant: 'content' },
  { id: 'costs', number: 5, variant: 'content' },
  { id: 'takeaways', number: 6, variant: 'content' },
  { id: 'references', number: 7, variant: 'content' },
];

export const SLIDE_COUNT = slides.length;
