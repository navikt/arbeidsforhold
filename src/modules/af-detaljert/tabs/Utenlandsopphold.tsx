import React from "react";

interface Props {
  utenlandsopphold?: string[];
}

const Utenlandsopphold = (props: Props) => {
  console.log(props);
  return (
    <div className="af-detaljert__tabs-innhold">Innhold i utenlandsopphold</div>
  );
};

export default Utenlandsopphold;
