export interface AFSimpel {
  arbeidsforholdId: string;
  arbeidsgiver: {
    orgnr: string;
    orgnavn: string;
  };
  ansettelsesPeriode: {
    periodeFra?: string;
    periodeTil?: string;
  };
  yrke: string;
}

export interface AFArbeidsavtaler {
  antallTimerPrUke: number;
  arbeidstidsordning: string;
  beregnetAntallTimerPrUke: number;
  bruksperiode: {
    fom: string;
    tom: string;
  };
  gyldighetsperiode: {
    fom: string;
    tom: string;
  };
  sistLoennsendring: string;
  sistStillingsendring: string;
  stillingsprosent: number;
  yrke: number;
}

export interface AFPermisjonPermittering {
  periode: {
    fom: string;
    tom: string;
  };
  permisjonPermitteringId: string;
  prosent: number;
  type: string;
}

export interface AFTimerForTimelonnet {
  antallTimer: number;
  periode: {
    fom: string;
    tom: string;
  };
  rapporteringsperiode: string;
}

export interface AFUtenlandsopphold {
  landkode: string;
  periode: {
    fom: string;
    tom: string;
  };
  rapporteringsperiode: string;
}

export interface AFUtvidet {
  ansettelsesperiode: {
    bruksperiode: {
      fom: string;
      tom: string;
    };
    periode: {
      fom: string;
      tom: string;
    };
    varslingskode: string;
  };
  antallTimerForTimeloennet: AFTimerForTimelonnet[];
  arbeidsavtaler: AFArbeidsavtaler[];
  arbeidsforholdId: string;
  arbeidsgiver: {
    orgnr: string;
    orgnavn: string;
  };
  arbeidstaker: {
    type: string;
    aktoerId: number;
    offentligIdent: number;
  };
  innrapportertEtterAOrdningen: boolean;
  navArbeidsforholdId: number;
  opplysningspliktig: {
    type: string;
  };
  permisjonPermitteringer: AFPermisjonPermittering[];
  registrert: string;
  sistBekreftet: string;
  type: string;
  utenlandsopphold: AFUtenlandsopphold[];
}
