export interface AFSimpel {
  navArbeidsforholdId: number;
  arbeidsforholdId: string;
  arbeidsgiver: {
    organisasjonsnummer: string;
    type: string;
  };
  opplysningspliktig: {
    organisasjonsnummer: string;
    type: string;
  };
  type: string;
  ansettelsesperiode: {
    periode: {
      fom: string;
      tom: string;
    };
    bruksperiode: {
      fom: string;
    };
    sporingsinformasjon: {
      opprettetTidspunkt: string;
      opprettetAv: string;
      opprettetKilde: string;
      endretTidspunkt: string;
      endretAv: string;
      endretKilde: string;
    };
  };
  arbeidsavtaler: [
    {
      yrke: string;
      beregnetAntallTimerPrUke: number;
      sistStillingsendring: string;
      bruksperiode: {
        fom: string;
      };
      gyldighetsperiode: {
        fom: string;
      };
      sporingsinformasjon: {
        opprettetTidspunkt: string;
        opprettetAv: string;
        opprettetKilde: string;
        endretTidspunkt: string;
        endretAv: string;
        endretKilde: string;
      };
    }
  ];
  innrapportertEtterAOrdningen: boolean;
  sistBekreftet: string;
  sporingsinformasjon: {
    opprettetTidspunkt: string;
    opprettetAv: string;
    opprettetKilde: string;
    endretTidspunkt: string;
    endretAv: string;
    endretKilde: string;
  };
}

export interface AFUtvidet {}
