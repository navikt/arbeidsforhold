import React from "react";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import { sortPeriodeFraDesc } from "../../../utils/date";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";
import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../DetaljertPDF";

interface Props {
  permisjoner: AFPermisjonPermittering[];
  locale: string;
}

const PermisjonPDF = (props: Props) => {
  const { locale } = props;

  props.permisjoner.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  return (
    <View style={pdfStyles.flexTable}>
      <View style={pdfStyles.flexRow}>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>{sprak[locale].type}</Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>{sprak[locale].periode}</Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.elementTitle}>{sprak[locale].prosent}</Text>
        </View>
      </View>
      {props.permisjoner.map((permisjon, i) => (
        <View key={`${i}`} style={pdfStyles.flexRow}>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.elementSubtitle}>{permisjon.type}</Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.elementSubtitle}>
              <CheckPeriodAndPrint data={permisjon.periode} />
            </Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.elementSubtitle}>{permisjon.prosent}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PermisjonPDF;
