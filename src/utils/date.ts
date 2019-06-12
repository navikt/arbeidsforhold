import moment from "moment";
import { AFPeriode } from "../types/arbeidsforhold";

export const sortDateString = (a?: string, b?: string) =>
  a && b ? moment(a).diff(moment(b)) : !a && b ? 1 : !b && a ? -1 : 0;

export const sortPeriod = (a?: AFPeriode, b?: AFPeriode) =>
  a && b ? sortDateString(a.periodeFra, b.periodeFra) : 0;
