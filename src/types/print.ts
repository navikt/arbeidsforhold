export type AFPrint =
  | {
      printActivated?: false;
    }
  | {
      printActivated: true;
      printName: string;
      printSSN: string;
    };
