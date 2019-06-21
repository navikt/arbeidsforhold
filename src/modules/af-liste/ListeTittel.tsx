import React from "react";
import { Element } from "nav-frontend-typografi";
import { AFListeOnClick } from "./index";
import { AFSimpel } from "../../types/arbeidsforhold";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";

interface Props {
  foretak: AFSimpel;
  onClick: AFListeOnClick;
}

export const ListeTittel = (props: Props) => {
  const { foretak, onClick } = props;

  const replaceId = (path: string, id: number) =>
    path.replace("{id}", id.toString());

  switch (onClick.type) {
    case "INGEN_ON_CLICK":
      return <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />;
    case "LENKE":
      return (
        <a
          className="lenke"
          href={replaceId(onClick.href, foretak.navArbeidsforholdId)}
        >
          <Element>
            <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
          </Element>
        </a>
      );
    case "REACT_ROUTER_LENKE":
      return (
        <onClick.Component
          className="lenke"
          to={replaceId(onClick.to, foretak.navArbeidsforholdId)}
        >
          <Element>
            <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
          </Element>
        </onClick.Component>
      );
    case "KNAPP":
      return (
        <div
          className="lenke"
          onClick={() => onClick.getId(foretak.navArbeidsforholdId)}
        >
          <Element>
            <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
          </Element>
        </div>
      );
  }
};
