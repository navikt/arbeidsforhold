import React from "react";
import { Font, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { AFUtvidet } from "../../types/arbeidsforhold";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import Regular from "../../assets/fonts/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf";
import Italic from "../../assets/fonts/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf";
import Bold from "../../assets/fonts/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf";

interface Props {
  arbeidsforhold: AFUtvidet;
}

// Create Document Component
const ListePDF = ({ arbeidsforhold }: Props) => {
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
    detaljer: {
      marginTop: 20,
    },
    detaljerRow: {
      display: "flex",
      paddingVertical: 10,
      flexDirection: "row",
    },
    detaljerTitle: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    detaljerTitleContainer: {
      display: "flex",
      flexDirection: "column",
    },
    detaljerSubtitle: {
      paddingTop: 2.5,
      fontSize: 12,
    },
    detaljerFooter: {
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
        <View style={[styles.detaljer, styles.detaljerRow]}>
          <View style={[styles.section, styles.twoColumns]}>
            {arbeidsforhold.arbeidsgiver.type === "Organisasjon" ? (
              <View style={styles.detaljerTitleContainer}>
                <View>
                  <Text style={styles.detaljerTitle}>
                    {arbeidsforhold.arbeidsgiver.orgnavn}
                  </Text>
                </View>
                <View>
                  <Text style={styles.detaljerSubtitle}>
                    Organisasjonsnummer {arbeidsforhold.arbeidsgiver.orgnr}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.detaljerSubtitle}>
                {arbeidsforhold.arbeidsgiver.fnr}
              </Text>
            )}
          </View>
          <View style={[styles.section, styles.twoColumns]}>
            <Text style={styles.detaljerSubtitle}>{arbeidsforhold.yrke}</Text>
            {arbeidsforhold.ansettelsesperiode && (
              <Text style={styles.detaljerSubtitle}>
                <CheckPeriodAndPrint
                  data={arbeidsforhold.ansettelsesperiode.periode}
                />
              </Text>
            )}
          </View>
        </View>
        <View style={styles.detaljerFooter} fixed={true}>
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
