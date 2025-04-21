import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Usuarios from "./pages/Usuarios/Usuarios";
import { ScrollToTop } from "./components/common/ScrollToTop";
import {ToastContainer} from "react-toastify";
import IconsList from "./pages/UiElements/IconsList.tsx";
import ClientesPage from "./pages/Clientes/ClientesPage.tsx";
//Inventario
import ProductosPage from "./pages/Almacen/ProductosPage.tsx";
import LotesPage from "./pages/Almacen/LotesPage.tsx";
import DespachosPage from "./pages/Almacen/DespachosPage.tsx";
import RecepcionesPage from "./pages/Almacen/RecepcionesPage.tsx";

export default function App() {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard Layout with nested routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/almacen" element={<ProductosPage/>} />
            <Route path="/lotes" element={<LotesPage/>} />
            <Route path="/despachos" element={<DespachosPage/>} />
            <Route path="/recepciones" element={<RecepcionesPage/>} />

            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/usuarios" element={<Usuarios/>}/>
            <Route path="/clientes" element={<ClientesPage/>}/>


            <Route path="/calendar" element={<Calendar />} />
            <Route path="/icons" element={<IconsList />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastClassName="z-[99999]"
        />
      </Router>
  );
}
