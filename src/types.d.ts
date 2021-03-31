export enum OrientationEnum {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  SQUARISH = "squarish"
}

export enum OrderEnum {
  POPULAR = "popular",
  LATEST = "latest",
  OLDEST = "oldest"
}

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


export type Color = {
  text: string,
  background: string,
  tint: string,
  disabled: string
}