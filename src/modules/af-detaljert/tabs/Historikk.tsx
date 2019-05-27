import React from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

const Historikk = (props: Props) => (
  <table className="af-detaljert__tabs-innhold af-liste__table">
    <thead>
      <tr className="af-liste__rad">
        <td className="af-liste__kolonne">
          <Element>Yrke</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Stillingsprosent</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Timer/uke</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Lønnsendring</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Periode</Element>
        </td>
      </tr>
    </thead>
    <tbody>
      {props.arbeidsavtaler.map((arbeidsavtale, counter) => (
        <tr className="af-liste__rad" key={counter}>
          <td className="af-liste__kolonne">
            <CheckAndPrint data={arbeidsavtale.yrke} />
          </td>
          <td className="af-liste__kolonne">
            <CheckAndPrint data={arbeidsavtale.stillingsprosent} />
          </td>
          <td className="af-liste__kolonne">
            <CheckAndPrint data={arbeidsavtale.antallTimerPrUke} />
          </td>
          <td className="af-liste__kolonne">
            <CheckDateAndPrint data={arbeidsavtale.sisteLoennsendring} />
          </td>
          <td className="af-liste__kolonne">
            <CheckPeriodAndPrint
              data={arbeidsavtale.gyldighetsperiode}
              twoLines={true}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Historikk;
