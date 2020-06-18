import React from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";
import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../DetaljertPDF";

interface Props {
  utenlandsopphold: AFUtenlandsopphold[];
  locale: string;
}

const UtenlandsoppholdPDF = (props: Props) => {
  const { locale } = props;

  props.utenlandsopphold.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  const data: {
    [key: string]: {
      opphold: AFUtenlandsopphold[];
    };
  } = {};

  props.utenlandsopphold.map((opphold) => {
    const year = moment(opphold.periode.periodeFra).year();

    if (!data[year]) {
      data[year] = {
        opphold: [opphold],
      };
    } else {
      data[year].opphold.push(opphold);
    }
  });

  return (
    <View style={pdfStyles.flexTable}>
      <View style={pdfStyles.flexRow}>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>
            {sprak[locale].rapporteringsperiode}
          </Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>
            {sprak[locale].opptjeningsperiode}
          </Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>
            {sprak[locale].antalltimer}
          </Text>
        </View>
      </View>
      {Object.keys(data)
        .reverse()
        .map((year) => {
          const value = data[year];
          return (
            <View key={year} style={pdfStyles.flexSection} wrap={false}>
              <View style={pdfStyles.flexRow}>
                <View style={pdfStyles.flexColumn}>
                  <Text style={pdfStyles.elementTitle}>{year}</Text>
                </View>
                <View style={pdfStyles.flexColumn} />
                <View style={pdfStyles.flexColumn} />
              </View>
              {value.opphold.map((time, i) => (
                <View key={`${i}`} style={pdfStyles.flexRow}>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.elementSubtitle}>
                      <CheckDateAndPrint
                        data={time.periode.periodeFra}
                        dateFormat="MMMM"
                      />
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.elementSubtitle}>
                      <CheckPeriodAndPrint data={time.periode} />
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.elementSubtitle}>
                      <CheckAndPrint data={time.land} />
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

export default UtenlandsoppholdPDF;
