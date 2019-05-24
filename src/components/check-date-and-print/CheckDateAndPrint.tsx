import React from "react";
import NoData from "../no-data/NoData";
import Moment from "react-moment";

interface Props {
  data?: string | number;
}

const CheckDateAndPrint = (props: Props) =>
  props.data ? <Moment format="DD.MM.YYYY">{props.data}</Moment> : <NoData />;

export default CheckDateAndPrint;
