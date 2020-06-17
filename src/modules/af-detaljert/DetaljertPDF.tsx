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
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  arbeidsforhold: AFUtvidet;
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
    detaljerGrid: {
      display: "flex",
      paddingVertical: 5,
      flexWrap: "wrap",
      flexDirection: "row",
    },
    detaljerIntroRow: {
      display: "flex",
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    detaljerOrgName: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    detaljerOrgNameContainer: {
      display: "flex",
      flexDirection: "column",
    },
    detaljerInfoTitle: {
      fontWeight: "bold",
      fontSize: 12,
    },
    detaljerInfoSubtitle: {
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
        <View style={[styles.detaljer, styles.detaljerIntroRow]}>
          <View style={[styles.section, styles.twoColumns]}>
            {arbeidsforhold.arbeidsgiver.type === "Organisasjon" ? (
              <View style={styles.detaljerOrgNameContainer}>
                <View>
                  <Text style={styles.detaljerOrgName}>
                    {arbeidsforhold.arbeidsgiver.orgnavn}
                  </Text>
                </View>
                <View>
                  <Text style={styles.detaljerInfoSubtitle}>
                    Organisasjonsnummer {arbeidsforhold.arbeidsgiver.orgnr}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.detaljerInfoSubtitle}>
                {arbeidsforhold.arbeidsgiver.fnr}
              </Text>
            )}
          </View>
          <View style={[styles.section, styles.twoColumns]}>
            {arbeidsforhold.ansettelsesperiode && (
              <View style={styles.twoColumns}>
                <Text style={styles.detaljerInfoTitle}>Ansettelsesperiode</Text>
                <Text style={styles.detaljerInfoSubtitle}>
                  <CheckPeriodAndPrint
                    data={arbeidsforhold.ansettelsesperiode.periode}
                  />
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.detaljerGrid}>
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
            <Normaltekst>
              <PDFCheckAndPrint
                data={arbeidsforhold.sisteStillingsendring}
                format={`(${sprak[locale].endretstillingsprosent} %s)`}
              />
            </Normaltekst>
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
        <View style={styles.detaljerFooter} fixed={true}>
          <Text>{sprak[locale].hvisfeil1}</Text>
          <Text>{sprak[locale].hvisfeil2}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListePDF;
