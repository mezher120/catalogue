import './App.css';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Carrousel from './Components/Carrousel';
import Footer from './Components/Footer';
import Admin from './pages/Admin';
import { Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    async function getData() {
      try {
        const res = (await axios.get('http://localhost:3002/furniture')).data;
        dispatch({data: res, type: "GET_ALL"});
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[dispatch])

  return (
    <div>
        <Route exact path='/'>


          <Header></Header>

          <Navigation></Navigation>
          <Carrousel></Carrousel>
          <Home></Home>
          <Footer></Footer>

        </Route>

        <Route path='/admin'>
          <Admin></Admin>
        </Route>
    </div>
  );
}

export default App;
