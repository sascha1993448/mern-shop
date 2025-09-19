import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import { CartProvider, useCart } from "./context/CartContext.jsx";

function Nav() {
  const { count } = useCart();
  return (
    <nav className="top-nav">
      <Link to="/">Shop</Link>
      <Link to="/cart">Warenkorb ({count})</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}


export default function App() {
  return (
    <CartProvider>
      <Nav />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminProducts />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

