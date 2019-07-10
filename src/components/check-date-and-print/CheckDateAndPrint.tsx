import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";
import Hjelpetekst from "nav-frontend-hjelpetekst";

interface Props {
  data?: string | number;
  format?: string;
  dateFormat?: string;
  maskineltAvsluttet?: string;
}

const CheckDateAndPrint = (props: Props) => {
  if (!props.data) {
    return <NoData />;
  }

  const date = moment(props.data).format(props.dateFormat || "DD.MM.YYYY");
  const formattedDate = props.format ? parse(props.format, date) : date;
  return (
    <span>
      {props.maskineltAvsluttet ? (
        <span>
          <span>{formattedDate}</span>
          <Hjelpetekst
            id={props.maskineltAvsluttet}
            className="af-date__hjelpetekst"
          >
            {props.maskineltAvsluttet}
          </Hjelpetekst>
        </span>
      ) : (
        formattedDate
      )}
    </span>
  );
};
export default CheckDateAndPrint;
