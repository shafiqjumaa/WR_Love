# دليل نشر موقع "عالمنا الخاص ❤️"

اتبع الخطوات بالترتيب بالضبط. كل خطوة بسيطة ولا تحتاج خبرة برمجية.

---

## الخطوة 1: إنشاء حساب GitHub (مكان حفظ الكود)

1. روح لموقع github.com واعمل حساب مجاني (لو ما عندك).
2. اضغط زر "+" أعلى الصفحة ثم "New repository".
3. سمّي المشروع مثلاً: our-world
4. اختر "Private" (خاص) عشان محد يشوفه.
5. اضغط "Create repository".
6. بصفحة المشروع الفاضية، اضغط "uploading an existing file".
7. فك ضغط ملف our-world-final.zip اللي بعثتلك ياه، واسحب **كل الملفات اللي جوا مجلد our-world** (مو المجلد نفسه) إلى صفحة الرفع.
8. اضغط "Commit changes".

---

## الخطوة 2: إنشاء حساب Supabase (قاعدة البيانات وتسجيل الدخول)

1. روح لموقع supabase.com واعمل حساب مجاني.
2. اضغط "New Project".
3. اختر اسم للمشروع (أي اسم)، وكلمة سر لقاعدة البيانات (احفظها بمكان آمن).
4. اختر أقرب منطقة جغرافية لك، واضغط "Create new project" (استنى دقيقة لين يجهز).

### تشغيل قاعدة البيانات:
5. من القائمة الجانبية، افتح "SQL Editor".
6. اضغط "New query".
7. افتح ملف `supabase/schema.sql` الموجود بمجلد المشروع، انسخ **كل محتواه**، والصقه بالمربع.
8. اضغط "Run".

### تفعيل تسجيل الدخول بالبريد:
9. من القائمة الجانبية: "Authentication" ← "Providers".
10. تأكد إن "Email" مفعّل (مفعّل افتراضيًا عادة).
11. من "Authentication" ← "URL Configuration": بالخطوة الأخيرة رح نرجع نحط هون رابط موقعك بعد ما ينشر.

### جلب المفاتيح:
12. من القائمة الجانبية: "Project Settings" ← "API".
13. رح تلاقي:
    - **Project URL**
    - **anon public key**
14. احتفظ فيهم، رح نحتاجهم بالخطوة الجاية.

---

## الخطوة 3: النشر على Netlify

1. روح لموقع netlify.com وسجّل دخول بحساب GitHub تبعك (زر "Sign up" ← "GitHub").
2. من الصفحة الرئيسية اضغط "Add new site" ← "Import an existing project".
3. اختر "Deploy with GitHub" وامنحه الصلاحية، ثم اختر مشروع our-world.
4. Netlify رح يتعرف على المشروع تلقائيًا (Next.js) ويعبّي إعدادات البناء لحاله — ما تغيّر شي.
5. قبل ما تضغط Deploy، افتح "Add environment variables" وضيف كل سطر من هذول لحاله:

```
NEXT_PUBLIC_SUPABASE_URL = [الصق Project URL من Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [الصق anon public key من Supabase]
ALLOWED_EMAIL_1 = shafiq9juma@gmail.com
ALLOWED_EMAIL_2 = reem.ramosh04@gmail.com
```

6. اضغط "Deploy [اسم الموقع]" واستنى 2-4 دقايق.
7. بعد ما يخلص، رح يعطيك رابط الموقع (مثلاً: our-world-xxxx.netlify.app). هذا رابط موقعك الفعلي 🎉

---

## الخطوة 4: ربط الرابط بـ Supabase (خطوة أخيرة ضرورية)

1. ارجع لـ Supabase ← "Authentication" ← "URL Configuration".
2. بخانة "Site URL" حط رابط موقعك من Netlify (اللي طلع بالخطوة السابقة).
3. بخانة "Redirect URLs" ضيف نفس الرابط + `/auth/callback`
   مثال: `https://our-world-xxxx.netlify.app/auth/callback`
4. احفظ.

---

## خلص! جرّب الموقع

1. افتح رابط موقعك من Netlify.
2. رح يطلب منك تسجيل الدخول ببريدك (shafiq9juma@gmail.com أو reem.ramosh04@gmail.com).
3. رح توصلك رسالة برابط بالبريد، اضغطيه ويدخّلك عالموقع.
4. روح على `/admin` (مثلاً: our-world-xxxx.netlify.app/admin) وابدأ تضيف الرسائل والذكريات والصور.

---

## إذا صار خطأ

انسخ لي رسالة الخطأ بالضبط وقلي بأي خطوة صار، وبصلحه معك.
