import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { AFUtvidet } from "../../types/arbeidsforhold";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf";
import PDFCheckAndPrintBox from "../../components/pdf-check-and-print-box/PDFCheckAndPrintBox";
import sprak from "../../language/provider";
import { orgnr } from "../../utils/orgnr";
import TimerPDF from "./tabs/TimerPDF";
import PermisjonPDF from "./tabs/PermisjonPDF";
import CheckDateAndPrint from "../../components/check-date-and-print/CheckDateAndPrint";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import UtenlandsoppholdPDF from "./tabs/UtenlandsoppholdPDF";
import HistorikkPDF from "./tabs/HistorikkPDF";
import { pdfStyles } from "../common/pdf-styles";

interface Props {
  arbeidsforhold: AFUtvidet;
  locale: "nb" | "en";
}

// Create Document Component
const ListePDF = ({ arbeidsforhold, locale }: Props) => {
  const { arbeidsavtaler, permisjonPermittering } = arbeidsforhold;
  const { antallTimerForTimelonnet, utenlandsopphold } = arbeidsforhold;

  Font.register({
    family: "SourceSansPro",
    fonts: [
      { src: Regular },
      { src: Italic, fontStyle: "italic" },
      { src: Bold, fontWeight: 700 },
    ],
  });

  const styles = StyleSheet.create({
    image: {
      padding: 10,
      width: 75,
    },
    h2Container: {
      display: "flex",
      flexDirection: "column",
    },
    introRow: {
      display: "flex",
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: "flex-end",
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header} fixed={true}>
          <View style={[pdfStyles.section, pdfStyles.threeColumns]}>
            <Image style={styles.image} src={logo} />
          </View>
          <View
            style={[
              pdfStyles.section,
              pdfStyles.threeColumns,
              pdfStyles.headerColumn,
            ]}
          >
            <Text style={pdfStyles.h1}>Arbeidsforhold</Text>
            <View style={pdfStyles.headerColumn}>
              <Text style={pdfStyles.name}>Kari Normann</Text>
              <Text style={pdfStyles.fnr}>010190 11111</Text>
            </View>
          </View>
          <View
            style={[
              pdfStyles.section,
              pdfStyles.threeColumns,
              pdfStyles.headerColumn,
            ]}
          >
            <Text
              fixed
              style={pdfStyles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Side ${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>
        <View style={styles.introRow}>
          <View style={[pdfStyles.section, pdfStyles.twoColumns]}>
            {arbeidsforhold.arbeidsgiver.type === "Organisasjon" ? (
              <View style={styles.h2Container}>
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
            title={"Ansettelsesperiode"}
            data={arbeidsforhold.ansettelsesperiode?.periode}
            period={true}
          />
        </View>
        <View style={{ ...pdfStyles.flexGrid, height: 600 }}>
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
        {antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.h2}>Timer for timelønnet</Text>
            <TimerPDF timer={antallTimerForTimelonnet} locale={locale} />
          </View>
        )}
        {permisjonPermittering && permisjonPermittering.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.h2}>Permisjon/Permittering</Text>
            <PermisjonPDF permisjoner={permisjonPermittering} locale={locale} />
          </View>
        )}
        {utenlandsopphold && utenlandsopphold.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.h2}>Arbeid i utlandet</Text>
            <UtenlandsoppholdPDF
              utenlandsopphold={utenlandsopphold}
              locale={locale}
            />
          </View>
        )}
        {arbeidsavtaler && arbeidsavtaler.length > 0 && (
          <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={pdfStyles.h2}>Historikk</Text>
            </View>
            <HistorikkPDF arbeidsavtaler={arbeidsavtaler} locale={locale} />
          </View>
        )}
        <View style={pdfStyles.footer} fixed={true}>
          <Text>{sprak[locale].pdfFooter1}</Text>
          <Text>{sprak[locale].pdfFooter2}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListePDF;
