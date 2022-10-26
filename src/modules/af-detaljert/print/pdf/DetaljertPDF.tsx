import React from "react";
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { AFUtvidet } from "../../../../types/arbeidsforhold";
import { PDFCheckAndPrintBox } from "../../../../components/pdf-check-and-print-box/PDFCheckAndPrintBox";
import sprak from "../../../../language/provider";
import { orgnr } from "../../../../utils/orgnr";
import { TimerPDF } from "./tabs/TimerPDF";
import { PermisjonPDF } from "./tabs/PermisjonPDF";
import { CheckDateAndPrint } from "../../../../components/check-date-and-print/CheckDateAndPrint";
import { CheckAndPrint } from "../../../../components/check-and-print/CheckAndPrint";
import { UtenlandsoppholdPDF } from "./tabs/UtenlandsoppholdPDF";
import { HistorikkPDF } from "./tabs/HistorikkPDF";
import { useLocale } from "../../../common/useLocale";
import { PdfHeader } from "../../../common/PdfHeader";
import { pdfStyles } from "../../../common/pdfStyles";
import { PdfFooter } from "../../../common/PdfFooter";
import { pdfFont } from "../../../common/pdfFont";

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
  const { locale } = useLocale();

  const {
    arbeidsavtaler,
    permisjonPermittering,
    antallTimerForTimelonnet,
    utenlandsopphold,
  } = arbeidsforhold;

  Font.register(pdfFont);

  return (
    <Document>
      {printGenerellOversikt && (
        <Page size="A4" style={pdfStyles.page}>
          <PdfHeader printName={printName} printSSO={printSSO} />
          <View>
            <View style={pdfStyles.introRow}>
              <View style={[pdfStyles.section, pdfStyles.twoColumns]}>
                {arbeidsforhold.arbeidsgiver.type === "Organisasjon" ? (
                  <View style={pdfStyles.h2Container}>
                    <View>
                      <Text style={pdfStyles.h2}>
                        {arbeidsforhold.arbeidsgiver.orgnavn}
                      </Text>
                    </View>
                    <View>
                      <Text style={pdfStyles.normaltekst}>
                        Organisasjonsnummer {arbeidsforhold.arbeidsgiver.orgnr}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={pdfStyles.normaltekst}>
                    {arbeidsforhold.arbeidsgiver.fnr}
                  </Text>
                )}
              </View>
              <PDFCheckAndPrintBox
                title={sprak[locale].ansettelsesperiode}
                data={arbeidsforhold.ansettelsesperiode?.periode}
                period={true}
              >
                <Text style={pdfStyles.normaltekst}>
                  <CheckAndPrint
                    data={arbeidsforhold.ansettelsesperiode?.sluttaarsak}
                    format={`(${sprak[locale].sluttaarsak}: %s)`}
                  />
                </Text>
              </PDFCheckAndPrintBox>
            </View>
            <View style={{ ...pdfStyles.flexGrid }}>
              {arbeidsforhold.opplysningspliktigarbeidsgiver.type ===
                "Organisasjon" && (
                <PDFCheckAndPrintBox
                  title={sprak[locale].hovedenhet}
                  data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnavn}
                >
                  <Text style={pdfStyles.normaltekst}>
                    <CheckAndPrint
                      data={orgnr(
                        arbeidsforhold.opplysningspliktigarbeidsgiver.orgnr
                      )}
                      format={`${sprak[locale].organisasjonsnummer} %s`}
                    />
                  </Text>
                </PDFCheckAndPrintBox>
              )}
              <PDFCheckAndPrintBox
                title={sprak[locale].yrke}
                data={arbeidsforhold.yrke}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].typearbeidsforhold}
                data={arbeidsforhold.type}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].arbeidsforholdid}
                data={arbeidsforhold.eksternArbeidsforholdId}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].arbeidstidsordning}
                data={arbeidsforhold.arbeidstidsordning}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].ansettelsesform}
                data={arbeidsforhold.ansettelsesform}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].sistelonnsendring}
                data={arbeidsforhold.sisteLoennsendring}
                date={true}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].stillingsprosent}
                data={arbeidsforhold.stillingsprosent}
              >
                <Text style={pdfStyles.normaltekst}>
                  <CheckDateAndPrint
                    data={arbeidsforhold.sisteStillingsendring}
                    format={`(${sprak[locale].endretstillingsprosent} %s)`}
                  />
                </Text>
              </PDFCheckAndPrintBox>
              <PDFCheckAndPrintBox
                title={sprak[locale].timerperuke}
                data={arbeidsforhold.antallTimerPrUke}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].skipsregister}
                data={arbeidsforhold.skipsregister}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].skipstype}
                data={arbeidsforhold.skipstype}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].fartsomraade}
                data={arbeidsforhold.fartsomraade}
              />
              <PDFCheckAndPrintBox
                title={sprak[locale].sistbekreftet}
                data={arbeidsforhold.sistBekreftet}
                date={true}
              />
            </View>
          </View>
          <PdfFooter />
        </Page>
      )}
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
        {printHistorikk && (
          <>
            {arbeidsavtaler && arbeidsavtaler.length > 0 && (
              <HistorikkPDF arbeidsavtaler={arbeidsavtaler} />
            )}
          </>
        )}
        <PdfFooter />
      </Page>
    </Document>
  );
};
