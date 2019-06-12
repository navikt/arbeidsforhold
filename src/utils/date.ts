import moment from "moment";
import { AFPeriode } from "../types/arbeidsforhold";

export const sortDateStringDesc = (a?: string, b?: string) =>
  a && b ? moment(a).diff(moment(b)) : !a && b ? -1 : !b && a ? 1 : 0;

export const sortPeriodeFraDesc = (a?: AFPeriode, b?: AFPeriode) =>
  a && b ? sortDateStringDesc(a.periodeFra, b.periodeFra) : 0;

export const sortPeriodeTilDesc = (a?: AFPeriode, b?: AFPeriode) =>
  a && b ? sortDateStringDesc(a.periodeTil, b.periodeTil) : 0;
