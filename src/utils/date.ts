import moment from "moment";
import { AFPeriode } from "../types/arbeidsforhold";

export const sortDateStringDesc = (a?: string, b?: string) =>
  a && b ? moment(b).diff(moment(a)) : !a && b ? -1 : a && !b ? 1 : 0;

export const sortPeriodeFraDesc = (a?: AFPeriode, b?: AFPeriode) =>
  a && b ? sortDateStringDesc(a.periodeFra, b.periodeFra) : 0;

export const sortPeriodeTilDesc = (a?: AFPeriode, b?: AFPeriode) =>
  a && b ? sortDateStringDesc(a.periodeTil, b.periodeTil) : 0;
