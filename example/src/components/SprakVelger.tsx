import { Locale } from '../types/locale';

interface Props {
    locales: Locale[];
    valgtLocale: Locale;
    settValgtLocale: (locale: Locale) => void;
}

export const SprakVelger = (props: Props) => {
    const { locales, valgtLocale, settValgtLocale } = props;
    return (
        <div className="example__velger">
            {locales.map((locale) =>
                valgtLocale === locale ? (
                    <span key={locale} className="example__sprak">
                        <b>{locale}</b>
                    </span>
                ) : (
                    <button key={locale} className="example__sprak" onClick={() => settValgtLocale(locale)}>
                        {locale}
                    </button>
                )
            )}
        </div>
    );
};
