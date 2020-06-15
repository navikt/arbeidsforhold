import React from "react";
import { View, Document, StyleSheet } from "@react-pdf/renderer";
import { Page, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    paddingHorizontal: 35,
    paddingVertical: 35,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
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
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  pageNumber: {
    fontSize: 12,
  },
});

// Create Document Component
const ListePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={[styles.section, styles.threeColumns]}>
          <Image style={styles.image} src={logo} />
        </View>
        <View
          style={[styles.section, styles.threeColumns, styles.headerColumn]}
        >
          <Text style={styles.title}>Arbeidsforhold</Text>
          <View style={styles.headerColumn}>
            <Text style={styles.subtitle}>Kari Normann</Text>
            <Text style={styles.subtitle}>01019011111</Text>
          </View>
        </View>
        <View
          style={[styles.section, styles.threeColumns, styles.headerColumn]}
        >
          <Text
            fixed
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </View>
    </Page>
  </Document>
);

export default ListePDF;
