export type ResultType = {
  result: number;
  dnf: boolean;
  penalty: boolean;
};

export type StoreType = {
  results: {
    [val: string]: ResultType[];
  };
  bestResult: {
    [val: string]: number;
  };
  lastResult: {
    [val: string]: number;
  };
  currentSettings: string;
  scramble: string[];
  favorites: ResultType[];
};
