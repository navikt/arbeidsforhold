import { Text, View } from "@react-pdf/renderer";
import React from "react";
import sprak from "../../language/provider";
import moment from "moment";
import { useLocale } from "./useLocale";
import { pdfStyles } from "./pdfStyles";

export const PdfFooter = () => {
  const { locale } = useLocale();

  return (
    <View style={pdfStyles.footer} fixed={true}>
      <Text>{sprak[locale].pdfFooter1}</Text>
      <Text>{sprak[locale].pdfFooter2(moment().format("DD.MM.YYYY"))}</Text>
    </View>
  );
};
