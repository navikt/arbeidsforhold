import React from "react";

interface Props {
  locales: string[];
  valgtLocale: string;
  settValgtLocale: (locale: "en" | "nb") => void;
}

const SprakVelger = (props: Props) => {
  const { locales, valgtLocale, settValgtLocale } = props;
  return (
    <div className="example__velger">
      {locales.map((locale, i) =>
        valgtLocale === locale ? (
          <span key={i} className="example__sprak">
            <b>{locale}</b>
          </span>
        ) : (
          <span
            key={i}
            className="example__sprak"
            onClick={() => settValgtLocale(locale as "nb" | "en")}
          >
            {locale}
          </span>
        )
      )}
    </div>
  );
};

export default SprakVelger;
