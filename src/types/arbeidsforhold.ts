export interface AFSimpel {
    arbeidsforholdId: string;
    arbeidsgiver: AFArbeidsgiver;
    ansettelsesperiode: AFAnsettelsesperiode;
    navArbeidsforholdId: number;
    yrke: string;
}

export interface AFArbeidsavtaler {
    ansettelsesform?: string;
    antallTimerPrUke?: number;
    arbeidstidsordning?: string;
    beregnetAntallTimerPrUke?: number;
    fartsomraade?: string;
    gyldighetsperiode?: AFPeriode;
    skipsregister?: string;
    skipstype?: string;
    sisteLoennsendring?: string;
    sisteStillingsendring?: string;
    stillingsprosent?: number;
    yrke?: string;
}

export interface AFPermisjonPermittering {
    periode?: AFPeriode;
    permisjonPermitteringId: string;
    prosent?: number;
    type: string;
}

export interface AFTimerForTimelonnet {
    antallTimer?: number;
    periode?: AFPeriode;
    rapporteringsperiode?: string;
}

export interface AFUtenlandsopphold {
    land: string;
    landkode: string;
    periode: AFPeriode;
    rapporteringsperiode: string;
}

export interface AFPeriode {
    periodeFra: string;
    periodeTil?: string;
}

export interface AFAnsettelsesperiode {
    periode: AFPeriode;
    varslingskode?: Varslingskode;
    sluttaarsak?: string;
}

export type Varslingskode = 'ERKONK' | 'EROPPH' | 'ERVIRK' | 'IBARBG' | 'IBKAOR';

export type AFArbeidsgiver =
    | {
          type: 'Organisasjon';
          orgnr: string;
          orgnavn: string;
      }
    | {
          type: 'Person';
          fnr: string;
      };

export interface AFUtvidet extends AFArbeidsavtaler {
    ansettelsesperiode?: AFAnsettelsesperiode;
    antallTimerForTimelonnet: AFTimerForTimelonnet[];
    arbeidsavtaler: AFArbeidsavtaler[];
    arbeidsgiver: AFArbeidsgiver;
    arbeidstaker?: {
        type: string;
        aktoerId: number;
        offentligIdent: number;
    };
    eksternArbeidsforholdId: string;
    innrapportertEtterAOrdningen: boolean;
    navArbeidsforholdId: number;
    opplysningspliktigarbeidsgiver: AFArbeidsgiver;
    permisjonPermittering: AFPermisjonPermittering[];
    registrert?: string;
    sistBekreftet?: string;
    type?: string;
    utenlandsopphold: AFUtenlandsopphold[];
}
