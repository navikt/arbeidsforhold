import React from "react";
import NoData from "../no-data/NoData";
import moment from "moment";
import { parse } from "../../utils/text";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { useLocale } from "../../modules/common/useLocale";
import TextIfPdf from "../text-if-pdf/TextIfPdf";

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
          <TextIfPdf>{formattedDate}</TextIfPdf>
          <Hjelpetekst
            id={props.maskineltAvsluttet}
            className="af-date__hjelpetekst"
          >
            {props.maskineltAvsluttet}
          </Hjelpetekst>
        </span>
      ) : (
        <TextIfPdf>{formattedDate}</TextIfPdf>
      )}
    </span>
  );
};
export default CheckDateAndPrint;
