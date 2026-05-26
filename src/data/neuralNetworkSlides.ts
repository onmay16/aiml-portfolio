export const SLIDE_FOOTER = 'AIML501 | Assignment 2.4 | Neural Network Components';

export type SlideId =
  | 'title'
  | 'architecture'
  | 'layers'
  | 'neurons'
  | 'weights'
  | 'activation'
  | 'loss-optimization'
  | 'summary';

export interface SlideMeta {
  id: SlideId;
  number: number;
  variant: 'title' | 'content';
}

export const slides: SlideMeta[] = [
  { id: 'title', number: 1, variant: 'title' },
  { id: 'architecture', number: 2, variant: 'content' },
  { id: 'layers', number: 3, variant: 'content' },
  { id: 'neurons', number: 4, variant: 'content' },
  { id: 'weights', number: 5, variant: 'content' },
  { id: 'activation', number: 6, variant: 'content' },
  { id: 'loss-optimization', number: 7, variant: 'content' },
  { id: 'summary', number: 8, variant: 'content' },
];

export const SLIDE_COUNT = slides.length;
