import React, { SyntheticEvent, useState } from 'react';
import Tabs from 'nav-frontend-tabs';
import { Select } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { Locale } from '../../types/locale';
import { AFUtvidet } from '../../types/arbeidsforhold';
import sprak from '../../language/provider';
import Timer from './tabs/Timer';
import Permisjon from './tabs/Permisjon';
import Utenlandsopphold from './tabs/Utenlandsopphold';
import Historikk from './tabs/Historikk';

type Props = {
    locale: Locale;
    arbeidsforhold: AFUtvidet;
};

const getTabsData = ({ locale, arbeidsforhold }: Props) => {
    const {
        antallTimerForTimelonnet,
        permisjonPermittering,
        utenlandsopphold,
        arbeidsavtaler,
    } = arbeidsforhold;

    const tabsData: {
        label: string;
        TabComponent: React.FunctionComponent;
    }[] = [];

    if (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.timerfortimelonnet,
            TabComponent: () => (
                <Timer timer={antallTimerForTimelonnet} locale={locale} />
            ),
        });
    }
    if (permisjonPermittering && permisjonPermittering.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.permisjonpermittering,
            TabComponent: () => (
                <Permisjon
                    permisjoner={permisjonPermittering}
                    locale={locale}
                />
            ),
        });
    }
    if (utenlandsopphold && utenlandsopphold.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.arbeidiutlandet,
            TabComponent: () => (
                <Utenlandsopphold
                    utenlandsopphold={utenlandsopphold}
                    locale={locale}
                />
            ),
        });
    }
    if (arbeidsavtaler && arbeidsavtaler.length > 0) {
        tabsData.push({
            label: sprak[locale].tabs.historikk,
            TabComponent: () => (
                <Historikk arbeidsavtaler={arbeidsavtaler} locale={locale} />
            ),
        });
    }

    return tabsData;
};

export const DetaljertTabs = (props: Props) => {
    const [visTab, settVisTab] = useState(0);

    const tabsData = getTabsData(props);

    if (tabsData.length === 0) {
        return null;
    }

    const { TabComponent } = tabsData[visTab];

    return (
        <>
            <div className="af-detaljert__tabs">
                <Tabs
                    tabs={tabsData}
                    onChange={(
                        _event: SyntheticEvent<EventTarget, Event>,
                        index: number
                    ) => settVisTab(index)}
                />
            </div>
            <div className="af-detaljert__select">
                <hr className="af-detaljert__hr" />
                {tabsData.length > 1 ? (
                    <Select
                        label=""
                        onChange={(event) =>
                            settVisTab(Number(event.currentTarget.value))
                        }
                    >
                        {tabsData.map((tab, index) => (
                            <option key={tab.label} value={index}>
                                {tab.label}
                            </option>
                        ))}
                    </Select>
                ) : (
                    <Element>{tabsData[0].label}</Element>
                )}
            </div>
            <TabComponent />
        </>
    );
};
