import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ListePDF } from './pdf/ListePDF';
import { useLocale } from '@/modules/common/useLocale';
import { useIsPdf } from '@/modules/common/useIsPdf';
import { AFSimpel } from '@/types/arbeidsforhold';
import { sprak } from '@/language/provider';
import { PrinterSmallIcon } from '@navikt/aksel-icons';

interface Props {
    arbeidsforhold: AFSimpel[];
    printName: string;
    printSSN: string;
}

export const PrintButton = (props: Props) => {
    const { locale, LocaleProvider } = useLocale();
    const { IsPdfProvider } = useIsPdf();

    return (
        <div className="af-liste__print-button">
            <PDFDownloadLink
                document={
                    <IsPdfProvider value={true}>
                        {/* LocaleProvider-wrapper nødvendig for å få med locale i PDF-rendering */}
                        <LocaleProvider value={locale}>
                            <ListePDF arbeidsforhold={props.arbeidsforhold} printName={props.printName} printSSO={props.printSSN} />
                        </LocaleProvider>
                    </IsPdfProvider>
                }
                fileName="arbeidsforhold.pdf"
            >
                {({ loading }) =>
                    loading ? null : (
                        <>
                            <PrinterSmallIcon aria-hidden="true" />
                            <span>{sprak[locale].skrivut}</span>
                        </>
                    )
                }
            </PDFDownloadLink>
        </div>
    );
};
