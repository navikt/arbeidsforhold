import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import React from "react";
import sprak from "../../language/provider";
import { useLocale } from "./useLocale";
import { pdfStyles } from "./pdfStyles";

interface Props {
  printName: string;
  printSSO: string;
}

export const PdfHeader = (props: Props) => {
  const { locale } = useLocale();

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
        <Text style={pdfStyles.h1}>{sprak[locale].arbeidsforhold}</Text>
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
            `${sprak[locale].side} ${pageNumber} / ${totalPages}`
          }
        />
      </View>
    </View>
  );
};
