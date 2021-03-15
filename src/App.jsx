import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { HomePage, LoginPage } from './pages';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route
                    exact
                    path="/forgot-password"
                    component={() => {
                        return <div className="flex justify-center items-center w-full h-screen text-2xl">หน้าลืมรหัสผ่าน</div>;
                    }}
                />
                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
