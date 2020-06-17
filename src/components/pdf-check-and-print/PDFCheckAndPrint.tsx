import React from "react";
import { parse } from "../../utils/text";
import { StyleSheet, Text } from "@react-pdf/renderer";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
}

const PDFCheckAndPrint = (props: Props) => {
  const styles = StyleSheet.create({
    subtitle: { fontSize: 12 },
  });
  return props.data ? (
    <Text style={styles.subtitle}>
      {props.format ? parse(props.format, props.data) : props.data}
    </Text>
  ) : null;
};

export default PDFCheckAndPrint;
