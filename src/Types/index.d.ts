import { OrientationEnum, OrderEnum } from "../Constants/enums";

export type Filters = {
  collections: string[];
  orientation: null | OrientationEnum;
};

export type SortBy = null | OrderEnum;

export type AllOptions = {
  isInfinite: boolean;
  query: string;
  sortBy: SortBy;
  collections: string[];
  orientation: null | OrientationEnum;
};
