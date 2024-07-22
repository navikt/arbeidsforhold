export const orgnr = (x: string) => x.replace(/(?=.{3}$)/, ' ').replace(/(?=.{7}$)/, ' ');
