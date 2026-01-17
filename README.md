# Sledovač testů a učení

 Webová aplikace pro efektivní správu školních povinností, plánování testů a sledování pokroku v učení[cite: 12].  Projekt je rozdělen na technickou část (aplikace) a projektovou dokumentaci.

## Struktura projektu

### 1. Aplikace (`/sledovac-testu`)
Moderní fullstack aplikace postavená na TypeScriptu.
*  **Backend**: Node.js + Express + SQLite.  Implementuje kompletní REST API, autentizaci (JWT) a CRUD operace pro předměty a testy.
*  **Frontend**: React + Vite (připravováno pro další fázi).

### 2. Dokumentace a Prezentace (`/presentations`)
 Obsahuje výstupy projektu.
* **Presentations**: Prezentace pro jednotlivé milníky projektu.

## Klíčové funkce (dle specifikace)
*  **Správa předmětů**: CRUD operace pro definici školních předmětů[cite: 29, 30].
* **Sledování testů**: Kalendářní přehled termínů a typů zkoušek (písemka, ústní, projekt).
* **Záznamy o učení**: Evidence času stráveného studiem propojená s konkrétními testy.
* **Uživatelské role**: Rozlišení mezi Studentem a Správcem skupiny (možnost sdílení termínů)

## Technické požadavky
* **Runtime**: Node.js v18+
* **Jazyk**: TypeScript
* **Databáze**: SQLite (lokální soubor `database.sqlite`)

## Instalace (Backend)
1. `cd sledovac-testu/backend`
2. `npm install`
3. `npm run dev