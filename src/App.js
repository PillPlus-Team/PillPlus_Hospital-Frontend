import { BrowserRouter, Route } from 'react-router-dom';

import { LoginPage } from './page';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/login" component={LoginPage} />
            <Route
                exact
                path="/forgot-password"
                component={() => {
                    return <div className="flex justify-center items-center w-full h-screen text-2xl">หน้าลืมรหัสผ่าน</div>;
                }}
            />
        </BrowserRouter>
    );
};

export default App;
