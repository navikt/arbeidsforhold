import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";

interface Props {
  data?: string | number;
  format?: string;
}

const CheckDateAndPrint = (props: Props) => {
  if (!props.data) {
    return <NoData />;
  }

  const date = moment(props.data).format("DD.MM.YYYY");
  return <span>{props.format ? parse(props.format, date) : date}</span>;
};
export default CheckDateAndPrint;
