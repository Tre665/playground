# Wetter-Widget-Projekt

Dieses Projekt implementiert ein Dashboard zur Anzeige von Wetter-Widgets für verschiedene Städte. Es besteht aus einem Next.js-Frontend und einem Fastify-Backend, die Wetterdaten von einer externen API abrufen, cachen und in einer MongoDB-Datenbank speichern.

---

## 📦 Projektstruktur

```
/project-root
├── frontend/                  → Next.js Frontend (Dashboard)
│   ├── public/                → Statische Assets (Bilder, Fonts etc.)
│   └── src/
│       ├── components/        → Wiederverwendbare React-Komponenten (Presentation)
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
│   ├── test/                  → Backend-spezifische Tests (tbd)
│   ├── app.ts                 → Fastify-Instanz & App-Konfiguration
│   └── main.ts                → Backend-Startscript
└── README.md                  → Projektbeschreibung und Setup
```

---

## 🚀 Setup-Anleitung

### Voraussetzungen

- Node.js: v22 (LTS) oder höher
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
_Eine `.env`-Datei für die Demo wird gesondert bereitgestellt_

Für eine eigene Konfiguration eine `.env`-Datei im `backend`-Verzeichnis mit folgendem Inhalt erstellen:

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
_Eine `.env`-Datei für die Demo wird gesondert bereitgestellt_

Für eine eigene Konfiguration eine `.env.local`-Datei im `frontend`-Verzeichnis mit folgendem Inhalt erstellen:

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
- Tailwind für Styling
- Funktionen: Erstellen, Anzeigen und Löschen von WeatherWidgets für beliebige Städte.
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
- Caching erfolgt im Backend, um API-Aufrufe zu minimieren (TTL: 5 Minuten, konfigurierbar).

---

## 🧪 Architekturüberblick

Das Projekt folgt einer klaren Trennung von Frontend und Backend:

- Frontend: Next.js mit Pages Router, komponentenbasiert (Container/Presentation Pattern).
- Backend: Fastify mit MVC-Struktur, MongoDB für persistente Speicherung und In-Memory-Caching für externe API-Daten.
- Kommunikation: Das Frontend kommuniziert über REST-API mit dem Backend (`http://localhost:5000`).
- Datenfluss:
  1. Benutzer sucht über das Dashboard nach Städten (via `/locations`).
  2. Er wählt Städte aus und erstellt daraus Wetter-Widgets (`POST /widgets`).
  3. Die Widget-Daten inkl. Geolocation werden in MongoDB gespeichert.
  4. Bei Abruf (`GET /widgets`) lädt das Backend die gespeicherten Einträge, ergänzt sie ggf. mit aktuellen Wetterdaten von OpenWeather (mit Cachin) und sendet die angereicherten Daten an das Frontend zurück.
  5. Benutzer kann widgets via click löschen (`DELETE /widgets/:id`).

---

## 🧾 Hinweise

- Das Projekt ist noch nicht feature-complete. Die grundlegende Funktionalität wie das Erstellen, Anzeigen und Löschen von Widgets ist jedoch umgesetzt.
- Fehlerbehandlung, Validierung und Logging sind bisher nur in einfacher Form vorhanden.
- Insbesondere im Backend ist eine zuverlässige Validierung notwendig und sollte bei einer Weiterentwicklung zwingend berücksichtigt werden.
- Aktuell sind keine automatisierten Tests vorhanden. Unit- und Integrationstests sollten ergänzt werden.
- Eine Internationalisierung (i18n) ist derzeit nicht umgesetzt. Die Anwendung unterstützt aktuell nur Deutsch.
- Das Layout der Dashboard-Seite ist responsive und passt sich verschiedenen Bildschirmgrößen an.
- Die Städtesuche wurde mit einem Typeahead-Control realisiert, inklusive Eingabe-Debouncing.
- Zukünftige Erweiterungen könnten eine Authentifizierung, Benutzerverwaltung oder zusätzliche Optionen für Widgets umfassen.
- Der Code ist modular aufgebaut, um eine gute Erweiterbarkeit und Wartbarkeit zu ermöglichen.
- Es wurde darauf geachtet, möglichst wenige externe Bibliotheken zu verwenden, um die Komplexität gering zu halten.
- Für bessere Barrierefreiheit (a11y) und eine konsistente UI wäre der Einsatz einer geeigneten UI-Bibliothek sinnvoll. Je nach Designvorgaben könnte eine headless Lösung oder ein Framework mit integrierter a11y-Unterstützung in Betracht gezogen werden.
- Wird der mitgelieferte API-Key für die OpenWeather-Schnittstelle genutzt, ist die Anzahl der API-Abfragen auf 60 pro Stunde begrenzt.

## ⚙️ Alternativen

- Da Backend und Frontend im selben Repository liegen, wäre der Einsatz eines Monorepo-Tools wie [Nx](https://nx.dev) denkbar. Vorteile wären u. a. klarere Trennung von Applikationen, einfacheres Code-Sharing (z. B. DTOs), ein Abhängigkeitsgraph und inkrementelle Builds.
- Anstelle der klassischen MVC-Struktur im Backend wäre auch eine Feature-basierte Architektur denkbar, bei der der Code nach fachlicher Zugehörigkeit (z. B. weather/, locations/) organisiert wird, was insbesondere bei wachsendem Codeumfang die Wartbarkeit, Skalierbarkeit sowie die Wiederverwendbarkeit und Portierbarkeit einzelner Module verbessert.
