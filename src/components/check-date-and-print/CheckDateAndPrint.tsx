import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { useLocale } from "../../modules/common/useLocale";
import CheckIsPdf from "../check-pdf/CheckIsPdf";

interface Props {
  data?: string | number;
  format?: string;
  dateFormat?: string;
  maskineltAvsluttet?: string | null;
}

const CheckDateAndPrint = (props: Props) => {
  const { locale } = useLocale();

  if (!props.data) {
    return <NoData />;
  }

  const date = moment(props.data)
    .locale(locale)
    .format(props.dateFormat || "DD.MM.YYYY");
  const formattedDate = props.format ? parse(props.format, date) : date;

  return (
    <span>
      {props.maskineltAvsluttet ? (
        <span>
          <CheckIsPdf>{formattedDate}</CheckIsPdf>
          <Hjelpetekst
            id={props.maskineltAvsluttet}
            className="af-date__hjelpetekst"
          >
            {props.maskineltAvsluttet}
          </Hjelpetekst>
        </span>
      ) : (
        <CheckIsPdf>{formattedDate}</CheckIsPdf>
      )}
    </span>
  );
};
export default CheckDateAndPrint;
