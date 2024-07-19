import React from 'react';
import { Locale } from '@/types/locale';

interface Props {
    locales: Locale[];
    valgtLocale: Locale;
    settValgtLocale: (locale: Locale) => void;
}

export const SprakVelger = (props: Props) => {
    const { locales, valgtLocale, settValgtLocale } = props;
    return (
        <div className="example__velger">
            {locales.map((locale, i) =>
                valgtLocale === locale ? (
                    <span key={i} className="example__sprak">
                        <b>{locale}</b>
                    </span>
                ) : (
                    <span key={i} className="example__sprak" onClick={() => settValgtLocale(locale)}>
                        {locale}
                    </span>
                )
            )}
        </div>
    );
};
