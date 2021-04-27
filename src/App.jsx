import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import {
    LoginPage,
    HomePage,
    ProfilePage,
    SelectPillStorePage,
    PaymentPage,
    StatementPage,
    ManageAccountPage,
    ManagePillStorePage,
    ManagePillPage,
} from './pages';

import io from 'socket.io-client';
import { SOCKET_URL } from './config';

const socket = io(SOCKET_URL, { withCredentials: true });

const App = () => {
    const user = useSelector((state) => state.user);

    return (
        <BrowserRouter>
            {user && (
                <Switch>
                    <Route exact path="/home" component={HomePage} />

                    <Route exact path="/profile" component={ProfilePage} />

                    <Route exact path="/select-pillstore">
                        <SelectPillStorePage socket={socket} />
                    </Route>
                    <Route exact path="/payment">
                        <PaymentPage socket={socket} />
                    </Route>
                    <Route exact path="/statement" component={StatementPage} />

                    <Route exact path="/manage-account" component={ManageAccountPage} />
                    <Route exact path="/manage-pillstore" component={ManagePillStorePage} />
                    <Route exact path="/manage-pill" component={ManagePillPage} />

                    <Redirect to="/home" />
                </Switch>
            )}
            {!user && (
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route
                        exact
                        path="/forgot-password"
                        component={() => {
                            return <div className="flex justify-center items-center w-full h-screen text-2xl">หน้าลืมรหัสผ่าน</div>;
                        }}
                    />
                    <Redirect to="/login" />
                </Switch>
            )}
        </BrowserRouter>
    );
};

export default App;
