import React, { useState } from "react";
import Tabs from "nav-frontend-tabs";
import { Select } from "nav-frontend-skjema";
import { Element } from "nav-frontend-typografi";
import { AFUtvidet } from "../../types/arbeidsforhold";
import sprak from "../../language/provider";
import Timer from "./tabs/Timer";
import Permisjon from "./tabs/Permisjon";
import Utenlandsopphold from "./tabs/Utenlandsopphold";
import Historikk from "./tabs/Historikk";
import { useLocale } from "../common/useLocale";

type Props = {
  arbeidsforhold: AFUtvidet;
};

const getTabsData = ({ arbeidsforhold }: Props) => {
  const {
    antallTimerForTimelonnet,
    permisjonPermittering,
    utenlandsopphold,
    arbeidsavtaler,
  } = arbeidsforhold;

  const tabsData: {
    label: string;
    TabContent: React.FunctionComponent;
  }[] = [];

  const { locale } = useLocale();

  if (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.timerfortimelonnet,
      TabContent: () => (
        <Timer timer={antallTimerForTimelonnet} locale={locale} />
      ),
    });
  }
  if (permisjonPermittering && permisjonPermittering.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.permisjonpermittering,
      TabContent: () => (
        <Permisjon permisjoner={permisjonPermittering} locale={locale} />
      ),
    });
  }
  if (utenlandsopphold && utenlandsopphold.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.arbeidiutlandet,
      TabContent: () => (
        <Utenlandsopphold utenlandsopphold={utenlandsopphold} locale={locale} />
      ),
    });
  }
  if (arbeidsavtaler && arbeidsavtaler.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.historikk,
      TabContent: () => (
        <Historikk arbeidsavtaler={arbeidsavtaler} locale={locale} />
      ),
    });
  }

  return tabsData;
};

export const DetaljertTabs = (props: Props) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabsData = getTabsData(props);

  if (tabsData.length === 0) {
    return null;
  }

  const { TabContent } = tabsData[currentTabIndex];

  return (
    <>
      <div className="af-detaljert__tabs">
        <Tabs
          tabs={tabsData}
          onChange={(_event, index) => setCurrentTabIndex(index)}
        />
      </div>
      <div className="af-detaljert__select">
        <hr className="af-detaljert__hr" />
        {tabsData.length > 1 ? (
          <Select
            label=""
            onChange={(event) =>
              setCurrentTabIndex(Number(event.currentTarget.value))
            }
          >
            {tabsData.map((tab, index) => (
              <option key={index} value={index}>
                {tab.label}
              </option>
            ))}
          </Select>
        ) : (
          <Element>{tabsData[0].label}</Element>
        )}
      </div>
      <TabContent />
    </>
  );
};
