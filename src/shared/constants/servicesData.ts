import directionsData from '../content/directions.json';
import { hydrateDirections } from '../api/contentHydrator';

/** Каталог направлений с UI-токенами (гидратирован из content JSON) */
export const SERVICES_DATA = hydrateDirections(directionsData.directions);

export type { ServiceDirection } from '../domain/direction/types';
