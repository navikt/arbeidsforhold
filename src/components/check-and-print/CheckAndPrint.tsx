import React from "react";
import NoData from "../no-data/NoData";
import { parse } from "../../utils/text";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    <span className={props.font}>{props.format ? parse(props.format, props.data) : props.data}</span>
  ) : (
    <NoData />
  );

export default CheckAndPrint;
