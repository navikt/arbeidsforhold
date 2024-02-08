import React from 'react';
import { AFUtenlandsopphold } from '../../../../../types/arbeidsforhold';
import { CheckAndPrint } from '../../../../../components/check-and-print/CheckAndPrint';
import { sortPeriodeFraDesc } from '../../../../../utils/date';
import dayjs from 'dayjs';
import { CheckDateAndPrint } from '../../../../../components/check-date-and-print/CheckDateAndPrint';
import { CheckPeriodAndPrint } from '../../../../../components/check-period-and-print/CheckPeriodAndPrint';
import { sprak } from '../../../../../language/provider';
import { Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../common/pdfStyles';
import { useLocale } from '../../../../common/useLocale';

interface Props {
    utenlandsopphold: AFUtenlandsopphold[];
}

export const UtenlandsoppholdPDF = (props: Props) => {
    const { locale } = useLocale();

    props.utenlandsopphold.sort((left, right) => sortPeriodeFraDesc(left.periode, right.periode));

    const data: {
        [key: string]: {
            opphold: AFUtenlandsopphold[];
        };
    } = {};

    props.utenlandsopphold.forEach((opphold) => {
        const year = dayjs(opphold.periode.periodeFra).year();

        if (!data[year]) {
            data[year] = {
                opphold: [opphold],
            };
        } else {
            data[year].opphold.push(opphold);
        }
    });

    const isLongEnoughToWrap = Object.keys(data).reduce((acc, year) => acc + year.length, 0) > 14;

    return (
        <View wrap={isLongEnoughToWrap}>
            <View>
                <View style={pdfStyles.tableTitle}>
                    <Text style={pdfStyles.h2}>Arbeid i utlandet</Text>
                </View>
                <View style={pdfStyles.flexRow}>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].rapporteringsperiode}</Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].opptjeningsperiode}</Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].land}</Text>
                    </View>
                </View>
            </View>
            {Object.keys(data)
                .reverse()
                .map((year) => {
                    const value = data[year];
                    return (
                        <View key={year} style={pdfStyles.flexSection} wrap={isLongEnoughToWrap}>
                            <View style={pdfStyles.flexRow}>
                                <View style={pdfStyles.flexColumn}>
                                    <Text style={pdfStyles.h3}>{year}</Text>
                                </View>
                                <View style={pdfStyles.flexColumn} />
                                <View style={pdfStyles.flexColumn} />
                            </View>
                            {value.opphold.map((time, i) => (
                                <View key={`${i}`} style={pdfStyles.flexRow} wrap={true}>
                                    <View style={pdfStyles.flexColumn}>
                                        <Text style={pdfStyles.normaltekst}>
                                            <CheckDateAndPrint data={time.periode.periodeFra} dateFormat="MMMM" />
                                        </Text>
                                    </View>
                                    <View style={pdfStyles.flexColumn}>
                                        <Text style={pdfStyles.normaltekst}>
                                            <CheckPeriodAndPrint data={time.periode} />
                                        </Text>
                                    </View>
                                    <View style={pdfStyles.flexColumn}>
                                        <Text style={pdfStyles.normaltekst}>
                                            <CheckAndPrint data={time.land} />
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })}
        </View>
    );
};
