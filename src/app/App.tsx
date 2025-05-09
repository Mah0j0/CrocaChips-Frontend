import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/AuthPages/SignIn.tsx";
import SignUp from "../pages/AuthPages/SignUp.tsx";
import NotFound from "../pages/OtherPage/NotFound.tsx";
import UserProfiles from "../pages/UserProfiles.tsx";
import Videos from "../pages/UiElements/Videos.tsx";
import Images from "../pages/UiElements/Images.tsx";
import Alerts from "../pages/UiElements/Alerts.tsx";
import Badges from "../pages/UiElements/Badges.tsx";
import Avatars from "../pages/UiElements/Avatars.tsx";
import Buttons from "../pages/UiElements/Buttons.tsx";
import LineChart from "../pages/Charts/LineChart.tsx";
import BarChart from "../pages/Charts/BarChart.tsx";
import Calendar from "../pages/Calendar.tsx";
import BasicTables from "../pages/Tables/BasicTables.tsx";
import FormElements from "../pages/Forms/FormElements.tsx";
import Blank from "../pages/Blank.tsx";
import AppLayout from "../shared/layout/AppLayout.tsx";
import Home from "../pages/Dashboard/Home.tsx";
import Usuarios from "../pages/Usuarios/Usuarios.tsx";
import { ScrollToTop } from "../shared/ui/common/ScrollToTop.tsx";
import {ToastContainer} from "react-toastify";
import IconsList from "../pages/UiElements/IconsList.tsx";
import ClientesPage from "../pages/Clientes/ClientesPage.tsx";
//Inventario
import ProductosPage from "../pages/Almacen/ProductosPage.tsx";
import LotesPage from "../pages/Almacen/LotesPage.tsx";
import DespachosPage from "../pages/Almacen/DespachosPage.tsx";
import RecepcionesPage from "../pages/Almacen/RecepcionesPage.tsx";
import VentasPage from "../pages/Ventas/VentasPage.tsx";

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
            <Route path="/ventas" element={<VentasPage/>} />

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
