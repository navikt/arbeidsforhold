import React from "react";

interface Props {
  historikk?: string[];
}

const Permisjon = (props: Props) => {
  console.log(props);
  return (
    <div className="af-detaljert__tabs-innhold">
      Innhold i permisjon / permittering
    </div>
  );
};

export default Permisjon;
