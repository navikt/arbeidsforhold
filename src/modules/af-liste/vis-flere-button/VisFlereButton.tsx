import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { sprak } from "../../../language/provider";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { useLocale } from "../../common/useLocale";

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
        <Normaltekst>
          {sprak[locale].visfaerrearbeidsforhold} <OppChevron />
        </Normaltekst>
      ) : (
        <Normaltekst>
          {sprak[locale].visflerearbeidsforhold} <NedChevron />
        </Normaltekst>
      )}
    </button>
  );
};
