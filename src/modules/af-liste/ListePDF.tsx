import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { AFSimpel } from "../../types/arbeidsforhold";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf";
import sprak from "../../language/provider";
import { pdfStyles } from "../common/pdf-styles";

interface Props {
  arbeidsforhold: AFSimpel[];
  locale: "nb" | "en";
}

// Create Document Component
const ListePDF = ({ arbeidsforhold, locale }: Props) => {
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
            <Text style={pdfStyles.h1}>{sprak[locale].arbeidsforhold}</Text>
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
        <View style={pdfStyles.footer} fixed={true}>
          <Text>{sprak[locale].pdfFooter1}</Text>
          <Text>{sprak[locale].pdfFooter2}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListePDF;
