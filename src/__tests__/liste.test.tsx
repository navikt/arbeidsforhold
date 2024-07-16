import { fireEvent, render, screen } from "@testing-library/react";
import afListe from "../clients/apiMock/af-liste.json";
import "@testing-library/jest-dom";
import { Liste } from "../modules/af-liste/Liste";
import { AFSimpel } from "../types/arbeidsforhold";
import { formatDate } from "../utils/date";

vi.mock("@react-pdf/renderer", () => ({
  Text: () => <div>Text</div>,
  StyleSheet: {
    create: () => {},
  },
}));

beforeEach(() => {
  render(
    <Liste
      locale={"nb"}
      miljo={"LOCAL"}
      onClick={{ type: "INGEN_ON_CLICK" }}
      arbeidsforhold={afListe as unknown as AFSimpel[]}
    />
  );
});

describe("Liste over arbeidsforhold", () => {
  test("inneholder all data", () => {
    fireEvent.click(screen.getByText("Vis flere arbeidsforhold"));

    afListe.forEach((arbeidsforhold) => {
      arbeidsforhold.arbeidsgiver.type === "Organisasjon" &&
        expect(
          screen.getByText(arbeidsforhold.arbeidsgiver.orgnavn as string)
        ).toBeInTheDocument();
      expect(screen.getAllByText(arbeidsforhold.yrke).length).toBeGreaterThan(
        0
      );
      expect(
        screen.getAllByText(
          formatDate(arbeidsforhold.ansettelsesperiode.periode.periodeFra)
        ).length
      ).toBeGreaterThan(0);
      arbeidsforhold.ansettelsesperiode.periode.periodeTil &&
        expect(
          screen.getAllByText(
            formatDate(arbeidsforhold.ansettelsesperiode.periode.periodeTil)
          ).length
        ).toBeGreaterThan(0);
    });
  });
});
