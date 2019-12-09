import React from "react";
import AlertStripe from "nav-frontend-alertstriper";
import { sprak } from "../../language/provider";

export interface HTTPError {
  code: string;
  text: string;
}

interface Props {
  error: HTTPError;
  locale: string;
}

const Error = (props: Props) => {
  const { error } = props;
  return error ? (
    <div className="error__container">
      <AlertStripe type="feil">
        {sprak[props.locale].httperror}
        <br />
        {error.code && <span>{`${error.code}: `}</span>}
        {error.text && <span>{`${error.text}`}</span>}
      </AlertStripe>
    </div>
  ) : null;
};

export default Error;
