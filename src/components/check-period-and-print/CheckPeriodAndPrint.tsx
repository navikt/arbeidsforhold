import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import NoData from "../no-data/NoData";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import { Text } from "@react-pdf/renderer";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
  format?: string;
  maskineltAvsluttet?: string | null;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <span>
      <CheckDateAndPrint
        data={props.data.periodeFra}
        dateFormat={props.format}
      />
      <Text>{` - `}</Text>
      {props.twoLines && <br />}
      <CheckDateAndPrint
        data={props.data.periodeTil}
        dateFormat={props.format}
        maskineltAvsluttet={props.maskineltAvsluttet}
      />
    </span>
  ) : (
    <NoData />
  );

export default CheckPeriodAndPrint;
