import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '@/modules/common/pdfStyles';
import { PdfHeader } from '@/modules/common/PdfHeader';
import { PDFCheckAndPrintBox } from '@/components/pdf-check-and-print-box/PDFCheckAndPrintBox';
import { sprak } from '@/language/provider';
import { CheckAndPrint } from '@/components/check-and-print/CheckAndPrint';
import { orgnr } from '@/utils/orgnr';
import { CheckDateAndPrint } from '@/components/check-date-and-print/CheckDateAndPrint';
import { PdfFooter } from '@/modules/common/PdfFooter';
import { AFUtvidet } from '@/types/arbeidsforhold';
import { useLocale } from '@/modules/common/useLocale';

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

export const GenerellOversiktPDF = ({ arbeidsforhold, printName, printSSO }: Props) => {
    const { locale } = useLocale();

    return (
        <Page size="A4" style={pdfStyles.page}>
            <PdfHeader printName={printName} printSSO={printSSO} />
            <View>
                <View style={pdfStyles.introRow}>
                    <View style={[pdfStyles.section, pdfStyles.twoColumns]}>
                        {arbeidsforhold.arbeidsgiver.type === 'Organisasjon' ? (
                            <View style={pdfStyles.h2Container}>
                                <View>
                                    <Text style={pdfStyles.h2}>{arbeidsforhold.arbeidsgiver.orgnavn}</Text>
                                </View>
                                <View>
                                    <Text style={pdfStyles.normaltekst}>Organisasjonsnummer {arbeidsforhold.arbeidsgiver.orgnr}</Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={pdfStyles.normaltekst}>{arbeidsforhold.arbeidsgiver.fnr}</Text>
                        )}
                    </View>
                    <PDFCheckAndPrintBox title={sprak[locale].ansettelsesperiode} data={arbeidsforhold.ansettelsesperiode?.periode} period={true}>
                        <Text style={pdfStyles.normaltekst}>
                            <CheckAndPrint data={arbeidsforhold.ansettelsesperiode?.sluttaarsak} format={`(${sprak[locale].sluttaarsak}: %s)`} />
                        </Text>
                    </PDFCheckAndPrintBox>
                </View>
                <View style={{ ...pdfStyles.flexGrid }}>
                    {arbeidsforhold.opplysningspliktigarbeidsgiver.type === 'Organisasjon' && (
                        <PDFCheckAndPrintBox title={sprak[locale].hovedenhet} data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnavn}>
                            <Text style={pdfStyles.normaltekst}>
                                <CheckAndPrint
                                    data={orgnr(arbeidsforhold.opplysningspliktigarbeidsgiver.orgnr)}
                                    format={`${sprak[locale].organisasjonsnummer} %s`}
                                />
                            </Text>
                        </PDFCheckAndPrintBox>
                    )}
                    <PDFCheckAndPrintBox title={sprak[locale].yrke} data={arbeidsforhold.yrke} />
                    <PDFCheckAndPrintBox title={sprak[locale].typearbeidsforhold} data={arbeidsforhold.type} />
                    <PDFCheckAndPrintBox title={sprak[locale].arbeidsforholdid} data={arbeidsforhold.eksternArbeidsforholdId} />
                    <PDFCheckAndPrintBox title={sprak[locale].arbeidstidsordning} data={arbeidsforhold.arbeidstidsordning} />
                    <PDFCheckAndPrintBox title={sprak[locale].ansettelsesform} data={arbeidsforhold.ansettelsesform} />
                    <PDFCheckAndPrintBox title={sprak[locale].sistelonnsendring} data={arbeidsforhold.sisteLoennsendring} date={true} />
                    <PDFCheckAndPrintBox title={sprak[locale].stillingsprosent} data={arbeidsforhold.stillingsprosent}>
                        <Text style={pdfStyles.normaltekst}>
                            <CheckDateAndPrint data={arbeidsforhold.sisteStillingsendring} format={`(${sprak[locale].endretstillingsprosent} %s)`} />
                        </Text>
                    </PDFCheckAndPrintBox>
                    <PDFCheckAndPrintBox title={sprak[locale].timerperuke} data={arbeidsforhold.antallTimerPrUke} />
                    <PDFCheckAndPrintBox title={sprak[locale].skipsregister} data={arbeidsforhold.skipsregister} />
                    <PDFCheckAndPrintBox title={sprak[locale].skipstype} data={arbeidsforhold.skipstype} />
                    <PDFCheckAndPrintBox title={sprak[locale].fartsomraade} data={arbeidsforhold.fartsomraade} />
                    <PDFCheckAndPrintBox title={sprak[locale].sistbekreftet} data={arbeidsforhold.sistBekreftet} date={true} />
                </View>
            </View>
            <PdfFooter />
        </Page>
    );
};
