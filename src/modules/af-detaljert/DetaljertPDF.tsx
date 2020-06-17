import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { AFUtvidet } from "../../types/arbeidsforhold";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf";
import PDFCheckAndPrintBox from "../../components/pdf-check-and-print-box/PDFCheckAndPrintBox";
import sprak from "../../language/provider";
import { orgnr } from "../../utils/orgnr";
import PDFCheckAndPrint from "../../components/pdf-check-and-print/PDFCheckAndPrint";
import TimerPDF from "./tabs/TimerPDF";
import PermisjonPDF from "./tabs/PermisjonPDF";

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

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header} fixed={true}>
          <View style={[pdfStyles.section, pdfStyles.threeColumns]}>
            <Image style={pdfStyles.image} src={logo} />
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
              <Text style={pdfStyles.fnr}>01019011111</Text>
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
        <View style={[pdfStyles.detaljer, pdfStyles.introRow]}>
          <View style={[pdfStyles.section, pdfStyles.twoColumns]}>
            {arbeidsforhold.arbeidsgiver.type === "Organisasjon" ? (
              <View style={pdfStyles.h2Container}>
                <View>
                  <Text style={pdfStyles.h2}>
                    {arbeidsforhold.arbeidsgiver.orgnavn}
                  </Text>
                </View>
                <View>
                  <Text style={pdfStyles.elementSubtitle}>
                    Organisasjonsnummer {arbeidsforhold.arbeidsgiver.orgnr}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={pdfStyles.elementSubtitle}>
                {arbeidsforhold.arbeidsgiver.fnr}
              </Text>
            )}
          </View>
          <View style={[pdfStyles.section, pdfStyles.twoColumns]}>
            {arbeidsforhold.ansettelsesperiode && (
              <View style={pdfStyles.twoColumns}>
                <Text style={pdfStyles.elementTitle}>Ansettelsesperiode</Text>
                <Text style={pdfStyles.elementSubtitle}>
                  <CheckPeriodAndPrint
                    data={arbeidsforhold.ansettelsesperiode.periode}
                  />
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={pdfStyles.grid}>
          {arbeidsforhold.opplysningspliktigarbeidsgiver.type ===
            "Organisasjon" && (
            <PDFCheckAndPrintBox
              title={sprak[locale].hovedenhet}
              data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnavn}
            >
              <PDFCheckAndPrint
                data={orgnr(
                  arbeidsforhold.opplysningspliktigarbeidsgiver.orgnr
                )}
                format={`${sprak[locale].organisasjonsnummer} %s`}
              />
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
            <PDFCheckAndPrint
              data={arbeidsforhold.sisteStillingsendring}
              format={`(${sprak[locale].endretstillingsprosent} %s)`}
            />
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
          </View>
        )}
        {arbeidsavtaler && arbeidsavtaler.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.h2}>Historikk</Text>
          </View>
        )}
        <View style={pdfStyles.footer} fixed={true}>
          <Text>{sprak[locale].hvisfeil1}</Text>
          <Text>{sprak[locale].hvisfeil2}</Text>
        </View>
      </Page>
    </Document>
  );
};

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "SourceSansPro",
    display: "flex",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  section: {
    padding: 10,
  },
  twoColumns: {
    width: "50%",
  },
  threeColumns: {
    width: "33%",
  },
  image: {
    padding: 10,
    width: 75,
  },
  h1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  h2Container: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  fnr: {
    fontWeight: "normal",
    fontSize: 14,
  },
  pageNumber: {
    fontSize: 12,
  },
  detaljer: {
    marginTop: 20,
  },
  grid: {
    display: "flex",
    paddingVertical: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    height: "80%",
  },
  introRow: {
    display: "flex",
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  elementTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  elementSubtitle: {
    paddingTop: 2.5,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    paddingTop: 10,
    fontSize: 10,
  },
  flexTable: {
    paddingVertical: 20,
    width: "100%",
  },
  flexSection: {
    paddingTop: 12,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    paddingVertical: 2,
    width: "33%",
  },
});

export default ListePDF;
