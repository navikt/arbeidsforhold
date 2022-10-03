import nb from "./nb";
import en from "./en";
import nn from "./nn";
import { Locale } from "../types/locale";

export const sprak = {
  nb: nb,
  en: en,
  nn: nn,
} as Sprak;

export default sprak;

type Sprak = { [key in Locale]: defaultSprak };

type defaultSprak = typeof nb;
