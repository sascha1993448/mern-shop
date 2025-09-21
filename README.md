# MERN Webshop

Ein kleiner Webshop, umgesetzt mit dem **MERN-Stack** (MongoDB, Express.js, React, Node.js).  
Benutzer können Produkte ansehen, in einen Warenkorb legen und eine Bestellung absenden.  
Produkte und Bestellungen werden in einer MongoDB gespeichert.

---

## Features
- **Produkte ansehen** (Liste und Detailansicht)
- **Warenkorb** (Client-seitig mit React Context)
- **Bestellung absenden** (Speicherung in MongoDB)
- **Einfache Produktverwaltung** (CRUD über Admin-Seite oder Postman)

---

## Voraussetzungen
- Node.js (>= 18)
- MongoDB (lokal oder in der Cloud, z. B. MongoDB Atlas)

---

## Installation

1. Repository klonen:
   ```bash
   git clone <repo-url>
   cd mern-shop
   ```

2. Abhängigkeiten installieren:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. `.env` im **server**-Ordner anlegen:
   ```env
   MONGODB_URI=mongodb://localhost:27017/webshop
   PORT=4000
   ```

---

## Starten

### Backend
```bash
cd server
npm run dev
```
Läuft auf: [http://localhost:4000](http://localhost:4000)

### Frontend
```bash
cd client
npm run dev
```
Läuft auf: [http://localhost:5173](http://localhost:5173)

---

## Projektstruktur
```
mern-shop/
│
├── client/          # React-Frontend
│   └── src/
│       ├── pages/   # ProductList, ProductDetail, CartPage, CheckoutPage, AdminProducts
│       ├── context/ # CartContext
│       └── index.css
│
├── server/          # Express-Backend
│   ├── models/      # Mongoose Schemas (Product, Order)
│   ├── routes/      # API-Routen
│   └── index.js     # Serverstart
│
└── README.md
```

---

## Ausblick
Mögliche Erweiterungen:
- Benutzer-Login & Authentifizierung
- Echte Zahlungsanbindung
- Umfangreicheres Admin-Interface
- Deployment (z. B. Vercel für Frontend, Render/Heroku für Backend)
