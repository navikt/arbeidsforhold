import React from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";
import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../../common/pdf";
import { useLocale } from "../../common/useLocale";

interface Props {
  utenlandsopphold: AFUtenlandsopphold[];
}

const UtenlandsoppholdPDF = (props: Props) => {
  const { locale } = useLocale();

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
    <View wrap={false}>
      <View>
        <View style={pdfStyles.tableTitle}>
          <Text style={pdfStyles.h2}>Arbeid i utlandet</Text>
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
            <Text style={pdfStyles.h3}>{sprak[locale].land}</Text>
          </View>
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
                  <Text style={pdfStyles.h3}>{year}</Text>
                </View>
                <View style={pdfStyles.flexColumn} />
                <View style={pdfStyles.flexColumn} />
              </View>
              {value.opphold.map((time, i) => (
                <View key={`${i}`} style={pdfStyles.flexRow}>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
                      <CheckDateAndPrint
                        data={time.periode.periodeFra}
                        dateFormat="MMMM"
                      />
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
                      <CheckPeriodAndPrint data={time.periode} />
                    </Text>
                  </View>
                  <View style={pdfStyles.flexColumn}>
                    <Text style={pdfStyles.normaltekst}>
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
