import React from 'react';
import { Page, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../common/pdfStyles';
import { PdfHeader } from '../../../../common/PdfHeader';
import { TimerPDF } from './TimerPDF';
import { PermisjonPDF } from './PermisjonPDF';
import { UtenlandsoppholdPDF } from './UtenlandsoppholdPDF';
import { HistorikkPDF } from './HistorikkPDF';
import { PdfFooter } from '../../../../common/PdfFooter';
import { AFArbeidsavtaler, AFPermisjonPermittering, AFTimerForTimelonnet, AFUtenlandsopphold } from '../../../../../types/arbeidsforhold';

interface Props {
    printTimerTimelonnet: boolean;
    printPermisjon: boolean;
    printUtenlandsopphold: boolean;
    printHistorikk: boolean;
    printName: string;
    printSSO: string;
    arbeidsavtaler: AFArbeidsavtaler[];
    permisjonPermittering: AFPermisjonPermittering[];
    antallTimerForTimelonnet: AFTimerForTimelonnet[];
    utenlandsopphold: AFUtenlandsopphold[];
}

export const TabsPDF = ({
    printTimerTimelonnet,
    printPermisjon,
    printUtenlandsopphold,
    printHistorikk,
    printName,
    printSSO,
    arbeidsavtaler,
    permisjonPermittering,
    antallTimerForTimelonnet,
    utenlandsopphold,
}: Props) => {
    console.log(utenlandsopphold.length);
    return (
        <Page size="A4" style={pdfStyles.page}>
            <PdfHeader printName={printName} printSSO={printSSO} />

            {printTimerTimelonnet && (
                <>
                    {antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0 && (
                        <View style={pdfStyles.section}>
                            <TimerPDF timer={antallTimerForTimelonnet} />
                        </View>
                    )}
                </>
            )}
            {printPermisjon && (
                <>
                    {permisjonPermittering && permisjonPermittering.length > 0 && (
                        <View style={pdfStyles.section}>
                            <PermisjonPDF permisjoner={permisjonPermittering} />
                        </View>
                    )}
                </>
            )}
            {printUtenlandsopphold && (
                <>
                    {utenlandsopphold && utenlandsopphold.length > 0 && (
                        <View style={pdfStyles.section}>
                            <UtenlandsoppholdPDF utenlandsopphold={utenlandsopphold} />
                        </View>
                    )}
                </>
            )}
            {printHistorikk && <>{arbeidsavtaler && arbeidsavtaler.length > 0 && <HistorikkPDF arbeidsavtaler={arbeidsavtaler} />}</>}
            <PdfFooter />
        </Page>
    );
};
