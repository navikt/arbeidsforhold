import React from "react";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import CheckAndPrint from "../check-and-print/CheckAndPrint";
import { Text, View } from "@react-pdf/renderer";

interface Props {
  title: string;
  data?: string | number;
  children?: string | JSX.Element | JSX.Element[];
  format?: string;
  date?: boolean;
}

const PDFCheckAndPrintBox = (props: Props) => {
  const styles = {
    column: {
      padding: 10,
      width: "50%",
    },
    title: {
      fontWeight: 700,
      fontSize: 12,
    },
    subtitle: {
      paddingTop: 2.5,
      fontSize: 12,
    },
  };
  return props.data ? (
    <View style={styles.column}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>
        {props.date ? (
          <CheckDateAndPrint data={props.data} format={props.format} />
        ) : (
          <CheckAndPrint data={props.data} format={props.format} />
        )}
      </Text>
      {props.children}
    </View>
  ) : null;
};

export default PDFCheckAndPrintBox;
