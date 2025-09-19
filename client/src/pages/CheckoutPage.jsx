import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const nav = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  if (!items.length) return "Warenkorb ist leer.";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        items: items.map(i => ({
          productId: i.product._id,
          title: i.product.title,
          price: i.product.price,
          quantity: i.quantity
        })),
        customer
      };
      await api.post("/orders", payload);
      clear();
      alert("Bestellung gesendet! (Simulation)");
      nav("/");
    } catch (err) {
      alert("Fehler beim Absenden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <h2>Lieferdetails</h2>
      <input placeholder="Name" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} required />
      <input placeholder="E-Mail" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
      <textarea placeholder="Adresse" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
      <button disabled={loading}>{loading ? "Sende..." : "Bestellung absenden"}</button>
    </form>
  );
}
