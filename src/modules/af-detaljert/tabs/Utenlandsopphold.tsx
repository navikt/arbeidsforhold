import React, { Fragment, useState } from 'react';
import { AFUtenlandsopphold } from '@/types/arbeidsforhold';
import { CheckPeriodAndPrint } from '@/components/check-period-and-print/CheckPeriodAndPrint';
import { CheckAndPrint } from '@/components/check-and-print/CheckAndPrint';
import { sortPeriodeFraDesc } from '@/utils/date';
import dayjs from 'dayjs';
import { CheckDateAndPrint } from '@/components/check-date-and-print/CheckDateAndPrint';
import { sprak } from '@/language/provider';
import { useLocale } from '../../common/useLocale';
import { ChevronUpIcon, ChevronDownIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

interface Props {
    utenlandsopphold: AFUtenlandsopphold[];
}

export const Utenlandsopphold = (props: Props) => {
    const { locale } = useLocale();

    props.utenlandsopphold.sort((left, right) => sortPeriodeFraDesc(left.periode, right.periode));

    const initState: {
        [key: string]: {
            opphold: AFUtenlandsopphold[];
            ekspandert: boolean;
        };
    } = {};

    props.utenlandsopphold.forEach((opphold, i) => {
        const year = dayjs(opphold.periode.periodeFra).year();

        if (!initState[year]) {
            initState[year] = {
                opphold: [opphold],
                ekspandert: !i,
            };
        } else {
            initState[year].opphold.push(opphold);
        }
    });

    const [data, setData] = useState(initState);
    return (
        <div className="af-detaljert__tableWrapper">
            <table className="af-detaljert__tabs-innhold af-detaljert__table">
                <thead>
                    <tr>
                        <th>
                            <Heading as="p" size="xsmall">
                                {sprak[locale].periode}
                            </Heading>
                        </th>
                        <th />
                        <th>
                            <Heading as="p" size="xsmall">
                                {sprak[locale].land}
                            </Heading>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data)
                        .reverse()
                        .map((year) => {
                            const value = data[year];

                            const onClick = () =>
                                setData({
                                    ...data,
                                    [year]: {
                                        ...data[year],
                                        ekspandert: !data[year].ekspandert,
                                    },
                                });

                            return (
                                <Fragment key={year}>
                                    <tr key={year}>
                                        <td colSpan={3}>
                                            <button className="af-liste__ekspander" onClick={onClick}>
                                                {year}{' '}
                                                {value.ekspandert ? <ChevronUpIcon aria-hidden="true" /> : <ChevronDownIcon aria-hidden="true" />}
                                            </button>
                                        </td>
                                    </tr>
                                    {value.ekspandert &&
                                        value.opphold.map((time, i) => (
                                            <tr key={`${i}`}>
                                                <td className="af-liste__month">
                                                    <CheckDateAndPrint data={time.periode.periodeFra} dateFormat="MMMM" />
                                                </td>
                                                <td>
                                                    <CheckPeriodAndPrint data={time.periode} />
                                                </td>
                                                <td>
                                                    <CheckAndPrint data={time.land} />
                                                </td>
                                            </tr>
                                        ))}
                                </Fragment>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
