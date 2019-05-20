import React from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import Moment from "react-moment";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

const Historikk = (props: Props) => {
  console.log(props);
  return (
    <div className="af-detaljert__tabs-innhold af-liste__table">
      {props.arbeidsavtaler.map(arbeidsavtale => (
        <div className="af-liste__rad" key={arbeidsavtale.yrke}>
          <div className="af-liste__kolonne">{arbeidsavtale.yrke}</div>
          <div className="af-liste__kolonne">
            {arbeidsavtale.stillingsprosent}
          </div>
          <div className="af-liste__kolonne">
            <Moment format="DD.MM.YYYY">
              {arbeidsavtale.bruksperiode.fom}
            </Moment>
            -<br />
            <Moment format="DD.MM.YYYY">
              {arbeidsavtale.bruksperiode.tom}
            </Moment>
          </div>
          <div className="af-liste__kolonne">
            {arbeidsavtale.antallTimerPrUke}
          </div>
          <div className="af-liste__kolonne">
            {arbeidsavtale.sistLoennsendring}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Historikk;
