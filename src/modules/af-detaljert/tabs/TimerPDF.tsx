import React from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  timer: AFTimerForTimelonnet[];
  locale: string;
}

const TimerPDF = (props: Props) => {
  const { locale } = props;

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

  const styles = StyleSheet.create({
    flexTable: {
      paddingVertical: 20,
      width: "100%",
    },
    flexSection: {
      paddingTop: 12,
    },
    flexRow: {
      flexDirection: "row",
    },
    flexColumn: {
      paddingVertical: 2,
      width: "33%",
    },
    title: {
      fontWeight: "bold",
      fontSize: 12,
    },
    subtitle: {
      paddingTop: 2.5,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.flexTable}>
      <View style={styles.flexRow}>
        <View style={styles.flexColumn}>
          <Element>
            <Text style={styles.title}>
              {sprak[locale].rapporteringsperiode}
            </Text>
          </Element>
        </View>
        <View style={styles.flexColumn}>
          <Element>
            <Text style={styles.title}>{sprak[locale].opptjeningsperiode}</Text>
          </Element>
        </View>
        <View style={styles.flexColumn}>
          <Element>
            <Text style={styles.title}>{sprak[locale].antalltimer}</Text>
          </Element>
        </View>
      </View>
      {Object.keys(data)
        .reverse()
        .map((year) => {
          const value = data[year];
          return (
            <View key={year} style={styles.flexSection}>
              <View key={year} style={styles.flexRow}>
                <View style={styles.flexColumn}>
                  <Text style={styles.title}>{year}</Text>
                </View>
                <View style={styles.flexColumn} />
                <View style={styles.flexColumn} />
              </View>
              {value.timerObjekt.map((time, i) => (
                <View key={`${i}`} style={styles.flexRow}>
                  <View style={styles.flexColumn}>
                    <Text style={styles.subtitle}>
                      {time.periode && (
                        <CheckDateAndPrint
                          data={time.rapporteringsperiode}
                          dateFormat="MMMM"
                        />
                      )}
                    </Text>
                  </View>
                  <View style={styles.flexColumn}>
                    <Text style={styles.subtitle}>
                      <CheckPeriodAndPrint data={time.periode} />
                    </Text>
                  </View>
                  <View style={styles.flexColumn}>
                    <Text style={styles.subtitle}>
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

export default TimerPDF;
