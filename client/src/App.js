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
import AdminNavigationLeft from './Components/admin/AdminNavigationLeft';
import Navbar from './Components/admin/Navbar';
import BulkFurniture from './Components/admin/BulkFurniture';
import CreateFurniture from './Components/admin/CreateFurniture';


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
          <div className='appAdminWrapper'>

          <Navbar></Navbar>
          <div className='appAdminContainer'>
          <AdminNavigationLeft></AdminNavigationLeft>
          <Route exact path='/admin'>
          <Admin></Admin>
          </Route>
          <Route exact path='/admin/createnew'>
          <CreateFurniture></CreateFurniture>
          </Route>
          <Route exact path='/admin/uploadexcel'>
          <BulkFurniture></BulkFurniture>
          </Route>
          </div>
          </div>
        </Route>
    </div>
  );
}

export default App;
