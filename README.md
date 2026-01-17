# Sledovač testů a učení

[cite_start]Webová aplikace pro efektivní správu školních povinností, plánování testů a sledování pokroku v učení[cite: 12]. [cite_start]Projekt je rozdělen na technickou část (aplikace) a projektovou dokumentaci.

## Struktura projektu

### 1. Aplikace (`/sledovac-testu`)
Moderní fullstack aplikace postavená na TypeScriptu.
* [cite_start]**Backend**: Node.js + Express + SQLite[cite: 19, 21, 22]. [cite_start]Implementuje kompletní REST API, autentizaci (JWT) a CRUD operace pro předměty a testy[cite: 23, 30, 31].
* [cite_start]**Frontend**: React + Vite (připravováno pro další fázi)[cite: 20].

### 2. Dokumentace a Prezentace (`/presentations`)
[cite_start]Obsahuje všechny výstupy projektu definované ve funkční specifikaci[cite: 2, 15].
* [cite_start]**Documentations**: Funkční specifikace (Výstup č. 1), archivy předchozích verzí[cite: 2, 5].
* **Presentations**: Prezentace pro jednotlivé milníky projektu.

## Klíčové funkce (dle specifikace)
* [cite_start]**Správa předmětů**: CRUD operace pro definici školních předmětů[cite: 29, 30].
* [cite_start]**Sledování testů**: Kalendářní přehled termínů a typů zkoušek (písemka, ústní, projekt)[cite: 32, 60, 61].
* [cite_start]**Záznamy o učení**: Evidence času stráveného studiem propojená s konkrétními testy[cite: 40, 41, 64].
* [cite_start]**Uživatelské role**: Rozlišení mezi Studentem a Správcem skupiny (možnost sdílení termínů)[cite: 42, 44, 47, 51].

## Technické požadavky
* **Runtime**: Node.js v18+
* **Jazyk**: TypeScript
* [cite_start]**Databáze**: SQLite (lokální soubor `database.sqlite`) [cite: 18, 22]

## Instalace (Backend)
1. `cd sledovac-testu/backend`
2. `npm install`
3. `npm run dev` (spustí server pomocí `tsx` a `nodemon`)