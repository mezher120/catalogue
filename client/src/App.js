import './App.css';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Carrousel from './Components/Carrousel';
import Footer from './Components/Footer';
import Admin from './pages/Admin';
import { Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AdminNavigationLeft from './Components/admin/AdminNavigationLeft';
import Navbar from './Components/admin/Navbar';
import BulkFurniture from './Components/admin/BulkFurniture';
import CreateFurniture from './Components/admin/CreateFurniture';
import OutStanding from './Components/admin/OutStanding';
import Login from './pages/Login';
import Cover from './Components/admin/Cover';
import Theme from './Components/admin/Theme';


function App() {

  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const color = useSelector(state => state.color);
  const category = useSelector(state => state.categorySelected);

  useEffect(() => {

    async function getData() {
      try {
        const res = (await axios.get('http://localhost:3002/furniture')).data;
        dispatch({data: res, type: "GET_ALL"});
        console.log("getAll")
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[dispatch])

  useEffect(() => {

    async function getColor() {
      try {
        const res = (await axios.get('http://localhost:3002/colors')).data;
        let colorDB = res[0].name;
        console.log(res)
        let color = document.querySelector(':root')
          if (colorDB === 'gray') {
            color.style.setProperty('--primary', '#8D8279'); 
          } else if (colorDB === 'black') {
            color.style.setProperty('--primary', 'black'); 
          } else {
            color.style.setProperty('--primary', 'rgb(220, 117, 62)'); 
          }
        dispatch({data: colorDB, type: "GET_COLOR"});
        // console.log("getAll")
      } catch (error) {
        console.log(error)
      }
    }
    getColor();
  },[dispatch])


  return (

    <div>
        <Route exact path='/'>

          <Header></Header>

          <Navigation></Navigation>
          {!category && <Carrousel></Carrousel>}
          <Home category={category}></Home>
          <Footer></Footer>

        </Route>
       


        <Route path='/admin'>
          {!user ? <Login></Login> :
          
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
          <Route exact path='/admin/outstanding'>
          <OutStanding></OutStanding>
          </Route>
          <Route exact path='/admin/cover'>
            <Cover></Cover>
          </Route>
          <Route exact path='/admin/theme'>
            <Theme></Theme>
          </Route>
          </div>
          </div>
          }
        </Route>
    </div>
  );
}

export default App;
