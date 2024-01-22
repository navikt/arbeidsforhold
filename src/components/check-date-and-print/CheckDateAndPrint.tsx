import React from 'react';
import { NoData } from '../no-data/NoData';
import moment from 'moment';
import { parse } from '../../utils/text';
import { useLocale } from '../../modules/common/useLocale';
import { TextIfPdf } from '../text-if-pdf/TextIfPdf';
import { HelpText } from '@navikt/ds-react';

interface Props {
    data?: string | number;
    format?: string;
    dateFormat?: string;
    maskineltAvsluttet?: string | null;
}

export const CheckDateAndPrint = (props: Props) => {
    const { locale } = useLocale();

    if (!props.data) {
        return <NoData />;
    }

    const date = moment(props.data)
        .locale(locale)
        .format(props.dateFormat || 'DD.MM.YYYY');
    const formattedDate = props.format ? parse(props.format, date) : date;

    return (
        <span>
            {props.maskineltAvsluttet ? (
                <span>
                    <TextIfPdf>{formattedDate}</TextIfPdf>
                    <HelpText id={props.maskineltAvsluttet} className="af-date__hjelpetekst">
                        {props.maskineltAvsluttet}
                    </HelpText>
                </span>
            ) : (
                <TextIfPdf>{formattedDate}</TextIfPdf>
            )}
        </span>
    );
};
