declare type GlobalNodeModule = {
  hot?: {
    accept: (cb: (u: any) => void) => void;
  };
} & NodeModule;
