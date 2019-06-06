import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";

interface Props {
  data?: string | number;
  format?: string;
  dateFormat?: string;
}

const CheckDateAndPrint = (props: Props) => {
  if (!props.data) {
    return <NoData />;
  }

  const date = moment(props.data).format(props.dateFormat || "DD.MM.YYYY");
  return <span>{props.format ? parse(props.format, date) : date}</span>;
};
export default CheckDateAndPrint;
