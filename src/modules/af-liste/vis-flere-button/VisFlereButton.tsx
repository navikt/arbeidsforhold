import React from "react";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { Collapse, Expand } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  toggleVisAlle: () => void;
  visAlle: boolean;
}

export const VisFlereButton = (props: Props) => {
  const { locale } = useLocale();
  return (
    <button
      className="af-liste__vis-flere"
      onClick={props.toggleVisAlle}
      aria-expanded={props.visAlle}
    >
      {props.visAlle ? (
        <>
          {sprak[locale].visfaerrearbeidsforhold} <Collapse />
        </>
      ) : (
        <>
          {sprak[locale].visflerearbeidsforhold} <Expand />
        </>
      )}
    </button>
  );
};
