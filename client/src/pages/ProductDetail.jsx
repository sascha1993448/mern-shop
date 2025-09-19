import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setP(res.data));
  }, [id]);

  if (!p) return "Lade...";

  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      {p.imageUrl && (
        <img
          src={p.imageUrl}
          alt={p.title}
          style={{
            width: "100%",
            height: 320,          // etwas größer als auf der Homepage
            objectFit: "contain",
            display: "block",
            borderRadius: 8,
            background: "#fff"
          }}
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />
      )}
      <div>
        <h2>{p.title}</h2>
        <p>{p.description}</p>
        <p><strong>{p.price.toFixed(2)} CHF</strong></p>
        <button onClick={() => add(p)} style={{ padding: "8px 12px" }}>
          In den Warenkorb
        </button>
      </div>
    </div>
  );
}
