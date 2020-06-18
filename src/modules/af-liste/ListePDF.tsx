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
    page: {
      fontFamily: "SourceSansPro",
      display: "flex",
      paddingTop: 40,
      paddingBottom: 100,
      paddingHorizontal: 40,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 30,
    },
    headerColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    section: {
      padding: 10,
      flexGrow: 1,
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
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    name: {
      paddingTop: 10,
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
    liste: {
      marginHorizontal: 10,
      borderTop: "1px solid black",
      borderBottom: "1px solid #979797",
    },
    listeRow: {
      paddingVertical: 10,
      borderTop: "1px solid #979797",
    },
    listRowFooter: {
      display: "flex",
      flexDirection: "row",
    },
    listeTitle: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    listeSubtitle: {
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
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed={true}>
          <View style={[styles.section, styles.threeColumns]}>
            <Image style={styles.image} src={logo} />
          </View>
          <View
            style={[styles.section, styles.threeColumns, styles.headerColumn]}
          >
            <Text style={styles.title}>{sprak[locale].arbeidsforhold}</Text>
            <View style={styles.headerColumn}>
              <Text style={styles.name}>Kari Normann</Text>
              <Text style={styles.fnr}>01019011111</Text>
            </View>
          </View>
          <View
            style={[styles.section, styles.threeColumns, styles.headerColumn]}
          >
            <Text
              fixed
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Side ${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>
        <View style={styles.liste}>
          {arbeidsforhold.map((foretak, i) => (
            <View key={i} style={styles.listeRow} wrap={false}>
              <View>
                <Text style={styles.listeTitle}>
                  <ArbeidsgiverTittel
                    arbeidsgiver={foretak.arbeidsgiver}
                    overskrift={true}
                  />
                </Text>
              </View>
              <View style={[styles.twoColumns, styles.listRowFooter]}>
                <Text style={styles.listeSubtitle}>{foretak.yrke}</Text>

                <Text style={styles.listeSubtitle}> {` // `}</Text>
                <Text style={styles.listeSubtitle}>
                  <CheckPeriodAndPrint
                    data={foretak.ansettelsesperiode.periode}
                  />
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer} fixed={true}>
          <Text>{sprak[locale].pdfFooter1}</Text>
          <Text>{sprak[locale].pdfFooter2}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListePDF;
