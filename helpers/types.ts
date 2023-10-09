type Duration = 'long' | 'short';

export type Sphere = 'emotions' | 'love' | 'communication' | 'career' | 'finance' | 'health' | 'travel'

export interface Event {
  duration: Duration;
  sphere: Sphere;
  title: string;
  startDate: string;
  endDate: string;
}
