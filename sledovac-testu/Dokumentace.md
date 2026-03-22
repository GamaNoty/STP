# Technická dokumentace: Sledovač testů

Tento dokument detailně popisuje architekturu, databázový model, klíčové mechanismy a technická rozhodnutí aplikovaná při vývoji fullstack aplikace "Sledovač testů". Aplikace slouží k organizaci studijních povinností, termínů a materiálů s důrazem na čisté UI, konzistenci kódu a bezpečnost dat.


## 1. Architektura systému

Projekt je postaven jako striktně oddělená (decoupled) architektura klient-server:

* **Frontend (Klient):** Single Page Application (SPA) napsaná v knihovně React 18 s využitím TypeScriptu. K sestavení je nasazen nástroj Vite pro bleskový vývojový server a optimalizovaný build. Aplikace plně využívá knihovnu `react-router-dom` pro klientské routování bez nutnosti překreslování stránky.
* **Backend (Server):** REST API postavené na prostředí Node.js s frameworkem Express.js. Komunikace probíhá výhradně ve formátu JSON. Server řeší veškerou byznys logiku, validaci vstupů, ochranu koncových bodů a CORS politiku.

## 2. Databázový model (SQLite)

Jako databázový engine byl zvolen **SQLite3**. Tento systém je pro osobní a studentské projekty vysoce efektivní – nevyžaduje instalaci samostatného databázového serveru (jako PostgreSQL nebo MySQL), celá databáze je uložena v jednom `.sqlite` souboru, a přitom plně podporuje relační vazby (Foreign Keys) a transakce.

### Struktura hlavních tabulek:
Architektura stojí na pevných relačních vazbách, které zajišťují integritu dat (například test nemůže existovat bez přiřazeného předmětu).

* **`users` (Uživatelé):**
  * `id` (Primary Key), `name`, `email`, `password` (hashované), `role_id`.
* **`subjects` (Předměty):**
  * `subject_ID` (Primary Key), `name`, `color` (HEX kód pro UI).
* **`groups` (Studijní skupiny):**
  * `group_ID` (Primary Key), `name`. Umožňuje budoucí sdílení testů mezi uživateli.
* **`tests` (Testy a zkoušky):**
  * Hlavní entita aplikace. Obsahuje `test_ID` (PK), `name`, `date` (ve formátu YYYY-MM-DD).
  * **Cizí klíče (Foreign Keys):** `subject_ID` (odkazuje na předmět), `group_ID` (odkazuje na skupinu), `user_ID` (odkazuje na tvůrce).
  * *Technická poznámka:* Databáze striktně vynucuje referenční integritu. Pokud se frontend pokusí vytvořit test s neexistujícím `group_ID`, databáze operaci odmítne s chybou `SQLITE_CONSTRAINT (errno 19)`.

## 3. Zabezpečení a Autentizace (JWT)

Aplikace nevyužívá tradiční session cookies, ale moderní bezstavový (stateless) tokenový systém.

* **Hashování hesel:** Při registraci je heslo zpracováno algoritmem `bcrypt` (s nastaveným faktorem salt rounds na 10). Backend díky tomu nikdy neuchovává heslo v čitelné podobě. Při přihlášení dochází pouze k porovnání hashe zadaného hesla s hashem uloženým v databázi.
* **JSON Web Tokens (JWT):** Po úspěšném přihlášení je backendem vygenerován podepsaný token. V jeho "payloadu" (datové části) jsou bezpečně zakódovány identifikátory `user_ID` a `role_ID`.
* **Chráněné cesty (Protected Routes):** Veškeré API endpointy (např. `/api/tests` nebo `/api/subjects`) jsou chráněny validačním middlewarem. Frontend musí ke každému asynchronnímu požadavku připojit HTTP hlavičku `Authorization: Bearer <token>`. V případě absence nebo neplatnosti tokenu vrací backend chybový status `401 Unauthorized` a uživatel je automaticky přesměrován na přihlašovací obrazovku.

## 4. Backend: Fail-Fast mechanismy a inicializace

Backendová část je navržena tak, aby při špatné konfiguraci prostředí došlo k okamžitému zastavení běhu (tzv. Fail-Fast mechanismus). Zabraňuje se tak skrytým chybám a neočekávanému chování za běhu aplikace.

* **Ochrana JWT Secret:** Hned při inicializaci (`server.js`) je kontrolována přítomnost proměnné `process.env.JWT_SECRET`. Pokud tato proměnná chybí, je do konzole vypsán detailní návod k nápravě (s odkazem na ukázkový soubor `.env.example`) a proces Node.js je okamžitě terminován s chybovým kódem `process.exit(1)`.
* **Asynchronní start DB:** Express server nezačne naslouchat na příslušném portu (`app.listen`), dokud úspěšně neproběhne asynchronní funkce `initDb()`. Tato funkce ověřuje spojení se SQLite souborem a existenci nezbytných tabulek. Tím je zajištěno, že API nepřijme žádný požadavek dříve, než je databáze plně připravena.

## 5. Frontend: State Management a princip DRY

Klientská část je silně komponentově orientovaná. K řízení globálního a lokálního stavu není využita externí knihovna (např. Redux), stav je efektivně spravován pomocí nativních React hooků (`useState`, `useEffect`, `useCallback`).

* **Správa asynchronních dat:** Pro komunikaci s rozhraním API slouží nativní API `fetch`. Datová volání jsou obalena v hooku `useCallback`, což zabraňuje zbytečnému re-renderování komponent a zajišťuje stabilní reference pro pole závislostí v `useEffect`.
* **DRY (Don't Repeat Yourself) u Modálních oken:** Aplikace vyžaduje obsluhu mnoha formulářů (přidávání testů, předmětů, studijních materiálů). Místo duplikování strukturálního HTML kódu (pro pozadí, zavírací prvky, chybové stavy a načítací indikátory) byla vyvinuta kompoziční šablona `FormModalTemplate.tsx`. Jednotlivé formuláře fungují pouze jako stavové wrappery, které do této šablony injektují vlastní vstupní pole (inputy) prostřednictvím property `children`. To zaručuje 100% vizuální i logickou konzistenci.

## 6. UI/UX Rozhodnutí a zpracování chyb

Uživatelské rozhraní staví na designovém směru "Glassmorphism" (efekt matného skla), kterého je dosaženo aplikací Tailwind CSS utilit, jako jsou `backdrop-blur-md` a poloprůhledná pozadí s hexadecimálními barvami (`bg-[#1C1C24]/50`).

* **Systém barev a přístupnost:** Primární akcentní barvou značky je červená (`brand-red`), jež slouží k indikaci hlavních akcí, tlačítek a zvýraznění aktuálního dne v kalendáři. Aby nedocházelo k vizuálnímu matení uživatele, byla pro zobrazení **chybových stavů a varování striktně vyhrazena barva jantarová/oranžová (`amber-400` / `amber-500`)**. Chybové hlášky se tak nestávají "slepými místy" a jasně vystupují z běžného UI.
* **Dynamický kalendář:** Komponenta Dashboardu obsahuje algoritmus pro generování kalendářní mřížky zarovnané na pondělí. Tento modul automaticky mapuje příchozí testy z backendu na specifická data a vizuálně je vyčleňuje.

## 7. Struktura prezentační vrstvy (Views)


Adresář `src/views/` obsahuje hlavní stránky (routy) aplikace. Každý soubor představuje ucelený pohled, který agreguje menší komponenty a zajišťuje komunikaci s příslušnými REST API endpointy.

### `SignIn.tsx` (Autentizační rozhraní)
Tato komponenta slouží jako vstupní brána do aplikace a zajišťuje bezpečné přihlášení uživatele.
* **Autentizační tok:** Komponenta odesílá uživatelské pověření (e-mail a heslo) na koncový bod `/api/auth`. Při úspěšné verifikaci (kde backend porovnává bcrypt hash) přijímá JWT token, který je následně bezpečně uložen do lokálního úložiště (`localStorage`) prohlížeče.
* **Zpracování chyb:** Je zde implementován bezpečnostní standard pro vypisování chyb. V případě neplatných údajů je vygenerována chybová hláška v jantarové/oranžové barvě (`amber-400`). Tím je zaručeno, že chybové stavy vizuálně nesplývají s primárními akčními prvky aplikace (které využívají barvu `brand-red`).
* **Přesměrování:** Po úspěšném uložení tokenu je využit hook `useNavigate` pro okamžité přesměrování uživatele na hlavní Dashboard.

### `Dashboard.tsx` (Hlavní přehled)
Slouží jako primární rozcestník a informační panel uživatele po úspěšném přihlášení.
* **Agregace dat:** Komponenta stahuje data o testech a předmětech. Následně provádí filtrování na straně klienta, aby uživateli zobrazila pouze nadcházející události seřazené podle data.
* **Modulární struktura:** Dashboard do sebe integruje další menší komponenty (např. zkrácený výpis kalendáře nebo widgety s nejbližšími termíny), čímž poskytuje okamžitý přehled o studijních prioritách bez nutnosti navigace hlouběji do aplikace.

### `Calendar.tsx` (Kalendářový pohled)
Samostatná komponenta vyhrazená pro chronologické zobrazení studijních událostí.
* **Algoritmická mřížka:** Komponenta obsahuje interní logiku pro výpočet dnů v aktuálním měsíci a generuje kalendářní mřížku s přesným zarovnáním na pondělí.
* **Mapování událostí:** Získaná data z API (`tests`) jsou mapována na konkrétní dny v kalendáři. Dny obsahující test jsou vizuálně zvýrazněny pomocí specifických CSS tříd (Tailwind).
* **Zabezpečení proti pádům:** Pokud selže načtení dat z backendu, je využit konzistentní jantarový chybový blok, který zabraňuje zhroucení celé komponenty a informuje uživatele o výpadku.

### `Subjects.tsx` (Správa předmětů)
Zajišťuje zobrazení a správu studijních předmětů v přehledné mřížkové struktuře (CSS Grid).
* **Optimalizace renderování:** Pro asynchronní načítání předmětů je využit hook `useCallback`, který zabraňuje znovuvytváření fetchovací funkce při každém renderu a stabilizuje chování hooku `useEffect`.
* **Integrace šablon (DRY):** Komponenta obsahuje tlačítko pro přidání nového předmětu, které aktivuje `CreateSubjectModal`. Tento modal plně využívá globální kompoziční šablonu `FormModalTemplate` pro zachování vizuální konzistence (glassmorphism design, načítací spinnery).
* **Vizuální indikátory:** Každá karta předmětu dynamicky aplikuje barvu uloženou v databázi (HEX kód) do inline stylu podtržítka, čímž uživateli usnadňuje vizuální orientaci.

### `Tests.tsx` (Seznam testů)
Zprostředkovává komplexní přehled všech plánovaných i proběhlých testů.
* **Referenční integrita ve formuláři:** Obsahuje modal pro vytvoření testu (`CreateTestModal`), který striktně vyžaduje zadání `subject_ID` a `group_ID`. Tato validace na frontendu předchází chybě `SQLITE_CONSTRAINT` (kód 19) na straně databáze.
* **Dynamické routování:** Každá karta testu funguje jako navigační prvek. Při kliknutí je využita vlastnost `test_ID` z databázového objektu k sestavení dynamické URL adresy (např. `/testy/1`). To zabraňuje chybám typu `undefined` v URL struktuře.

### `TestsDetail.tsx` (Interaktivní detail)
Nejkomplexnější pohled v aplikaci, sloužící jako dedikovaný studijní hub pro konkrétní test.
* **Parametrická extrakce:** Komponenta využívá hook `useParams` k přečtení ID testu přímo z URL adresy a následně asynchronně stahuje jeho metadata z API.
* **Časové kalkulace:** Obsahuje funkci `getDaysLeft`, která matematicky porovnává datum testu s aktuálním časem a dynamicky upravuje textové štítky ("Za X dní", "Proběhlo") včetně jejich barvy.
* **Studijní moduly:** Pohled se skládá z reaktivního checklistu (s automatickým přepočtem progress baru) a seznamu studijních materiálů.
* **Modulární okna (Triáda):** Soubor nese logiku pro orchestraci tří specifických modálních oken (`EditTestDetailModal`, `CreateTopicModal`, `CreateMaterialModal`). Všechna tato okna dědí strukturu z `FormModalTemplate`, což minimalizuje redundanci kódu.

### `Groups.tsx` (Studijní skupiny)
Pohled navržený pro vizualizaci a správu studijních skupin (odpovídající databázové tabulce `groups`).
* **Kolaborativní vrstva:** Tato komponenta je architektonicky připravena pro budoucí funkce sdílení. Slouží k zobrazení skupin, do kterých uživatel patří, a definuje prostor pro filtrování testů podle příslušnosti k dané skupině. Zajišťuje logickou vazbu mezi entitami `users` a `tests` na úrovni klientského rozhraní.