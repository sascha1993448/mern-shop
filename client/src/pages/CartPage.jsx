// src/pages/CartPage.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, remove, total } = useCart();

  if (!items.length) {
    return (
      <div>
        <p>Dein Warenkorb ist leer.</p>
        <Link to="/">Zurück zum Shop</Link>
      </div>
    );
  }

  return (
    <div>
      {items.map(({ product, quantity }) => (
        <div
          key={product._id}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
            borderBottom: "1px solid #eee",
            paddingBottom: 12
          }}
        >
          {/* Bild links – einheitlich und nicht verzerren */}
          <div style={{ width: 120, height: 120, flex: "0 0 120px" }}>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 8,
                  background: "#fff"
                }}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            )}
          </div>

          {/* Text + Button zusammen, Button direkt unter dem Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: 4 }}>
              <strong>{product.title}</strong> × {quantity} –{" "}
              {(product.price * quantity).toFixed(2)} CHF
            </div>
            <button
              onClick={() => remove(product._id)}
              style={{ padding: "6px 10px" }}
            >
              Entfernen
            </button>
          </div>
        </div>
      ))}

      <h3>Zwischensumme: {total.toFixed(2)} CHF</h3>
      <Link to="/checkout">
        <button style={{ padding: "8px 12px" }}>Zur Kasse</button>
      </Link>
    </div>
  );
}
