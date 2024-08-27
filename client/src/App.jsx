import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import ApplyCV from "./pages/ApplyCV";
import DownloadApp from "./pages/DownloadApp";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
import MyBookings from "./pages/MyBookings";
import ProfileLayout from "./components/layout/ProfileLayout";
import MyReviews from "./pages/MyReviews";
import MyBilling from "./pages/MyBilling";
import Tour from "./pages/Tour";
import ManageUsers from "./pages/ManageUsers";
import ManageBookings from "./pages/ManageBookings";
import ManageReviews from "./pages/ManageReviews";
import ManageTours from "./pages/ManageTours";
import { ModalsContextProvider } from "./Context/ModalsContext";
import UserSettings from "./pages/UserSettings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateTourPage from "./pages/CreateTourPage";
import UpdateTourPage from "./pages/UpdateTourPage";
import Protect from "./components/Auth/Protect";
import RestrictTo from "./components/Auth/RestrictTo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalsContextProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/:nameSlug" element={<Tour />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/successfull-payment" element={<Aboutus />} />
              <Route
                path="/tours/create-new"
                element={
                  <Protect>
                    <RestrictTo roles="admin">
                      <CreateTourPage />
                    </RestrictTo>
                  </Protect>
                }
              />
              <Route
                path="/tours/update/:tourId"
                element={
                  <Protect>
                    <RestrictTo roles="admin">
                      <UpdateTourPage />
                    </RestrictTo>
                  </Protect>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply-cv" element={<ApplyCV />} />
              <Route path="/download-app" element={<DownloadApp />} />
              <Route
                path="/user"
                element={
                  <Protect>
                    <RestrictTo roles="user">
                      <ProfileLayout />
                    </RestrictTo>
                  </Protect>
                }
              >
                <Route index element={<UserSettings />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="reviews" element={<MyReviews />} />
                <Route path="billing" element={<MyBilling />} />
              </Route>
              <Route
                path="/admin"
                element={
                  <Protect>
                    <RestrictTo roles="admin">
                      <ProfileLayout />
                    </RestrictTo>
                  </Protect>
                }
              >
                <Route index element={<UserSettings />} />

                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-bookings" element={<ManageBookings />} />
                <Route path="manage-reviews" element={<ManageReviews />} />
                <Route path="manage-tours" element={<ManageTours />} />
              </Route>
            </Route>
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 2500,
              },
              error: {
                duration: 4000,
              },
              style: {
                fontFamily: "Montserrat , sans-serif",
                maxWidth: "600px",
                padding: "16px 24px",
                backgroundColor: "#F7F6BB",
                color: "#114232",
                borderRadius: "10px",
              },
            }}
          />
        </BrowserRouter>
      </ModalsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
