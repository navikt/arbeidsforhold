import React from "react";
import { Alert } from "@navikt/ds-react";
import { sprak } from "../../language/provider";
import { useLocale } from "../../modules/common/useLocale";

export interface HTTPError {
  code: string;
  text: string;
}

interface Props {
  error: HTTPError;
}

export const ErrorMessage = (props: Props) => {
  const { error } = props;
  const { locale } = useLocale();
  return error ? (
    <div className="error__container">
      <Alert role="alert" variant="error">
        {sprak[locale].httperror}
        <br />
        {error.code && <span>{`${error.code}: `}</span>}
        {error.text && <span>{`${error.text}`}</span>}
      </Alert>
    </div>
  ) : null;
};
