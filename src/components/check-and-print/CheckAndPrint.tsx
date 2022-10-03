import React from "react";
import NoData from "../no-data/NoData";
import { parse } from "../../utils/text";
import { Text } from "@react-pdf/renderer";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    <Text>
      <span className={props.font}>{props.format ? parse(props.format, props.data) : props.data}</span>
    </Text>
  ) : (
    <NoData />
  );

export default CheckAndPrint;
