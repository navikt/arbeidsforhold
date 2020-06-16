import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { AFSimpel } from "../../types/arbeidsforhold";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.tff";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.tff";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.tff";

interface Props {
  arbeidsforhold: AFSimpel[];
  miljo: "LOCAL" | "Q6" | "Q2" | "Q1" | "Q0" | "PROD";
}

// Create Document Component
const ListePDF = ({ arbeidsforhold, miljo }: Props) => {
  const useNavFonts = miljo === "LOCAL" || miljo === "PROD";

  if (useNavFonts) {
    Font.register({
      family: "SourceSansPro",
      fonts: [
        { src: Regular },
        { src: Italic, fontStyle: "italic" },
        { src: Bold, fontWeight: 700 },
      ],
    });
  }

  const styles = StyleSheet.create({
    page: {
      ...(useNavFonts && {
        fontFamily: "SourceSansPro",
      }),
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
      flexGrow: 1,
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
      marginTop: 20,
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
    },
    listeRow: {
      paddingVertical: 10,
      borderTop: "1px solid black",
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
    listeFooter: {
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
            <Text style={styles.title}>Arbeidsforhold</Text>
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
          {arbeidsforhold.map((foretak) => (
            <View style={styles.listeRow}>
              <Text style={styles.listeTitle}>
                <ArbeidsgiverTittel
                  arbeidsgiver={foretak.arbeidsgiver}
                  overskrift={true}
                />
              </Text>
              <Text style={styles.listeSubtitle}>{foretak.yrke}</Text>
              <Text style={styles.listeSubtitle}>
                <CheckPeriodAndPrint
                  data={foretak.ansettelsesperiode.periode}
                />
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.listeFooter}>
          <Text>
            Hvis noe er feil med et arbeidsforhold må du kontakte arbeidsgiveren
            det gjelder,
          </Text>
          <Text>slik at de kan rette det opp.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListePDF;
