import React from "react";
import { AFListeOnClick } from "../../../src/modules/af-liste";

interface Props {
  onClicks: AFListeOnClick[];
  valgtOnClick: AFListeOnClick;
  settValgtOnClick: (onClick: AFListeOnClick) => void;
}

const CONVERTER = {
  INGEN_ON_CLICK: "Ingen onClick",
  LENKE: "Lenke",
  REACT_ROUTER_LENKE: "React Router Lenke",
  KNAPP: "Knapp"
};

const OnClickVelger = (props: Props) => {
  const { onClicks, valgtOnClick, settValgtOnClick } = props;
  return (
    <div className="example__velger">
      {onClicks.map((onClick, i) =>
        valgtOnClick.type === onClick.type ? (
          <span key={i} className="example__sprak">
            <b>{CONVERTER[onClick.type]}</b>
          </span>
        ) : (
          <span
            key={i}
            className="example__sprak"
            onClick={() => settValgtOnClick(onClicks[i])}
          >
            {CONVERTER[onClick.type]}
          </span>
        )
      )}
    </div>
  );
};

export default OnClickVelger;
