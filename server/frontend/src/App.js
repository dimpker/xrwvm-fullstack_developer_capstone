import LoginPanel from "./components/Login/Login"
import Register from "./components/Register/Register"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Home from "./components/Home/Home"
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"
import { Routes, Route } from "react-router-dom";
import Dealers from './components/Dealers/Dealers';
import Dealer from "./components/Dealers/Dealer"
import PostReview from "./components/Dealers/PostReview"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
      <Route path="/login" element={<ErrorBoundary><LoginPanel /></ErrorBoundary>} />
      <Route path="/dealers" element={<ErrorBoundary><Dealers /></ErrorBoundary>} />
      <Route path="/dealer/:id" element={<ErrorBoundary><Dealer/></ErrorBoundary>} />
      <Route path="/postreview/:id" element={<ErrorBoundary><PostReview/></ErrorBoundary>} />
      <Route path="/register" element={<ErrorBoundary><Register /></ErrorBoundary>} />
      <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
      <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
    </Routes>
  );
}
export default App;
