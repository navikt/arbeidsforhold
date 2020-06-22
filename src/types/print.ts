export type AFPrint =
  | {
      printActivated: undefined;
    }
  | {
      printActivated: true;
      printName: string;
      printSSN: string;
    };
