import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NoMatch from "./components/404/404";
import BasicTable from "./components/History/History";
import BarChart from "./components/Chart/BarChart"
import DriverManagement from "./components/DriverManagement/driver"
import ClientManagement from "./components/ClientManagement/client"
import Booking from "./components/Booking/Booking";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/client">
              <ClientManagement></ClientManagement>
            </Route>
            <Route path="/chart">
              <BarChart></BarChart>
            </Route>
            <PrivateRoute path="/booking/:transportationMedium">
              <Booking></Booking>
            </PrivateRoute>
            <Route path="/driver">
              <DriverManagement></DriverManagement>
            </Route>
            <Route path="/statistic">
              <BasicTable></BasicTable>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="*">
              <NoMatch></NoMatch>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
export default App;
