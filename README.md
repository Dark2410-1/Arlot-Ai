# Arlot AI

Dasturlash (programming) va video o'yinlar (games) sohasiga ixtisoslashgan, dark-mode, to'liq frontend AI yordamchi. React + Vite bilan qurilgan, sun'iy intellekt javoblarini esa **Groq API** orqali oladi.

## Xususiyatlari

- 🌓 Professional dark-mode dizayn, ikki mavzu uchun dual-accent identity (kod uchun ko'k, o'yinlar uchun amber)
- 💬 Stream bo'lib keladigan (real-time) AI javoblar, LPU chip tufayli juda tez
- 🏷️ Har bir javobga avtomatik `CODE` / `GAME` / `UMUMIY` teg qo'yiladi
- 📄 3 sahifa: Bosh sahifa, Chat, Haqida
- ⚙️ System prompt orqali sohaga moslashtirilgan AI xulq-atvori (`src/lib/groqAI.js`)
- 🔑 Har bir foydalanuvchi **o'zining bepul** Groq API kalitini ishlatadi — hech qanday umumiy akkaunt, hudud yoki yosh cheklovi, murakkab ro'yxatdan o'tish popupi yo'q

## AI qanday ishlaydi (muhim)

Loyihada hech qanday maxfiy kalit repo ichida saqlanmaydi. Buning o'rniga:

1. Foydalanuvchi Chat sahifasini birinchi marta ochganda, bepul Groq API kalitini olish taklif qilinadi ([console.groq.com/keys](https://console.groq.com/keys) orqali, email yoki Google/GitHub bilan, kredit karta shart emas, ~30 soniya).
2. Kalit faqat o'sha foydalanuvchining **o'z brauzerida** (`localStorage`) saqlanadi.
3. Har bir so'rov to'g'ridan-to'g'ri foydalanuvchining brauzeridan Groq'ning API serveriga boradi — orada hech qanday backend yo'q.

Groq — Google Gemini'dan farqli o'laroq — hudud yoki yosh tasdiqlash cheklovlariga ega emas, shuning uchun har qanday mamlakatdan muammosiz ishlaydi.

**Groq bepul tarif chegaralari:** Standart model (`llama-3.3-70b-versatile`) bepul, lekin daqiqa/kunlik so'rov chegaralari bor (taxminan 30 so'rov/daqiqa). Chegaraga yetilsa, chatda tushunarli xato xabari chiqadi.

## Talab qilinadigan narsalar

- [Node.js](https://nodejs.org) 18 yoki undan yuqori versiya
- npm (Node bilan birga keladi)
- Bepul Groq API kaliti — https://console.groq.com/keys

## O'rnatish va ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching. Chat sahifasiga o'tganingizda API kalitni joylashtirish oynasi chiqadi.

## Production build

```bash
npm run build
npm run preview   # build natijasini lokal tekshirish uchun
```

Natija `dist/` papkasida hosil bo'ladi.

## GitHub'ga joylash

1. Ushbu papkani yangi GitHub repositoriyasiga push qiling:

   ```bash
   git init
   git add .
   git commit -m "Arlot AI: ilk versiya"
   git branch -M main
   git remote add origin https://github.com/<FOYDALANUVCHI>/<REPO>.git
   git push -u origin main
   ```

2. **GitHub Pages orqali avtomatik deploy** (`.github/workflows/deploy.yml` allaqachon tayyor):
   - Repo sozlamalarida **Settings → Pages → Source** bo'limida **GitHub Actions**ni tanlang.
   - `main` branchga push qilganingizda sayt avtomatik build va deploy bo'ladi.
   - Sayt manzili: `https://<FOYDALANUVCHI>.github.io/<REPO>/`

3. `src/pages/About.jsx` faylidagi `https://github.com` havolasini o'zingizning repo manzilingizga almashtiring.

## Loyiha tuzilishi

```
src/
  components/
    ChatWindow.jsx     # Asosiy chat logikasi
    ApiKeySetup.jsx    # Groq kalitini kiritish ekrani
    MessageBubble.jsx  # Xabar pufakchasi + CODE/GAME tegi
    Navbar.jsx / Footer.jsx
  pages/               # Home, Chat, About
  lib/groqAI.js         # AI qatlami: system prompt, streaming, kalit boshqaruvi
  App.jsx              # Routing
  main.jsx             # Entry point (HashRouter GitHub Pages uchun)
```

## AI xulq-atvorini o'zgartirish

Arlotning "shaxsiyati" va qamrovi (dasturlash + o'yinlar) `src/lib/groqAI.js` faylidagi `SYSTEM_PROMPT` o'zgaruvchisida belgilangan. Uni tahrirlab, sohalarni kengaytirishingiz yoki toraytirishingiz, javob uslubini o'zgartirishingiz mumkin. `MODEL` o'zgaruvchisi orqali boshqa Groq modeliga ham almashtirsa bo'ladi (masalan `llama-3.1-8b-instant` — tezroq, yoki `openai/gpt-oss-120b`).

## Texnologiyalar

- React 18 + Vite
- react-router-dom (HashRouter)
- lucide-react (ikonalar)
- Groq API (fetch orqali to'g'ridan-to'g'ri, OpenAI-mos format, foydalanuvchi o'z kaliti bilan)

## Litsenziya

Ushbu loyiha ochiq kodli — istalgan maqsadda foydalanish, o'zgartirish va tarqatish mumkin.
