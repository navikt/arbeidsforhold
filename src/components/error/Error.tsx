import React from "react";
import AlertStripe from "nav-frontend-alertstriper";
import { sprak } from "../../language/provider";
import { useLocale } from "../../modules/common/useLocale";

export interface HTTPError {
  code: string;
  text: string;
}

interface Props {
  error: HTTPError;
}

export const Error = (props: Props) => {
  const { error } = props;
  const { locale } = useLocale();
  return error ? (
    <div className="error__container">
      <AlertStripe type="feil">
        {sprak[locale].httperror}
        <br />
        {error.code && <span>{`${error.code}: `}</span>}
        {error.text && <span>{`${error.text}`}</span>}
      </AlertStripe>
    </div>
  ) : null;
};
