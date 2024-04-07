# Aplikacija za Vremensku prognozu

Dobrodošli u našu aplikaciju za vremensku prognozu! Ova aplikacija nudi korisnički prijateljsku platformu za praćenje vremenskih uslova u vašim omiljenim gradovima.

## Karakteristike

- Pretraga gradova koristeći traku za pretragu sa automatskim dovršavanjem
- Prikaz trenutnih vremenskih podataka uključujući temperaturu, vremenske uslove, vlažnost, brzinu vjetra itd.
- Prognoza za 5 dana za lakše planiranje
- Dodavanje gradova u omiljene za brzi pristup
- Uklanjanje gradova iz liste omiljenih
- Responzivan dizajn za mobilne uređaje i desktop
- Čist i intuitivan korisnički interfejs

## Kako Radi

1. **Pretraga Grada:** Počnite tako što ćete unijeti ime grada koji vas zanima u traku za pretragu. Naša aplikacija će pružiti listu odgovarajućih rezultata.

2. **Pregled Vremena:** Kliknite na željeni grad iz rezultata pretrage. To će vas preusmjeriti na detaljnu stranicu koja prikazuje trenutne vremenske uslove odabranog grada.

3. **Praćenje Grada:** Da biste pratili vrijeme određenog grada, kliknite na plus ikonu koja se nalazi u gornjem desnom uglu kartice sa trenutnim vremenom. Ova radnja će dodati grad u vaše omiljene na početnoj stranici, omogućavajući vam da pristupite njegovim vremenskim informacijama u bilo koje vrijeme.

4. **Uklanjanje Grada:** Ako odlučite da prestanete pratiti grad, možete to učiniti sa početne stranice ili dok gledate određeni grad.

   - **Sa Početne Stranice:** Potražite karticu grada koji želite ukloniti. U gornjem desnom uglu kartice grada vidjet ćete minus ikonu. Jednostavno kliknite na ovu ikonu da prestanete pratiti grad.
   - **Sa Stranice Određenog Grada:** Ako trenutno pregledavate vremenske uslove određenog grada, možete ukloniti grad i odatle. Potražite minus ikonu, koja se nalazi blizu imena grada u gornjem desnom uglu kartice grada. Klikom na ovu ikonu prestajete pratiti grad.

5. **Povratak na Početnu Stranicu:** Da biste se u bilo kojem trenutku vratili na početnu stranicu, jednostavno kliknite na logo "Aplikacija za Vrijeme", koji se nalazi u gornjem lijevom uglu stranice. To će vas vratiti na početnu stranicu gdje možete vidjeti sve gradove koje pratite.

Ova aplikacija je dizajnirana da vam pruži ažurirane informacije o vremenu u realnom vremenu i omogućava lako prebacivanje između gradova koje pratite. Uživajte u praćenju vremena!

## Izgrađeno sa

- [Vue.js](https://vuejs.org/) - Korišteni web okvir
- [TypeScript](https://www.typescriptlang.org/) - Za statičku provjeru tipova
- [Tailwind CSS](https://tailwindcss.com/) - Za stilove
- [Vue Router](https://router.vuejs.org/) - Za rutiranje
- [Pinia](https://pinia.esm.dev/) - Upravljanje stanjem
- [Axios](https://axios-http.com/) - Klijent za HTTP zahtjeve baziran na obećanjima
- [VueUse](https://vueuse.org/) - Kolekcija korisnih kompozicionih API-ja

## Preporučeni IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (prethodno Volar). Ova ekstenzija pruža isticanje sintakse, podršku za TypeScript, i intellisense za izraze u šablonima i propove komponenti.

## Podrška za Tipove za `.vue` Importe u TS

U editorima, trebamo [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + ugrađenu ekstenziju `TypeScript and JavaScript Language Features` da bi TypeScript jezički servis bio svjestan `.vue` tipova.

Instalirajte [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) i ako nemate omogućenu ekstenziju `TypeScript and JavaScript Language Features`, pratite ove korake:

1. Pokrenite `Extensions: Show Built-in Extensions` iz VSCode's command palette.
2. Pronađite `TypeScript and JavaScript Language Features`, desni klik i odaberite `Enable`
3. Ponovno učitajte VSCode prozor pokretanjem `Developer: Reload Window` iz command palette.

Da biste izbjegli konflikte, onemogućite Vetur i Volar ekstenzije ako su instalirane. Evo kako:

1. Kliknite na ikonu Extensions view na Sidebaru ili pritisnite `Ctrl+Shift+X`.
2. Pronađite `Vetur` ili `TypeScript Vue Plugin (Volar)`, desni klik i odaberite `Disable (Workspace)`.
3. Ponovno učitajte VSCode prozor pokretanjem `Developer: Reload Window` iz command palette.

## Prilagođavanje konfiguracije

Pogledajte [Vite Configuration Reference](https://vitejs.dev/config/).

## Postavljanje Projekta

```sh
npm install
```

### Kompilacija i Hot-Reload za Razvoj

```sh
npm run dev
```

### Provera Tipova, Kompilacija i Minifikacija za Produkciju

```sh
npm run build
```

### Lint sa [ESLint](https://eslint.org/)

```sh
npm run lint
```

## API-ji

Ova aplikacija koristi dva eksterna API-ja:

### [OpenWeather API](https://openweathermap.org/api)

Koristi se za dohvatanje podataka o vremenu. Zahtijeva API ključ.

Osnovni URL: `https://api.openweathermap.org/data/2.5`

Neki korišteni endpointi:

- `/weather` - Trenutno vrijeme po imenu grada
- `/forecast` - Prognoza za 5 dana po imenu grada

### [LocationIQ API](https://locationiq.com/docs)

Koristi se za pretragu gradova. Zahtijeva API ključ.

Osnovni URL: `https://us1.locationiq.com/v1`

Neki korišteni endpointi:

- `/autocomplete` - Autocomplete za gradove po imenu

## Varijable Okruženja

Ova aplikacija koristi varijable okruženja za upravljanje osjetljivim podacima. Trebate kreirati `.env` fajl u rootu vašeg projekta i dodati sljedeće varijable:

```properties
VITE_LOCATIONIQ_API_KEY= vaš_locationiq_api_ključ
VITE_OPENWEATHER_API_KEY= vaš_openweather_api_ključ
VITE_BASE_LOCATION_URL= https://us1.locationiq.com/v1
VITE_BASE_WEATHER_URL= https://api.openweathermap.org/data/2.5
```

## Deplojanje

Aplikacija je postavljena na [Netlify](https://www.netlify.com/).

Možete pogledati live sajt ovdje: [https://voluble-palmier-d3f2d0.netlify.app](https://voluble-palmier-d3f2d0.netlify.app)

Automatski se postavlja iz glavne grane na GitHubu.
