import { Route, Routes } from "react-router-dom";

// Components
import MyNavbar from "./component/navbar";

// pages
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ListingPage from "./pages/list";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/home";
import BookDetailsPage from "./pages/details";
import ViewOrders from "./pages/viewOrders";
import ViewOrdersDetails from "./pages/viewOrderDetails";
import { useFirebase } from "./context/firebase";
function App() {
  const firebase = useFirebase();

  return (
    <div className={firebase.isLoggedIn ? "" : "fullBackground"}>
      {firebase.isLoggedIn ? (
        <div>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/book/list" element={<ListingPage />} />
            <Route path="/book/view/:prodId" element={<BookDetailsPage />} />
            <Route path="/book/orders" element={<ViewOrders />} />
            <Route
              path="/book/orders/:bookId"
              element={<ViewOrdersDetails />}
            />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
