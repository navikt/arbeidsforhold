import React from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { AFSimpel } from '@/types/arbeidsforhold';
import { ArbeidsgiverTittel } from '@/components/arbeidsgiver/ArbeidsgiverTittel';
import { CheckPeriodAndPrint } from '@/components/check-period-and-print/CheckPeriodAndPrint';
import { PdfHeader } from '@/modules/common/PdfHeader';
import { pdfStyles } from '@/modules/common/pdfStyles';
import { PdfFooter } from '@/modules/common/PdfFooter';
import { pdfFont } from '@/modules/common/pdfFont';

interface Props {
    arbeidsforhold: AFSimpel[];
    printName: string;
    printSSO: string;
}

// Create Document Component
export const ListePDF = ({ arbeidsforhold, printName, printSSO }: Props) => {
    Font.register(pdfFont);

    return (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                <PdfHeader printName={printName} printSSO={printSSO} />
                <View style={pdfStyles.liste}>
                    {arbeidsforhold.map((foretak, i) => (
                        <View key={i} style={pdfStyles.listeRow} wrap={false}>
                            <Text style={pdfStyles.h3}>
                                <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} overskrift={true} />
                            </Text>
                            <Text style={pdfStyles.normaltekst}>{foretak.yrke}</Text>
                            <Text style={pdfStyles.normaltekst}>
                                <CheckPeriodAndPrint data={foretak.ansettelsesperiode.periode} />
                            </Text>
                        </View>
                    ))}
                </View>
                <PdfFooter />
            </Page>
        </Document>
    );
};
