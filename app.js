(function(){
 const $=id=>document.getElementById(id);
 function textOr(value,fallback=""){return typeof value==="string"&&value.trim()?value:fallback;}
 function safeUrl(url){try{const u=new URL(url,location.href);return ["http:","https:"].includes(u.protocol)?u.href:null;}catch{return null;}}
 function renderProse(elId,content){
  const el=$(elId);el.replaceChildren();
  const paragraphs=Array.isArray(content)?content:(content?[content]:[]);
  if(!paragraphs.length){el.innerHTML='<p class="empty-state"></p>';el.firstChild.textContent=t("noContent");return;}
  paragraphs.forEach(p=>{const node=document.createElement("p");node.textContent=p;el.appendChild(node);});
 }
 function spoilerBox(content){
  const box=document.createElement("div");box.className="spoiler-box";
  const placeholder=document.createElement("div");placeholder.className="spoiler-placeholder";
  const warning=document.createElement("p");warning.textContent=t("spoilerWarning");
  const button=document.createElement("button");button.className="button small-button";button.dataset.revealSpoiler="";button.textContent=t("revealSpoiler");
  placeholder.append(warning,button);
  const hidden=document.createElement("div");hidden.className="spoiler-content prose";hidden.hidden=true;
  (Array.isArray(content)?content:[content]).forEach(p=>{const para=document.createElement("p");para.textContent=p;hidden.appendChild(para);});
  box.append(placeholder,hidden);return box;
 }
 window.renderBookContent=function(data){
  if(!data)return;
  const book=data.book||{};
  $("bookTitle").textContent=textOr(book.title,"Book title");$("introTitle").textContent=textOr(book.title,"Book title");
  $("bookByline").textContent=[book.author,book.translator?`${data.labels?.translatedBy||"ترجمه"} ${book.translator}`:""].filter(Boolean).join(" · ");
  $("introAuthor").textContent=book.author||"";$("heroOriginalTitle").textContent=book.originalTitle||"A READING JOURNAL";
  $("bookIntro").textContent=book.shortIntroduction||"";$("ratingText").textContent=`${book.rating??0} / 5 · ${data.labels?.personalRating||"امتیاز شخصی من"}`;
  const rating=Number(book.rating)||0;$("ratingStars").textContent="★".repeat(Math.floor(rating))+(rating%1>=.5?"½":"")+"☆".repeat(5-Math.ceil(rating));
  $("artTitle").innerHTML=(book.artTitle||"A BOOK<br>A WORLD").split("\n").map(x=>x.replace(/</g,"&lt;").replace(/>/g,"&gt;")).join("<br>");
  $("artEdition").textContent=book.editionLabel||"FIELD NOTES / 001";$("artYear").textContent=book.artCaption||"A READING JOURNAL";
  $("footerBookId").textContent=window.BOOK_SITE_CONFIG.bookId;
  if(book.themeAccent){document.documentElement.style.setProperty("--accent",book.themeAccent);}
  if(book.themeBackground){document.documentElement.style.setProperty("--bg",book.themeBackground);}
  renderProse("introductionContent",data.introduction);renderProse("summaryContent",data.summary);renderProse("perspectiveContent",data.perspective);renderProse("analysisContent",data.analysis);
  const spoiler=$("analysisSpoiler");spoiler.replaceChildren();if(data.analysisSpoiler?.enabled&&data.analysisSpoiler.content)spoiler.appendChild(spoilerBox(data.analysisSpoiler.content));
  const notes=$("notesContent");notes.replaceChildren();
  (data.notes||[]).forEach(note=>{const card=document.createElement("article");card.className="note-card";const h=document.createElement("h3");h.textContent=note.title||"";const p=document.createElement("p");p.textContent=note.text||"";card.append(h,p);notes.appendChild(card);});
  if(!notes.children.length)notes.innerHTML=`<p class="empty-state">${t("noNotes")}</p>`;
  const quotes=$("quotesContent");quotes.replaceChildren();
  (data.quotes||[]).forEach(q=>{const card=document.createElement("article");card.className="quote-card";const mark=document.createElement("span");mark.className="quote-mark";mark.textContent="“";const quote=document.createElement("blockquote");quote.className="quote-text";quote.textContent=q.text||"";const meta=document.createElement("div");meta.className="quote-meta";meta.textContent=[q.page?`${t("quotePage")} ${q.page}`:"",q.note?`${t("quoteBy")}: ${q.note}`:""].filter(Boolean).join(" · ");card.append(mark,quote);if(q.commentary){const c=document.createElement("p");c.className="quote-comment";c.textContent=q.commentary;card.appendChild(c);}card.append(meta);
   const actions=document.createElement("div");actions.className="quote-actions";const copy=document.createElement("button");copy.dataset.copyQuote="";copy.textContent=t("copy");const share=document.createElement("button");share.dataset.shareQuote="";share.textContent=t("share");actions.append(copy,share);card.appendChild(actions);quotes.appendChild(card);});
  if(!quotes.children.length)quotes.innerHTML=`<p class="empty-state">${t("noQuotes")}</p>`;
  const chars=$("charactersContent");chars.replaceChildren();const list=document.createElement("div");list.className="character-list";
  (data.characters||[]).forEach(c=>{const item=document.createElement("article");item.className="character-item";if(c.spoiler){item.appendChild(spoilerBox([`${c.role||""}${c.relationships?" · "+c.relationships:""}`,c.notes||""]));}else{const h=document.createElement("h3");h.textContent=c.name||"";const p=document.createElement("p");p.textContent=[c.role,c.relationships,c.notes].filter(Boolean).join(" · ");item.append(h,p);}list.appendChild(item);});
  chars.appendChild(list);if(!list.children.length)chars.innerHTML=`<p class="empty-state">${t("noCharacters")}</p>`;
  renderProse("contextContent",data.context);
  const research=$("researchContent");research.replaceChildren();const rlist=document.createElement("div");rlist.className="research-list";
  (data.research||[]).forEach(r=>{const item=document.createElement("article");item.className="research-item";const status=document.createElement("span");status.className="status "+(r.status==="reviewed"?"reviewed":"");status.textContent=t(r.status==="reviewed"?"reviewed":"needsResearch");const h=document.createElement("h3");h.textContent=r.question||"";item.append(status,h);if(r.explanation){const p=document.createElement("p");p.textContent=r.explanation;item.appendChild(p);}if(r.note){const p=document.createElement("p");p.textContent=r.note;item.appendChild(p);}if(r.sources?.length){const p=document.createElement("p");p.textContent=r.sources.join(" · ");item.appendChild(p);}rlist.appendChild(item);});
  research.appendChild(rlist);if(!rlist.children.length)research.innerHTML=`<p class="empty-state">${t("noResearch")}</p>`;
  const sources=$("sourcesContent");sources.replaceChildren();const slist=document.createElement("div");slist.className="source-list";
  (data.sources||[]).forEach(s=>{const item=document.createElement("article");item.className="source-item";const p=document.createElement("p");p.textContent=[s.author,s.title,s.publisher,s.year].filter(Boolean).join(" · ");item.appendChild(p);const url=safeUrl(s.url||"");if(url){const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=t("sourceOpen");item.appendChild(a);}slist.appendChild(item);});
  sources.appendChild(slist);if(!slist.children.length){$("sources").classList.add("hidden");}else{$("sources").classList.remove("hidden");}
  ["characters","context"].forEach(id=>{const enabled=data.visibility?.[id]!==false;$(id).classList.toggle("hidden",!enabled);});
  document.querySelectorAll(".prose").forEach(prose=>prose.querySelectorAll("p").forEach(p=>{if(p.textContent.trim())p.tabIndex=0;p.addEventListener("click",()=>{if(p.closest(".quotes-section"))return;p.classList.toggle("passage-highlight");});p.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&p.tabIndex===0){e.preventDefault();p.classList.toggle("passage-highlight");}});}));
 };
 document.addEventListener("DOMContentLoaded",async()=>{
  const saved=localStorage.getItem("bookTheme");document.documentElement.dataset.theme=saved||window.BOOK_SITE_CONFIG.theme||"dark";
  try{await Promise.all([window.loadBookContent("fa"),window.loadBookContent("en")]);await window.setLanguage("fa");}
  catch(e){console.error(e);document.querySelectorAll(".prose").forEach(el=>{el.textContent=t("contentError");});$("bookTitle").textContent="Literary Journal";$("introTitle").textContent="Literary Journal";}
 });
})();
