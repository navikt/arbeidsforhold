import React from "react";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { Expand, Next } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  toggleVisAlle: () => void;
  visAlle: boolean;
}

export const VisFlereButton = (props: Props) => {
  const { locale } = useLocale();
  return (
    <button
      className="af-liste__vis-flere lenke"
      onClick={props.toggleVisAlle}
      aria-expanded={props.visAlle}
    >
      {props.visAlle ? (
        <BodyShort>
          {sprak[locale].visfaerrearbeidsforhold} <Next />
        </BodyShort>
      ) : (
        <BodyShort>
          {sprak[locale].visflerearbeidsforhold} <Expand />
        </BodyShort>
      )}
    </button>
  );
};
