import { useEffect, useState } from "react"; 
import { api } from "../api";

export default function AdminProducts() {
  const empty = { title: "", description: "", price: 0, imageUrl: "", stock: 0 };
  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.get("/products").then(res => setList(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/products/${editingId}`, form);
    } else {
      await api.post("/products", form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const edit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description || "",
      price: p.price,
      imageUrl: p.imageUrl || "",
      stock: p.stock ?? 0
    });
  };

  const del = async (id) => { await api.delete(`/products/${id}`); load(); };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <h2>{editingId ? "Produkt bearbeiten" : "Neues Produkt"}</h2>
        <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
          <input
            placeholder="Titel"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Beschreibung"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preis"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <input
            placeholder="Bild-URL"
            value={form.imageUrl}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input
            type="number"
            placeholder="Lager"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button>{editingId ? "Speichern" : "Anlegen"}</button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm(empty); }}
              >
                Abbrechen
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2>Produkte</h2>
        {list.map(p => (
          <div
            key={p._id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: 8
            }}
          >
            {/* Einheitlicher Bild-Container */}
            <div style={{ width: 120, height: 120, flex: "0 0 120px" }}>
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: 6,
                    background: "#fff"
                  }}
                  onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <strong>{p.title}</strong> – {p.price.toFixed(2)} CHF{" "}
              (Lager: {p.stock ?? "—"})
            </div>

            <button onClick={() => edit(p)}>Bearbeiten</button>
            <button style={{ marginLeft: 8 }} onClick={() => del(p._id)}>Löschen</button>
          </div>
        ))}
      </div>
    </div>
  );
}
