import React from 'react';
import { Locale } from '@/types/locale';
import { useContext } from 'react';

const LocaleContext = React.createContext<Locale>('nb');

export const useLocale = () => {
    const locale = useContext(LocaleContext);
    return { locale: locale, LocaleProvider: LocaleContext.Provider };
};
