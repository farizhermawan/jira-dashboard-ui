import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {Fade} from 'reactstrap';

import {
  Button,
  Card,
  CardBody,
  EmptyLayout,
  Form,
} from 'components';

import {useAuth} from "contexts/auth";
import AuthService from "services/AuthService";

import {HeaderAuth} from "routes/components/Pages/HeaderAuth";
import {LogoThemed} from "routes/components/LogoThemed/LogoThemed";

const Login = () => {
  const { authTokens } = useAuth();

  if (authTokens) return <Redirect to="/"/>;

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
                text={"Please continue with your traveloka account"}
              />
              <Form className="mb-3">
                <Button color="youtube" block onClick={() => AuthService.signInWithGoogle()}>
                  <i className="fa fa-google mr-2"/>
                  Login with Google
                </Button>
              </Form>
            </Fade>
          </CardBody>
        </Card>
      </EmptyLayout.Section>
    </EmptyLayout>
  );
};

export default Login;
