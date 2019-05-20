import React from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import Moment from "react-moment";
import { Element } from "nav-frontend-typografi";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

const Historikk = (props: Props) => {
  console.log(props);
  return (
    <table className="af-detaljert__tabs-innhold af-liste__table">
      <tr className="af-liste__rad">
        <td className="af-liste__kolonne">
          <Element>Yrke</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Stillingsprosent</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Periode</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Timer/uke</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Lønnsendring</Element>
        </td>
      </tr>
      {props.arbeidsavtaler.map(arbeidsavtale => (
        <tr
          className="af-liste__rad"
          key={`${arbeidsavtale.bruksperiode.fom}-${
            arbeidsavtale.bruksperiode.tom
          }`}
        >
          <td className="af-liste__kolonne">{arbeidsavtale.yrke}</td>
          <td className="af-liste__kolonne">
            {arbeidsavtale.stillingsprosent}
          </td>
          <td className="af-liste__kolonne">
            <Moment format="DD.MM.YYYY">
              {arbeidsavtale.bruksperiode.fom}
            </Moment>
            -<br />
            <Moment format="DD.MM.YYYY">
              {arbeidsavtale.bruksperiode.tom}
            </Moment>
          </td>
          <td className="af-liste__kolonne">
            {arbeidsavtale.antallTimerPrUke}
          </td>
          <td className="af-liste__kolonne">
            <Moment format="DD.MM.YYYY">
              {arbeidsavtale.sistLoennsendring}
            </Moment>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Historikk;
