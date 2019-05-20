import React from "react";

interface Props {
  historikk?: string[];
}

const Timer = (props: Props) => {
  console.log(props);
  return (
    <div className="af-detaljert__tabs-innhold">
      Innhold i timer for timelønnet
    </div>
  );
};

export default Timer;
