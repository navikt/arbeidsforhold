import { Locale } from '@/types/locale';
import React, { useContext } from 'react';

const LocaleContext = React.createContext<Locale>('nb');

export const useLocale = () => {
    const locale = useContext(LocaleContext);
    return { locale: locale, LocaleProvider: LocaleContext.Provider };
};
