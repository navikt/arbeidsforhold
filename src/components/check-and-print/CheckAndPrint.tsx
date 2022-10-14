import React from "react";
import NoData from "../no-data/NoData";
import { parse } from "../../utils/text";
import CheckIsPdf from "../check-pdf/CheckIsPdf";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    <span className={props.font}>
      <CheckIsPdf>
        {props.format ? parse(props.format, props.data) : props.data}
      </CheckIsPdf>
    </span>
  ) : (
    <NoData />
  );

export default CheckAndPrint;
