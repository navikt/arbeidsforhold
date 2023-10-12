import { useIsPdf } from '../../common/useIsPdf';
import { useLocale } from '../../common/useLocale';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DetaljertPDF } from './pdf/DetaljertPDF';
import { PrinterIcon } from '../../../assets/icons/PrinterIcon';
import React from 'react';
import { AFUtvidet } from '../../../types/arbeidsforhold';
import { Loader } from '@navikt/ds-react';
import { sprak } from '../../../language/provider';

interface Props {
    arbeidsforhold: AFUtvidet;
    printGenerellOversikt: boolean;
    printTimerTimelonnet: boolean;
    printPermisjon: boolean;
    printUtenlandsopphold: boolean;
    printHistorikk: boolean;
    printName: string;
    printSSO: string;
}

export const DownloadPDFLink = (props: Props) => {
    const { IsPdfProvider } = useIsPdf();
    const { locale, LocaleProvider } = useLocale();

    return (
        <PDFDownloadLink
            key={Math.random()}
            document={
                <IsPdfProvider value={true}>
                    {/* LocaleProvider-wrapper nødvendig for å få med locale i PDF-rendering */}
                    <LocaleProvider value={locale}>
                        <DetaljertPDF
                            arbeidsforhold={props.arbeidsforhold}
                            printGenerellOversikt={props.printGenerellOversikt}
                            printTimerTimelonnet={props.printTimerTimelonnet}
                            printPermisjon={props.printPermisjon}
                            printUtenlandsopphold={props.printUtenlandsopphold}
                            printHistorikk={props.printHistorikk}
                            printName={props.printName}
                            printSSO={props.printSSO}
                        />
                    </LocaleProvider>
                </IsPdfProvider>
            }
            fileName="arbeidsforhold.pdf"
            className={'lenke af-detaljert__print-button'}
        >
            {({ loading }) =>
                loading ? (
                    <Loader size={'xsmall'} />
                ) : (
                    <>
                        <PrinterIcon />
                        <span>{sprak[locale].skrivut}</span>
                    </>
                )
            }
        </PDFDownloadLink>
    );
};
