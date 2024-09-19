export interface PokeAPIResponseI {
  count:    number;
  next:     string;
  previous: null;
  results:  ResultI[];
}

export interface ResultI {
  name: string;
  url:  string;
}
