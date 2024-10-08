import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import { adminRoutes, publicRoutes, tutorRoutes, UnLayoutRoutes } from "./routes/Routes";
import ClientLayout from "./layout/ClientLayout";
import PAGES from "./utils/pages";
import 'react-image-crop/dist/ReactCrop.css'
import { useEffect } from "react";
import services from "./plugins/services";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { setUserInformation } from "./redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TutorLayout from "./layout/TutorLayout";
import { setTutorInformation, tutorInfor } from "./redux/features/tutorSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) return;
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    if (userId) {
      getUserInformation(userId, decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    }
  }, [])

  const getUserInformation = async (userId, roles) => {
    try {
      services.UserManagementAPI.getUserById(userId, (res) => {
        if (roles.includes("Parent")) {
          dispatch(setUserInformation(res.result))
        } else if (roles.includes("Tutor")) {
          dispatch(setTutorInformation(res.result))
        }
      }, (error) => {
        console.log(error);
      }
      )
    } catch (error) {
      console.log(error);
    }
  }
  console.log(useSelector(tutorInfor));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={PAGES.ROOT + PAGES.HOME} />} />

          {UnLayoutRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route path="/autismedu" element={<ClientLayout />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="/autismtutor" element={<TutorLayout />}>
            {tutorRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
