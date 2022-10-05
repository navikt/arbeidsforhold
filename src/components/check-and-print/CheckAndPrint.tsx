import React from "react";
import NoData from "../no-data/NoData";
import { parse } from "../../utils/text";
import { Text } from "@react-pdf/renderer";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
  isPdf?: boolean;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    <span className={props.font}>
      {props.isPdf ? (
        <Text>
          {props.format ? parse(props.format, props.data) : props.data}
        </Text>
      ) : (
        <>{props.format ? parse(props.format, props.data) : props.data}</>
      )}
    </span>
  ) : (
    <NoData />
  );

export default CheckAndPrint;
