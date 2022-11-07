// import { BrowserRouter, Route , Routes } from 'react-router-dom'

import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: '#FFFFFF',
      minHeight: '100vh',
    },
  }))
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
