import React from "react";
import { Text } from "@react-pdf/renderer";

interface Props {
  isPdf?: boolean;
}

const NoData = (props: Props) => {
  return props.isPdf ? <Text> </Text> : <> </>;
};
export default NoData;
