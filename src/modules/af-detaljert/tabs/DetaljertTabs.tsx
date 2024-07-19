import React, { useState } from 'react';
import { AFUtvidet } from '@/types/arbeidsforhold';
import { useLocale } from '@/modules/common/useLocale';
import { sprak } from '@/language/provider';
import { TabContent } from './TabContent';
import { Tabs } from '@navikt/ds-react';
import { Locale } from '@/types/locale';

export type DetaljertTabType = 'timer' | 'permisjon' | 'utenlandsopphold' | 'historikk';

const getTabsData = (arbeidsforhold: AFUtvidet, locale: Locale) => {
    const { antallTimerForTimelonnet, permisjonPermittering, utenlandsopphold, arbeidsavtaler } = arbeidsforhold;

    const tabsData: {
        label: string;
        type: DetaljertTabType;
    }[] = [];

    if (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.timerfortimelonnet,
            type: 'timer',
        });
    }
    if (permisjonPermittering && permisjonPermittering.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.permisjonpermittering,
            type: 'permisjon',
        });
    }
    if (utenlandsopphold && utenlandsopphold.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.arbeidiutlandet,
            type: 'utenlandsopphold',
        });
    }
    if (arbeidsavtaler && arbeidsavtaler.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.historikk,
            type: 'historikk',
        });
    }

    return tabsData;
};

type Props = {
    arbeidsforhold: AFUtvidet;
};

export const DetaljertTabs = ({ arbeidsforhold }: Props) => {
    const { locale } = useLocale();
    const tabsData = getTabsData(arbeidsforhold, locale);
    const [currentTab, setCurrentTab] = useState<DetaljertTabType>(tabsData[0]?.type);

    if (tabsData.length === 0) {
        return null;
    }

    return (
        <div className="af-detaljert__tabs">
            <Tabs
                value={currentTab}
                onChange={(type) => {
                    setCurrentTab(type as DetaljertTabType);
                }}
            >
                <Tabs.List>
                    {tabsData.map((item, index) => (
                        <Tabs.Tab key={index} value={item.type} label={item.label} />
                    ))}
                </Tabs.List>
                {tabsData.map((item, index) => (
                    <Tabs.Panel value={item.type} key={index}>
                        <TabContent arbeidsforhold={arbeidsforhold} type={item.type} />
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );
};
