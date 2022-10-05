import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { Text } from "@react-pdf/renderer";

interface Props {
  data?: string | number;
  format?: string;
  dateFormat?: string;
  maskineltAvsluttet?: string | null;
  isPdf?: boolean;
}

const CheckDateAndPrint = (props: Props) => {
  if (!props.data) {
    return <NoData isPdf={props.isPdf} />;
  }

  const date = moment(props.data).format(props.dateFormat || "DD.MM.YYYY");
  const formattedDate = props.format ? parse(props.format, date) : date;

  return (
    <span>
      {props.maskineltAvsluttet ? (
        <span>
          {props.isPdf ? <Text>{formattedDate}</Text> : <>{formattedDate}</>}
          <Hjelpetekst
            id={props.maskineltAvsluttet}
            className="af-date__hjelpetekst"
          >
            {props.maskineltAvsluttet}
          </Hjelpetekst>
        </span>
      ) : (
        <>{props.isPdf ? <Text>{formattedDate}</Text> : <>{formattedDate}</>}</>
      )}
    </span>
  );
};
export default CheckDateAndPrint;
