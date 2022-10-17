import React from "react";
import NoData from "../no-data/NoData";
import { parse } from "../../utils/text";
import TextIfPdf from "../text-if-pdf/TextIfPdf";

interface Props {
  data?: string | number;
  format?: string;
  font?: string;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    <span className={props.font}>
      <TextIfPdf>
        {props.format ? parse(props.format, props.data) : props.data}
      </TextIfPdf>
    </span>
  ) : (
    <NoData />
  );

export default CheckAndPrint;
