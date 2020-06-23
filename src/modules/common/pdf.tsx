import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import React from "react";
import sprak from "../../language/provider";

interface PdfHeaderProps {
  printName: string;
  printSSO: string;
}

export const PdfHeader = (props: PdfHeaderProps) => {
  const styles = StyleSheet.create({
    image: {
      padding: 10,
      width: 75,
    },
  });

  return (
    <View style={pdfStyles.header} fixed={true}>
      <View style={[pdfStyles.section, pdfStyles.center, { width: "20%" }]}>
        <Image style={styles.image} src={logo} />
      </View>
      <View style={[pdfStyles.section, pdfStyles.center, { width: "60%" }]}>
        <Text style={pdfStyles.h1}>Arbeidsforhold</Text>
        <View style={pdfStyles.center}>
          <Text style={pdfStyles.name}>{props.printName}</Text>
          <Text style={pdfStyles.fnr}>
            {props.printSSO.replace(/.{5}$/, " $&")}
          </Text>
        </View>
      </View>
      <View style={[pdfStyles.section, pdfStyles.center, { width: "20%" }]}>
        <Text
          fixed
          style={pdfStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Side ${pageNumber} / ${totalPages}`
          }
        />
      </View>
    </View>
  );
};

export const PdfFooter = ({ locale }: { locale: string }) => (
  <View style={pdfStyles.footer} fixed={true}>
    <Text>{sprak[locale].pdfFooter1}</Text>
    <Text>{sprak[locale].pdfFooter2}</Text>
  </View>
);

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "SourceSansPro",
    display: "flex",
    paddingTop: 40,
    paddingBottom: 100,
    paddingHorizontal: 40,
  },
  //Header
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 12,
  },
  fnr: {
    fontWeight: "normal",
    fontSize: 12,
  },

  //Fonts
  h1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  h3: {
    fontWeight: "bold",
    fontSize: 12,
  },
  normaltekst: {
    paddingTop: 2.5,
    fontSize: 11,
  },

  // General
  section: {
    padding: 10,
  },
  twoColumns: {
    width: "50%",
  },
  threeColumns: {
    width: "33%",
  },
  pageNumber: {
    fontSize: 11,
  },

  //Tables
  flexGrid: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  tableTitle: {
    paddingVertical: 10,
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
    paddingRight: 10,
    width: "33%",
  },

  //Footer
  footer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    paddingTop: 10,
    fontSize: 11,
  },
});
