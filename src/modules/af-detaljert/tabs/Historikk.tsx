import React, { Fragment, useState } from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { CheckAndPrint } from "../../../components/check-and-print/CheckAndPrint";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../../utils/date";
import { sprak } from "../../../language/provider";
import { ArbeidsavtaleFelter } from "../detaljer/ArbeidsavtaleFelter";
import { useLocale } from "../../common/useLocale";
import { ChevronUpIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

export const Historikk = (props: Props) => {
  const { locale } = useLocale();

  const sortedArbeidsavtaler = props.arbeidsavtaler
    .sort((left, right) =>
      sortPeriodeFraDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    )
    .sort((left, right) =>
      sortPeriodeTilDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    );

  const [data, setData] = useState(
    sortedArbeidsavtaler.map((arbeidsavtale) => ({
      arbeidsavtale: arbeidsavtale,
      ekspandert: false,
    }))
  );

  return (
    <div className="af-detaljert__tableWrapper">
      <table className="af-detaljert__tabs-innhold af-detaljert__table">
        <thead>
          <tr>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].yrke}
              </Heading>
            </th>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].periode}
              </Heading>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((innslag, counter) => {
            const { arbeidsavtale, ekspandert } = innslag;

            const onClick = () =>
              setData(
                data.map((values, i) =>
                  i === counter
                    ? { ...values, ekspandert: !data[i].ekspandert }
                    : values
                )
              );

            return (
              <Fragment key={counter}>
                <tr key={counter}>
                  <td>
                    <CheckAndPrint data={arbeidsavtale.yrke} />
                  </td>
                  <td>
                    <CheckPeriodAndPrint data={arbeidsavtale.gyldighetsperiode} />
                  </td>
                  <td>
                    <button
                      className="af-liste__ekspander"
                      onClick={onClick}
                    >
                      {!ekspandert ? (
                        <>
                          {sprak[locale].apne} <ChevronDownIcon />
                        </>
                      ) : (
                        <>
                          {sprak[locale].lukke} <ChevronUpIcon />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                {ekspandert && (
                  <tr>
                    <td colSpan={3}>
                      <ArbeidsavtaleFelter
                        data={arbeidsavtale}
                        isUtvidet={false}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
