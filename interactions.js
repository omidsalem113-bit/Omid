window.showToast = function(message) {
 const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
 clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);
};
window.copyText = async function(text) {
 try { await navigator.clipboard.writeText(text); showToast(t("copied")); }
 catch { const area=document.createElement("textarea");area.value=text;area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();const ok=document.execCommand("copy");area.remove();showToast(ok?t("copied"):"Copy failed"); }
};
window.shareUrl = async function(url,title,text) {
 if(navigator.share){try{await navigator.share({title,text,url});return;}catch(e){if(e.name==="AbortError")return;}}
 await copyText(url); if(!navigator.share)showToast(t("linkCopied"));
};
document.addEventListener("DOMContentLoaded",()=>{
 const intro=document.getElementById("introScreen");
 const dismiss=()=>{intro.classList.add("dismissed");sessionStorage.setItem("bookIntroSeen","1");};
 if(sessionStorage.getItem("bookIntroSeen")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)intro.classList.add("dismissed");
 document.getElementById("enterButton").addEventListener("click",dismiss);document.getElementById("skipIntro").addEventListener("click",dismiss);
 document.getElementById("languageToggle").addEventListener("click",()=>{
  const next=window.currentLanguage==="fa"?"en":"fa";
  if(window.BOOK_CONTENT[next])window.setLanguage(next);
 });
 document.getElementById("themeToggle").addEventListener("click",()=>{
  const root=document.documentElement;const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;localStorage.setItem("bookTheme",next);
 });
 document.getElementById("shareSite").addEventListener("click",()=>shareUrl(location.href,document.title,""));
 document.addEventListener("click",e=>{
  const reveal=e.target.closest("[data-reveal-spoiler]");
  if(reveal){const box=reveal.closest(".spoiler-box");box.querySelector(".spoiler-placeholder").hidden=true;box.querySelector(".spoiler-content").hidden=false;return;}
  const copy=e.target.closest("[data-copy-quote]");
  if(copy){const card=copy.closest(".quote-card");copyText(card.querySelector(".quote-text").innerText);return;}
  const share=e.target.closest("[data-share-quote]");
  if(share){const card=share.closest(".quote-card");shareUrl(location.href,document.title,card.querySelector(".quote-text").innerText);return;}
  const sectionShare=e.target.closest("[data-share-section]");
  if(sectionShare){const url=new URL(location.href);url.hash=sectionShare.dataset.shareSection;shareUrl(url.href,document.title,"");return;}
 });
});
