import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { LoginPage, HomePage, ProfilePage, ManageAccountPage } from './pages';

const RequiredLogin = ({ children }) => {
    const history = useHistory();
    const user = useSelector((state) => state.user);
    if (!user) {
        history.push('/login');
    }

    return <>{children}</>;
};

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <RequiredLogin>
                    <Switch>
                        <Route exact path="/home" component={HomePage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/manage-account" component={ManageAccountPage} />
                        <Route
                            exact
                            path="/forgot-password"
                            component={() => {
                                return <div className="flex justify-center items-center w-full h-screen text-2xl">หน้าลืมรหัสผ่าน</div>;
                            }}
                        />
                        <Redirect to="/home" />
                    </Switch>
                </RequiredLogin>
                <Redirect to="/login" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
