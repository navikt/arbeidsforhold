import dayjs from 'dayjs';
import { AFPeriode } from '../types/arbeidsforhold';

export const sortDateStringDesc = (a?: string, b?: string) => (a && b ? dayjs(b).diff(dayjs(a)) : !a && b ? -1 : a && !b ? 1 : 0);

export const sortPeriodeFraDesc = (a?: AFPeriode, b?: AFPeriode) => (a && b ? sortDateStringDesc(a.periodeFra, b.periodeFra) : 0);

export const sortPeriodeTilDesc = (a?: AFPeriode, b?: AFPeriode) => (a && b ? sortDateStringDesc(a.periodeTil, b.periodeTil) : 0);

export const formatDate = (date: string, format = 'DD.MM.YYYY', locale = 'nb') => {
    return dayjs(date).locale(locale).format(format);
};
