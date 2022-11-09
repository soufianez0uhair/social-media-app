import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import SplitScreen from "./layout/SplitScreen";
import AuthImg from "./components/AuthImg";

import PartyImg from './assets/pexels-wendy-wei-1540406.jpg';
import CoupleImg from './assets/pexels-monstera-5876454.jpg';

const App = () => {
  return (
    <main className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<SplitScreen leftWidth={1} rightWidth={2} >
            <AuthImg img={PartyImg} />
            <Register />
          </SplitScreen>} />
          <Route path="/login" element={<SplitScreen leftWidth={1} rightWidth={2} >
            <AuthImg img={CoupleImg} />
            <Login />
          </SplitScreen>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App;