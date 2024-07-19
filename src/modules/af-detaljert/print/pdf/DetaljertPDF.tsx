import React from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { AFUtvidet } from '@/types/arbeidsforhold';
import { pdfFont } from '@/modules/common/pdfFont';
import { TabsPDF } from './tabs/TabsPDF';
import { GenerellOversiktPDF } from './GenerellOversiktPDF';

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

// Create Document Component
export const DetaljertPDF = ({
    arbeidsforhold,
    printGenerellOversikt,
    printTimerTimelonnet,
    printPermisjon,
    printUtenlandsopphold,
    printHistorikk,
    printName,
    printSSO,
}: Props) => {
    const { arbeidsavtaler, permisjonPermittering, antallTimerForTimelonnet, utenlandsopphold } = arbeidsforhold;

    Font.register(pdfFont);

    return (
        <Document>
            {printGenerellOversikt && (
                <GenerellOversiktPDF
                    arbeidsforhold={arbeidsforhold}
                    printGenerellOversikt={printGenerellOversikt}
                    printTimerTimelonnet={printTimerTimelonnet}
                    printPermisjon={printPermisjon}
                    printUtenlandsopphold={printUtenlandsopphold}
                    printHistorikk={printHistorikk}
                    printName={printName}
                    printSSO={printSSO}
                />
            )}
            <TabsPDF
                printTimerTimelonnet={printTimerTimelonnet}
                printPermisjon={printPermisjon}
                printUtenlandsopphold={printUtenlandsopphold}
                printHistorikk={printHistorikk}
                printName={printName}
                printSSO={printSSO}
                arbeidsavtaler={arbeidsavtaler}
                permisjonPermittering={permisjonPermittering}
                antallTimerForTimelonnet={antallTimerForTimelonnet}
                utenlandsopphold={utenlandsopphold}
            />
        </Document>
    );
};
