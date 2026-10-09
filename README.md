# قالب وب‌سایت ادبی دوزبانه

قالبی موبایل‌محور برای ساخت یک وب‌سایت مستقل برای هر کتاب، با HTML/CSS/JavaScript ساده و انتشار رایگان روی GitHub Pages.

> **مهم:** متن‌های موجود در `content/fa.json` و `content/en.json` نمونه و جای‌نگهدار هستند؛ درباره‌ی هیچ کتاب واقعی ادعایی نمی‌کنند. پیش از انتشار، آن‌ها را با محتوای خودت جایگزین کن.

## امکانات نسخه فعلی

- صفحه‌ی ورودی سینمایی کوتاه با امکان ردکردن و رعایت `prefers-reduced-motion`
- صفحه‌ی معرفی با امتیاز شخصی قابل تنظیم
- بخش‌های مجزا برای معرفی، خلاصه، نگاه شخصی، نقد، یادداشت‌ها، نقل‌قول‌ها، شخصیت‌ها، زمینه، پژوهش، گفت‌وگو و منابع
- فارسی راست‌به‌چپ و انگلیسی چپ‌به‌راست
- پوسته‌ی روشن/تاریک با ذخیره در مرورگر
- فهرست موبایلی، لینک مستقیم به بخش‌ها، کپی نقل‌قول و اشتراک‌گذاری در مرورگرهای پشتیبانی‌شده
- افشای محتوای اسپویل فقط پس از اقدام کاربر
- محتوای کتاب در دو فایل JSON جداگانه
- مرز اتصال Supabase برای حساب‌ها و نظرات

## ساختار فایل‌ها

```text
literary-book-site/
├── index.html
├── README.md
├── css/
│   ├── main.css
│   ├── typography.css
│   └── animations.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── comments.js
│   ├── content.js
│   ├── interactions.js
│   ├── language.js
│   └── navigation.js
└── content/
    ├── fa.json
    └── en.json
```

## راه‌اندازی آسان با GitHub Pages

1. در GitHub یک repository جدید بساز؛ برای مثال `book-notes`.
2. فایل‌ها و پوشه‌های این پروژه را در ریشه‌ی repository آپلود کن. خود پوشه‌ی `literary-book-site` را داخل repository نگذار؛ محتویات آن باید در ریشه باشند.
3. وارد **Settings → Pages** شو.
4. در بخش **Build and deployment** گزینه‌ی **Deploy from a branch** را انتخاب کن.
5. شاخه‌ی `main` و پوشه‌ی `/(root)` را انتخاب و Save کن.
6. چند دقیقه صبر کن و آدرس نمایش‌داده‌شده در همان بخش را باز کن.

این پروژه از مسیرهای نسبی استفاده می‌کند و برای انتشار زیرمسیر repository طراحی شده است. اگر GitHub Pages را برای repository فعال کنی، مسیر `content/fa.json` نسبت به آدرس همان پروژه خوانده می‌شود.

برای به‌روزرسانی، فایل موردنظر را در GitHub باز کن، روی آیکون مداد بزن، ویرایش کن و **Commit changes** را بزن. پس از انتشار تغییرات، ممکن است لازم باشد صفحه را دوباره بارگذاری کنی.

## تغییر محتوا

فایل‌های اصلی محتوا:
- `content/fa.json`: متن فارسی
- `content/en.json`: متن انگلیسی

فیلدهای مهم:
- `book.title`, `book.originalTitle`, `book.author`, `book.translator`
- `book.rating`: عددی بین ۰ تا ۵، از جمله ۳٫۵ یا ۴٫۵
- `book.themeAccent`: رنگ تأکیدی CSS
- `introduction`, `summary`, `perspective`, `analysis`, `context`: متن یا آرایه‌ای از پاراگراف‌ها
- `analysisSpoiler.enabled` و `analysisSpoiler.content`
- `notes`, `quotes`, `characters`, `research`, `sources`
- `visibility.characters` و `visibility.context`

برای خاموش‌کردن بخش شخصیت‌ها یا زمینه، مقدار مربوطه را `false` کن. برای کتاب غیرداستانی معمولاً می‌توانی `visibility.characters` را `false` بگذاری. اگر بخش منبع خالی باشد، خودش پنهان می‌شود.

**نکته:** فایل JSON باید معتبر بماند. هر کلید و متن داخل علامت نقل‌قول دوتایی باشد؛ بعد از آخرین مورد در آرایه یا شیء ویرگول نگذار.

## راه‌اندازی Supabase برای حساب و نظرات

GitHub Pages فقط فایل‌های ایستا میزبانی می‌کند و خودش حساب کاربری یا پایگاه داده ندارد. در این قالب، اتصال Supabase آماده‌ی پیکربندی است، اما تا وقتی پروژه‌ی Supabase ساخته نشده، کلیدها وارد نشده‌اند، SQL زیر اجرا نشده و جریان ثبت‌نام/ورود/ارسال نظر آزمایش نشده، **حساب‌ها و نظرات فعال و تأییدشده محسوب نمی‌شوند**.

### ۱. ساخت پروژه و تنظیم کلیدها

1. در Supabase یک پروژه بساز.
2. در تنظیمات پروژه، Project URL و کلید عمومی قابل استفاده در مرورگر (anon key قدیمی یا publishable key جدید، مطابق داشبورد) را پیدا کن.
3. در `js/content.js` مقدارهای `supabaseUrl` و `supabaseAnonKey` را وارد کن.
4. هرگز `service_role` یا secret key را در این فایل یا هر کد عمومی قرار نده. کلید عمومی جایگزین سیاست‌های امنیتی نیست.

این نسخه کتابخانه‌ی رسمی Supabase JS را از CDN بارگذاری می‌کند. اگر CDN در دسترس نباشد، حساب‌ها و نظرات کار نخواهند کرد؛ محتوای کتاب همچنان قابل خواندن است.

### ۲. اجرای SQL در Supabase SQL Editor

در داشبورد Supabase بخش **SQL Editor** را باز کن، یک query جدید بساز، SQL زیر را اجرا کن. برای هر وب‌سایت کتاب، `book_id` پایدار و یکتا انتخاب کن و همان مقدار را در `js/content.js` قرار بده.

```sql
create table if not exists public.books (
  id text primary key,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  book_id text not null references public.books(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table public.books enable row level security;
alter table public.profiles enable row level security;
alter table public.comments enable row level security;

grant select on public.books to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.comments to anon, authenticated;

create policy "Books are publicly readable"
on public.books for select to anon, authenticated using (true);

create policy "Profiles are publicly readable"
on public.profiles for select to anon, authenticated using (true);

create policy "Users insert their own profile"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

create policy "Users update their own profile"
on public.profiles for update to authenticated
using (auth.uid() = id) with check (auth.uid() = id);

create policy "Anyone can read approved comments"
on public.comments for select to anon, authenticated
using (status = 'approved');

create policy "Users can submit comments as themselves"
on public.comments for insert to authenticated
with check (auth.uid() = user_id and status = 'pending');
```

پس از ساخت جدول‌ها، یک ردیف برای کتاب خودت وارد کن؛ نمونه:
```sql
insert into public.books (id, title)
values ('BOOK-001', 'Book title');
```
`BOOK-001` باید با `bookId` در `js/content.js` دقیقاً یکی باشد. اگر شناسه‌ی دیگری انتخاب کردی، هر دو را تغییر بده.

### ۳. نمایش نام نویسنده نظر

کد رابط، نام عمومی را از رابطه‌ی `profiles` می‌خواند. کاربر پس از ورود می‌تواند نام نمایشی خود را از فرم پروفایل ذخیره کند. برای اینکه نام به‌طور خودکار هنگام ثبت‌نام ساخته شود، می‌توانی بعداً trigger امنی در دیتابیس اضافه کنی؛ در نسخه فعلی کاربر می‌تواند آن را بعد از ورود ثبت کند.

### ۴. تأیید و حذف نظرها

نظرهای تازه با وضعیت `pending` ذخیره می‌شوند و فقط وضعیت `approved` برای عموم نمایش داده می‌شود. **سیاست مدیریتی کامل برای تأیید از داخل این رابط پیاده نشده است.** مدیر می‌تواند از Supabase Dashboard در جدول `comments` وضعیت را به `approved` یا `rejected` تغییر دهد و نظر نامناسب را حذف کند.

برای امنیت بیشتر، جدول‌های `profiles` و `comments` را در تنظیمات Data API و grants بازبینی کن؛ برای پروژه‌ی واقعی، بهتر است مجوزهای دسترسی عمومی به ستون‌های پروفایل و سازوکار ایجاد پروفایل را محدود و آزمایش کنی. هرگز کلید مدیریتی را در مرورگر نگذار.

### ۵. تنظیمات Auth

در **Authentication → URL Configuration** آدرس سایت GitHub Pages را به‌عنوان Site URL و آدرس‌های مجاز redirect اضافه کن. اگر تأیید ایمیل روشن باشد، کاربر ممکن است پیش از ورود مجبور شود روی پیوند ایمیل کلیک کند. تنظیمات SMTP پیش‌فرض ممکن است محدودیت ارسال داشته باشد.

## تکرار قالب برای کتاب بعدی

1. یک repository جدید بساز و همین فایل‌ها را کپی کن.
2. محتوا را در هر دو فایل JSON عوض کن.
3. `bookId` را به شناسه‌ای تازه تغییر بده.
4. رنگ، متن روی تصویر و تنظیمات تم را در شیء `book` تنظیم کن.
5. تصاویر دلخواه را در پوشه‌ی `assets/` اضافه کن (این نسخه برای اجرا به تصویر خارجی نیاز ندارد).
6. اگر نظرات مشترک می‌خواهی، همان پروژه‌ی Supabase را نگه دار، یک ردیف جدید در `books` بساز و شناسه‌ی مستقل کتاب را استفاده کن.
7. GitHub Pages repository تازه را فعال کن.

هیچ فهرست مرکزی‌ای از کتاب‌ها ساخته نمی‌شود؛ هر سایت مستقل است. چون این قالب ساده و بدون مرحله‌ی build است، برای هر repository فایل‌های کد باید کپی شوند.

## چک‌لیست آزمایش

- [ ] صفحه را در عرض موبایل کوچک (حدود 320–360 پیکسل) باز کن؛ اسکرول افقی نباید وجود داشته باشد.
- [ ] ورودی را رد کن و دوباره بارگذاری کن؛ در همان نشست نباید دوباره مانع شود.
- [ ] زبان را به انگلیسی تغییر بده و دوباره به فارسی برگردان؛ جهت و برچسب‌ها باید تغییر کنند.
- [ ] پوسته را تغییر بده و صفحه را دوباره باز کن.
- [ ] نقل‌قول را کپی کن و لینک یک بخش را از آدرس مرورگر باز کن.
- [ ] اسپویل باید تا کلیک صریح پنهان بماند.
- [ ] با صفحه‌کلید فهرست و دکمه‌ها را آزمایش کن.
- [ ] در JSON، بخش اختیاری را خالی یا خاموش کن.
- [ ] بدون Supabase سایت باید خواندنی بماند و پیام روشن درباره نظرات نشان دهد.
- [ ] پس از پیکربندی Supabase، ثبت‌نام، تأیید ایمیل (در صورت فعال بودن)، ورود، خروج، ثبت نظر، وضعیت pending و نمایش نظر approved را جداگانه آزمایش کن.
- [ ] در Supabase بررسی کن کاربر نتواند با دست‌کاری درخواست، نظر را به‌عنوان شخص دیگر ثبت کند یا نظر دیگران را تغییر دهد.
- [ ] مطمئن شو هیچ secret/service-role key در repository وجود ندارد.

## وضعیت صادقانه‌ی قابلیت‌ها

**قابل استفاده بدون backend:** طراحی واکنش‌گرا، محتوای دوزبانه، پوسته، فهرست، بخش‌ها، نمایش اسپویل با اقدام کاربر، کپی نقل‌قول، اشتراک‌گذاری/کپی لینک، محتوای JSON.

**نیازمند آزمایش واقعی پس از پیکربندی:** Supabase Auth، ارسال و نمایش نظرات، تنظیمات ایمیل و سیاست‌های دیتابیس.

**هنوز در نسخه‌ی اولیه کامل نیست:** پنل مدیریت داخل سایت، ویرایش زنده‌ی محتوا از رابط، هایلایت دائمی و ذخیره‌شده بین نشست‌ها، ترجمه‌ی خودکار، جست‌وجوی تمام‌متن، و تضمین تست‌شدن روی همه‌ی مرورگرها.
