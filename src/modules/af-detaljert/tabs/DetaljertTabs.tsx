import React, { useState } from "react";
import Tabs from "nav-frontend-tabs";
import { Select } from "nav-frontend-skjema";
import { Element } from "nav-frontend-typografi";
import { AFUtvidet } from "../../../types/arbeidsforhold";
import { useLocale } from "../../common/useLocale";
import sprak from "../../../language/provider";
import { TabContent } from "./TabContent";

export type DetaljertTabType =
  | "timer"
  | "permisjon"
  | "utenlandsopphold"
  | "historikk";

const getTabsData = (arbeidsforhold: AFUtvidet) => {
  const {
    antallTimerForTimelonnet,
    permisjonPermittering,
    utenlandsopphold,
    arbeidsavtaler,
  } = arbeidsforhold;

  const tabsData: {
    label: string;
    type: DetaljertTabType;
  }[] = [];

  const { locale } = useLocale();

  if (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.timerfortimelonnet,
      type: "timer",
    });
  }
  if (permisjonPermittering && permisjonPermittering.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.permisjonpermittering,
      type: "permisjon",
    });
  }
  if (utenlandsopphold && utenlandsopphold.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.arbeidiutlandet,
      type: "utenlandsopphold",
    });
  }
  if (arbeidsavtaler && arbeidsavtaler.length > 0) {
    tabsData.push({
      label: sprak[locale].tabs.historikk,
      type: "historikk",
    });
  }

  return tabsData;
};

type Props = {
  arbeidsforhold: AFUtvidet;
};

export const DetaljertTabs = ({ arbeidsforhold }: Props) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabsData = getTabsData(arbeidsforhold);

  if (tabsData.length === 0) {
    return null;
  }

  const { type } = tabsData[currentTabIndex];

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
      <TabContent arbeidsforhold={arbeidsforhold} type={type} />
    </>
  );
};
