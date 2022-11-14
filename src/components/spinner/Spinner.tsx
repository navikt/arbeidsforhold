import { Loader } from "@navikt/ds-react";
import React from "react";

export const Spinner = () => {
  return (
    <div className="spinner__wrapper">
      <Loader size="xlarge" />
    </div>
  );
};
