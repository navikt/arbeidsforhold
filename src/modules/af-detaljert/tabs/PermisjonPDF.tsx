import React from "react";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import { sortPeriodeFraDesc } from "../../../utils/date";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";
import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../../common/pdf-styles";

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
          <Text style={pdfStyles.h3}>{sprak[locale].type}</Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.h3}>{sprak[locale].periode}</Text>
        </View>
        <View style={pdfStyles.flexColumn}>
          <Text style={pdfStyles.h3}>{sprak[locale].prosent}</Text>
        </View>
      </View>
      {props.permisjoner.map((permisjon, i) => (
        <View key={`${i}`} style={pdfStyles.flexRow} wrap={false}>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.normaltekst}>{permisjon.type}</Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.normaltekst}>
              <CheckPeriodAndPrint data={permisjon.periode} />
            </Text>
          </View>
          <View style={pdfStyles.flexColumn}>
            <Text style={pdfStyles.normaltekst}>{permisjon.prosent}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PermisjonPDF;