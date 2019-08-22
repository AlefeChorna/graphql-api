import { ModelsInterface } from './ModelsInterface';

export interface BaseModelnterface {
  prototype?;
  associate?(models: ModelsInterface): void;
}
