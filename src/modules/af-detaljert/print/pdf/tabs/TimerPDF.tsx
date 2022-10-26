import React from "react";
import { AFTimerForTimelonnet } from "../../../../../types/arbeidsforhold";
import { CheckAndPrint } from "../../../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../../../utils/date";
import moment from "moment";
import { CheckDateAndPrint } from "../../../../../components/check-date-and-print/CheckDateAndPrint";
import { CheckPeriodAndPrint } from "../../../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sprak } from "../../../../../language/provider";
import { Text, View } from "@react-pdf/renderer";
import { useLocale } from "../../../../common/useLocale";
import { pdfStyles } from "../../../../common/pdfStyles";

interface Props {
  timer: AFTimerForTimelonnet[];
}

export const TimerPDF = (props: Props) => {
  const { locale } = useLocale();

  props.timer.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  const data: {
    [key: string]: {
      timerObjekt: AFTimerForTimelonnet[];
    };
  } = {};

  props.timer.map((timerObjekt) => {
    const year = moment(timerObjekt.rapporteringsperiode).year();

    if (!data[year]) {
      data[year] = {
        timerObjekt: [timerObjekt],
      };
    } else {
      data[year].timerObjekt.push(timerObjekt);
    }
  });

  return (
    <View>
      <View>
        <View style={pdfStyles.tableTitle}>
          <Text style={pdfStyles.h2}>Timer for timelønnet</Text>
        </View>
        <View style={pdfStyles.flexRow}>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.h3}>
              {sprak[locale].rapporteringsperiode}
            </Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.h3}>{sprak[locale].opptjeningsperiode}</Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.h3}>{sprak[locale].antalltimer}</Text>
          </View>
        </View>
      </View>
      {Object.keys(data)
        .reverse()
        .map((year) => {
          const value = data[year];
          return (
            <View key={year} style={pdfStyles.flexSection}>
              <View style={pdfStyles.flexRow}>
                <View style={pdfStyles.flexColumn}>
                  <Text style={pdfStyles.h3}>{year}</Text>
                </View>
                <View style={pdfStyles.flexColumn} />
                <View style={pdfStyles.flexColumn} />
              </View>
              {value.timerObjekt.map((time, i) => (
                <View key={`${i}`} style={pdfStyles.flexRow}>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
                      {time.periode && (
                        <CheckDateAndPrint
                          data={time.rapporteringsperiode}
                          dateFormat="MMMM"
                        />
                      )}
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
                      <CheckPeriodAndPrint data={time.periode} />
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
                      <CheckAndPrint data={time.antallTimer} />
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
    </View>
  );
};
