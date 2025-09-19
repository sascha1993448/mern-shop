// ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

// 💡 Helper: liest Lagerbestand aus verschiedenen möglichen Feldnamen
function getStock(p) {
  return (
    p?.stock ??
    p?.quantity ??
    p?.countInStock ??
    p?.inventory ??
    null
  );
}

export default function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setData(res.data));
  }, []);

  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {data.map(p => {
        const stock = getStock(p);
        return (
          <div key={p._id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                loading="lazy"
                style={{ width: "100%", height: 240, objectFit: "contain", display: "block", borderRadius: 6 }}
                onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
              />
            )}

            <h3>{p.title}</h3>
            <p style={{ color: "#555" }}>{p.description}</p>
            <strong>{p.price.toFixed(2)} CHF</strong>

            {/* Lagerbestand anzeigen, wenn vorhanden */}
            <div style={{ marginTop: 4, color: "#444", fontSize: 14 }}>
              {stock === null ? "Lager: —" : `Lager: ${stock}`}
            </div>

            <div style={{ marginTop: 8 }}>
              <Link to={`/product/${p._id}`}>Details</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
