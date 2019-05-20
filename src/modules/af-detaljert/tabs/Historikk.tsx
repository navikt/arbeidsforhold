import React from "react";

interface Props {
  historikk?: string[];
}

const Historikk = (props: Props) => {
  console.log(props);
  return <div className="af-detaljert__tabs-innhold">Innhold i historikk</div>;
};

export default Historikk;
