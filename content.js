/* تغییرات مربوط به هر کتاب را در content/fa.json و content/en.json انجام بده.
   این فایل بارگذاری‌کننده‌ی محتواست؛ اگر JSON قابل بارگذاری نبود، پیام خطا نشان داده می‌شود. */
window.BOOK_SITE_CONFIG = {
  bookId: "BOOK-001",
  contentPath: "content/",
  theme: "dark",
  supabaseUrl: "",
  supabaseAnonKey: ""
};
window.BOOK_CONTENT = { fa: null, en: null };
window.loadBookContent = async function(lang) {
  const path = window.BOOK_SITE_CONFIG.contentPath + lang + ".json";
  const response = await fetch(path);
  if (!response.ok) throw new Error("Content file not found: " + path);
  window.BOOK_CONTENT[lang] = await response.json();
  return window.BOOK_CONTENT[lang];
};
