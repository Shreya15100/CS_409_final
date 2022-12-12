import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import SignIn from './Components/sign-in';
import SignUp from './Components/sign-up';
import Home from './Components/home';
import Team from './Components/team';
import Player from './Components/player';
import User from './Components/user';
import UserPage from './Components/userpage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/teams" element={<Team/>} />
        <Route path="/players" element={<Player/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/userpage" element={<UserPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

