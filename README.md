# Labyrinth Front

ეს არის ლაბირინთის ფრონტენდის საწყისი React + TypeScript აპლიკაცია, რომელიც Vite-ზე მუშაობს. backend-თან დასაკავშირებლად API კლიენტის საბაზისო ფენა უკვე მომზადებულია.

## ტექნოლოგიები

- React 19 და React DOM — UI-ის ასაწყობად;
- TypeScript — ტიპიზაციისთვის;
- Vite — development server-ისა და production build-ისთვის;
- React Router — გვერდებსა და layout-ს შორის routing-ისთვის;
- Tailwind CSS 4 — სტილებისთვის;
- Axios — HTTP მოთხოვნებისთვის;

## გაშვება

საჭიროა Node.js და npm.

```bash
npm install
npm run dev
```

შემდეგ გახსენით მისამართი, რომელსაც Vite ტერმინალში აჩვენებს, ჩვეულებრივ `http://localhost:5173`.

## npm ბრძანებები

| ბრძანება          | დანიშნულება                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | ადგილობრივი development server HMR-ით                            |
| `npm run build`   | TypeScript-ის შემოწმება და production build-ის შექმნა `dist/`-ში |
| `npm run preview` | უკვე აწყობილი `dist/`-ის ლოკალურად ჩვენება                       |

## პროექტის სტრუქტურა

```text
.
├── index.html                 # HTML-ის შესასვლელი ფაილი და root ელემენტი
├── package.json               # დამოკიდებულებები და npm ბრძანებები
├── vite.config.ts             # Vite-ის, React-ისა და Tailwind-ის plugin-ები
├── eslint.config.js           # ESLint-ის წესები
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # აპლიკაციის TypeScript კონფიგურაცია
├── tsconfig.node.json         # Vite config-ის TypeScript კონფიგურაცია
├── public/                    # პირდაპირ გასაცემი სტატიკური ფაილები
└── src/
    ├── main.tsx               # React-ის root-ში ჩატვირთვა
    ├── App.tsx                # BrowserRouter და route-ები
    ├── index.css              # Tailwind-ის იმპორტი
    ├── pages/
    │   ├── HomePage.tsx       # მთავარი გვერდის UI და ლაბირინთის mock ბადე
    │   └── index.ts            # გვერდების re-export-ები
    ├── components/layout/
    │   ├── Layout.tsx         # საერთო Header, Main და Footer
    │   ├── header/            # ზედა ნავიგაცია და ბრენდინგი
    │   ├── main/              # Outlet-იანი მთავარი კონტეინერი
    │   └── footer/            # ქვედა ნაწილი და ბმულები
    └── service/
        ├── client.ts          # Axios client, backend-ის base URL
        └── endpoints.ts       # API endpoint-ების ცენტრალური სია
```

## აპლიკაციის ჩატვირთვის ჯაჭვი

1. `src/main.tsx` პოულობს `index.html`-ის `#root` ელემენტს და მასში `App`-ს რენდერს აკეთებს `StrictMode`-ით.
2. `src/App.tsx` ქმნის `BrowserRouter`-ს. ამჟამად არსებობს ერთი index route, რომელიც `HomePage`-ს აჩვენებს.
3. route-ის გარე ელემენტია `Layout`, ამიტომ ყველა გვერდზე საერთო header, main და footer გამოჩნდება.
4. `Main` იყენებს React Router-ის `Outlet`-ს და აქტიური route-ის კომპონენტს მის შიგნით აჩვენებს.

## API ფენა

`src/service/client.ts` ქმნის Axios-ის instance-ს ამჟამინდელი base URL-ით:

```text
http://localhost:3000
```

`src/service/endpoints.ts` ამზადებს შემდეგ გზებს:

| ჯგუფი | Endpoint         | დანიშნულება            |
| ----- | ---------------- | ---------------------- |
| users | `/users`         | ყველა მომხმარებელი     |
| users | `/users/me`      | მიმდინარე მომხმარებელი |
| auth  | `/auth/register` | რეგისტრაცია            |
| auth  | `/auth/login`    | ავტორიზაცია            |

ეს endpoint-ები ჯერ მხოლოდ ცენტრალიზებულ კონფიგურაციად არსებობს; მიმდინარე `HomePage` მათ არ იძახებს. Backend-ის სხვა მისამართზე გადასატანად შეცვალეთ `baseURL` `src/service/client.ts`-ში. უფრო მოქნილი deployment-ისთვის მომავალში სასურველია environment variable-ის გამოყენება.

## სტილები

`src/index.css` Tailwind CSS 4-ს `@import "tailwindcss"` დირექტივით ტვირთავს. კომპონენტებში სტილები ძირითადად Tailwind utility class-ებითაა დაწერილი. საერთო ვიზუალური ფონი და განლაგება `Layout`/`Main` კომპონენტებშია, გვერდის კონკრეტული სტილი კი შესაბამის page/component ფაილში.

## მიმდინარე მდგომარეობა

- აპლიკაცია შეიცავს მხოლოდ ერთ route-ს — მთავარ გვერდს `/`.
- UI-ში დარჩენილია placeholder ტექსტები (`Lorem ipsum`), რომლებიც პროდუქტის საბოლოო ტექსტებით უნდა ჩანაცვლდეს.
- მონაცემები არ იტვირთება API-დან და state management ამ ეტაპზე არ გამოიყენება.
- `public/` ამჟამად ცარიელია. `index.html` `/favicon.svg`-ს მიუთითებს, ამიტომ favicon-ის დამატებისას ფაილი სწორედ `public/favicon.svg`-ში უნდა განთავსდეს.

## ახალი გვერდის დამატება

1. შექმენით ახალი page `src/pages/`-ში.
2. საჭიროების შემთხვევაში დაამატეთ მისი export `src/pages/index.ts`-ში.
3. დაამატეთ route `src/App.tsx`-ის `Routes` ბლოკში.
4. route-ის გვერდის საერთო header/footer-ში ჩასართავად დატოვეთ ის `Layout` route-ის შიგნით.
5. ცვლილების შემდეგ გაუშვით `npm run lint` და `npm run build`.

## ახალი API მოთხოვნის დამატება

1. დაამატეთ endpoint-ის გზა `src/service/endpoints.ts`-ში შესაბამის ჯგუფში.
2. გამოიყენეთ `apiClient` `src/service/client.ts`-დან.
3. მოთხოვნის პასუხისა და შეცდომის ტიპები აღწერეთ TypeScript-ით იმ კომპონენტთან ან service მოდულთან ახლოს, რომელიც მათ იყენებს.
4. backend-ის ხელმისაწვდომობა გადაამოწმეთ `http://localhost:3000`-ზე და შემდეგ გაუშვით build/lint შემოწმებები.

