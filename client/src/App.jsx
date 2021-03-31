import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Login, Register, Dashboard, PassRecover } from 'pages';
import { PrivateRoute } from 'utils';
import { OrgProfileProvider } from 'contexts';
import { Path } from 'routes';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Path.root()} render={() => <Redirect to={Path.login()} /> } />
        <Route path={Path.login()} component={Login} />
        <Route path={Path.passwordRecover()} component={PassRecover} />
        <Route path={Path.register()} component={Register} />
      </Switch>
      
        <OrgProfileProvider>
          <Switch>
            <PrivateRoute path={Path.home()} component={Dashboard} />
          </Switch>
        </OrgProfileProvider>
    </BrowserRouter>
  );
}
