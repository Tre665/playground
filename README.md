# Wetter-Widget-Projekt

Dieses Projekt implementiert ein Dashboard zur Anzeige von Wetter-Widgets für verschiedene Städte. Es besteht aus einem Next.js-Frontend und einem Fastify-Backend, die Wetterdaten von einer externen API abrufen, cachen und in einer MongoDB-Datenbank speichern.

---

## 📦 Projektstruktur

```
/project-root
├── frontend/                  → Next.js Frontend (Dashboard)
│   ├── public/                → Statische Assets (Bilder, Fonts etc.)
│   └── src/
│       ├── components/        → Wiederverwendbare React-Komponenten
│       ├── pages/             → Routenbasierte Seiten (Container)
│       ├── styles/            → Globale Stylesheets / Tailwind-Styles
│       ├── types/             → Typdefinitionen für TypeScript
│       └── utils/             → Hilfsfunktionen (z. B. Axios-Konfiguration)
├── backend/                   → Node.js Backend mit Fastify
│   ├── src/
│   │   ├── cache/             → Caching-Logik für externe APIs
│   │   ├── controllers/       → HTTP-Handler
│   │   ├── models/            → Datenmodelle und Mappings
│   │   ├── plugins/           → Fastify-Plugins
│   │   ├── routes/            → Routen-Definitionen
│   │   ├── services/          → Geschäftslogik (z. B. Wetterabrufe)
│   │   └── types/             → DTOs und Typdefinitionen
│   └── test/                  → Backend-spezifische Tests
│   └── app.ts                 → Fastify Instanz & App-Konfiguration
│   └── main.ts                → Backend-Startscript
└── README.md                  → Projektbeschreibung und Setup
```

---

## 🚀 Setup-Anleitung

### Voraussetzungen

- Node.js: v22 oder höher
- MongoDB: Lokal oder über MongoDB Atlas
- NPM: Als Paketmanager
- OpenWeather API-Key: Für Wetterdaten (siehe [OpenWeather API](https://openweathermap.org/api))

### 1. Backend starten

```bash
# Ins Backend-Verzeichnis wechseln
cd backend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Backend-Konfiguration:  
Eine `.env`-Datei im `backend`-Verzeichnis mit folgendem Inhalt erstellen:

```
NODE_ENV=development
HOST=localhost
PORT=5000
MONGODB_URI=<mongodb-connection-string>
MONGODB_DB=weather-widgets
OPEN_WEATHER_API_KEY=<your-openweather-api-key>
# Cache-TTL: 5 Minuten (5 * 60 * 1000)
CACHE_TTL=300000
```

Das Backend ist standardmäßig unter `http://localhost:5000` erreichbar.

### 2. Frontend starten

```bash
# Ins Frontend-Verzeichnis wechseln
cd frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Frontend-Konfiguration:  
Eine `.env.local`-Datei im `frontend`-Verzeichnis mit folgendem Inhalt erstellen:

```
NEXT_PUBLIC_API_BASE_URI=http://localhost:5000
```

Das Frontend ist standardmäßig unter `http://localhost:3000` erreichbar.

---

## 🔍 Funktionale Beschreibung

### Frontend (Dashboard)

- Entwickelt mit Next.js und dem Pages Router.
- Komponentenbasierte Architektur mit Container/Presentation Pattern.
- Container-Komponente: `src/pages/dashboard` – Verwaltet die Logik des Dashboards.
- Präsentationskomponenten: Im `src/components`-Ordner – Zuständig für die Darstellung von Widgets.
- Funktionen: Erstellen, Anzeigen und Löschen von Widgets für Städte.
- Keine Authentifizierung erforderlich.

### Backend (API)

- Entwickelt mit Fastify in einer MVC-Struktur:
  - `models`: Datenstrukturen und Mappings für MongoDB.
  - `routes`: Definition der API-Endpunkte.
  - `controllers`: HTTP-Request-Handling.
  - `services`: Geschäftslogik, z. B. Abruf von Wetterdaten.
  - `cache`: In-Memory-Caching für Wetterdaten (TTL: 5 Minuten).
  - `types`: DTOs und Typdefinitionen für saubere Datenübergabe.
  - `plugins`: Fastify-spezifische Plugins.
- Wetterdaten werden über die OpenWeather API abgerufen und für 5 Minuten gecacht.

#### Verfügbare API-Endpunkte

| Methode | Endpoint               | Beschreibung                                                                     |
| ------- | ---------------------- | -------------------------------------------------------------------------------- |
| GET     | `/widgets`             | Liste aller Widgets mit Wetterdaten                                              |
| POST    | `/widgets`             | Neues Widget erstellen (benötigt `location`)                                     |
| DELETE  | `/widgets/:id`         | Widget anhand der ID löschen                                                     |
| GET     | `/locations?query=...` | Geokoordinaten für eine Stadt (Query-Parameter `query` erforderlich) zurückgeben |

---

## ☁️ Wetterdaten

- Wetterdaten werden von [OpenWeather](https://openweathermap.org/api) abgerufen.
- Caching erfolgt im Backend, um API-Aufrufe zu minimieren (TTL: 5 Minuten).

---

## 🧪 Architekturüberblick

Das Projekt folgt einer klaren Trennung von Frontend und Backend:

- Frontend: Next.js mit Pages Router, komponentenbasiert (Container/Presentation Pattern).
- Backend: Fastify mit MVC-Struktur, MongoDB für persistente Speicherung und In-Memory-Caching für externe API-Daten.
- Kommunikation: Das Frontend kommuniziert über REST-API mit dem Backend (`http://localhost:5000`).
- Datenfluss:
  1. Benutzer sucht nach Städten.
  2. Benuter erstellt Widgets für die gefundenen Städte.
  3. Widgets werden in der Datenbank mit geolocation-Informationen gespeichert.
  4. Das Backend verarbeitet Anfragen, speichert Widgets in MongoDB und ruft Wetterdaten von OpenWeather ab (mit Caching).

---

## 🧾 Hinweise

- Das Projekt ist noch nicht feature-complete, die grundlegende Funktionalität (Widget-Erstellung, -Anzeige, -Löschung) ist jedoch umgesetzt.
- Fehlerbehandlung, Validierung und Logging sind bislang nur rudimentär implementiert.
- Das Layout der Dashboard-Seite ist responsive und passt sich an verschiedene Bildschirmgrößen an.
- Die Städtesuche wurde mit einem Typeahead-Control inklusive Eingabe-Debouncing realisiert.
- Zukünftige Erweiterungen könnten Authentifizierung oder zusätzliche Widget-Optionen umfassen.
- Der Code ist modular strukturiert, um Erweiterbarkeit und Wartbarkeit zu gewährleisten.
- Es wurde darauf geachtet, möglichst wenige externe Bibliotheken zu verwenden, um die Komplexität gering zu halten.

## ⚙️ Alternativen

- Da Backend und Frontend im selben Repository liegen, wäre der Einsatz eines Monorepo-Tools wie [Nx](https://nx.dev) denkbar. Dies könnte die Struktur klarer aufteilen, Abhängigkeiten besser verwalten und Code-Sharing erleichtern.
- Statt der aktuellen MVC-Struktur könnte eine Feature-basierte Trennung sinnvoll sein, wodurch Controller, Models und Services besser wiederverwendbar würden.
