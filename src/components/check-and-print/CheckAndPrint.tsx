import React from "react";
import NoData from "../no-data/NoData";

interface Props {
  data?: string | number;
}

const CheckAndPrint = (props: Props) =>
  props.data ? <span>{props.data}</span> : <NoData />;

export default CheckAndPrint;
