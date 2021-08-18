import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Fade} from 'reactstrap';

import {
  Card,
  CardBody,
  EmptyLayout,
} from 'components';

import {useAuth} from "contexts/auth";
import AuthService from "services/AuthService";

import {HeaderAuth} from "routes/components/Pages/HeaderAuth";
import {LogoThemed} from "routes/components/LogoThemed/LogoThemed";

const Callback = () => {

  const [error, setError] = useState(null);
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => {
    if (!authTokens) {
      AuthService.callbackAuth().then((data) => {
        console.log(data);
        if (data) setAuthTokens(data);
        else setError(true);
      });
    }
  }, []);

  if (authTokens) return <Redirect to="/" />;
  if (error) return <Redirect to={"/login?error=" + error} />;

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <div className="mb-4 text-center">
          <Link className="d-inline-block" to="#">
            <LogoThemed checkBackground height="50"/>
          </Link>
        </div>
        <Card className="mb-3" type="border-dash">
          <CardBody>
            <Fade className="mt-3">
              <HeaderAuth
                title="Login to Management UI"
                text="Please wait, application is loading."/>
            </Fade>
          </CardBody>
        </Card>
      </EmptyLayout.Section>
    </EmptyLayout>
  );
};

export default Callback;
