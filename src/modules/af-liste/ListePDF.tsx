import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text } from "@react-pdf/renderer";
import { AFSimpel } from "../../types/arbeidsforhold";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf";
import { PdfFooter, PdfHeader, pdfStyles } from "../common/pdf";

interface Props {
  locale: "nb" | "en";
  arbeidsforhold: AFSimpel[];
  printName: string;
  printSSO: string;
}

// Create Document Component
const ListePDF = ({ arbeidsforhold, locale, printName, printSSO }: Props) => {
  Font.register({
    family: "SourceSansPro",
    fonts: [
      { src: Regular },
      { src: Italic, fontStyle: "italic" },
      { src: Bold, fontWeight: 700 },
    ],
  });

  const styles = StyleSheet.create({
    liste: {
      marginHorizontal: 10,
      borderTop: "1px solid black",
      borderBottom: "1px solid #979797",
    },
    listeRow: {
      paddingVertical: 10,
      borderTop: "1px solid #979797",
    },
    footer: {
      position: "absolute",
      bottom: 50,
      left: 50,
      paddingTop: 10,
      fontSize: 11,
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeader printName={printName} printSSO={printSSO} locale={locale} />
        <View style={styles.liste}>
          {arbeidsforhold.map((foretak, i) => (
            <View key={i} style={styles.listeRow} wrap={false}>
              <Text style={pdfStyles.h3}>
                <ArbeidsgiverTittel
                  arbeidsgiver={foretak.arbeidsgiver}
                  overskrift={true}
                />
              </Text>
              <Text style={pdfStyles.normaltekst}>{foretak.yrke}</Text>
              <Text style={pdfStyles.normaltekst}>
                <CheckPeriodAndPrint
                  data={foretak.ansettelsesperiode.periode}
                />
              </Text>
            </View>
          ))}
        </View>
        <PdfFooter locale={locale} />
      </Page>
    </Document>
  );
};

export default ListePDF;
