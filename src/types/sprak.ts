export interface Sprak {
  [key: string]: {
    antalltimer: string;
    ansettelsesform: string,
    ansettelsesperiode: string;
    apne: string;
    arbeidsavtale: string;
    arbeidsforhold: string;
    arbeidsforholdid: string;
    arbeidstidsordning: string;
    endretstillingsprosent: string;
    fartsomraade: string;
    generelleopplysninger: string;
    httperror: string;
    hovedenhet: string;
    hvisfeil1: string;
    hvisfeil2: string;
    ingenarbeidsforhold: string;
    land: string;
    lonnsendring: string;
    lukke: string;
    organisasjonsnummer: string;
    opptjeningsperiode: string;
    navaerendejobb: string;
    periode: string;
    prosent: string;
    rapporteringsperiode: string;
    side: string;
    sistbekreftet: string;
    sistelonnsendring: string;
    skipsregister: string;
    skipstype: string;
    sluttaarsak: string;
    stillingsprosent: string;
    tabs: {
      arbeidiutlandet: string;
      historikk: string;
      permisjonpermittering: string;
      timerfortimelonnet: string;
    };
    timerifullstilling: string;
    timerperuke: string;
    tilleggsopplysninger: string;
    type: string;
    typearbeidsforhold: string;
    utskriftsvalg: string;
    visfaerrearbeidsforhold: string;
    visflerearbeidsforhold: string;
    yrke: string;
    pdfFooter1: string;
    pdfFooter2: (date: string) => string;
  };
}
