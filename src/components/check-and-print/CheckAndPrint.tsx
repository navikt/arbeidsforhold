import React from "react";
import NoData from "../no-data/NoData";
import Moment from "react-moment";

interface Props {
  data?: string | number;
}

const CheckAndPrint = (props: Props) =>
  props.data ? (
    typeof props.data === "string" && Date.parse(props.data) ? (
      <Moment format="DD.MM.YYYY">{props.data}</Moment>
    ) : (
      <span>{props.data}</span>
    )
  ) : (
    <NoData />
  );

export default CheckAndPrint;
