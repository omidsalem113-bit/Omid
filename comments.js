window.refreshComments=async function(){
 const panel=document.getElementById("commentsPanel");if(!panel)return;panel.replaceChildren();
 let client;try{client=await getSupabaseClient();}catch(e){}
 if(!client){const n=document.createElement("p");n.className="empty-state";n.textContent=t("commentsUnavailable");panel.appendChild(n);return;}
 const n=document.createElement("p");n.className="empty-state";n.textContent=t("loading");panel.appendChild(n);
 try{
  const {data,error}=await client.from("comments").select("id,user_id,content,created_at").eq("book_id",window.BOOK_SITE_CONFIG.bookId).eq("status","approved").order("created_at",{ascending:false}).limit(50);
  panel.replaceChildren();if(error)throw error;
  if(!data?.length){const empty=document.createElement("p");empty.className="empty-state";empty.textContent=t("emptyComments");panel.appendChild(empty);return;}
  const ids=[...new Set(data.map(c=>c.user_id))];
  const profileResult=await client.from("profiles").select("id,display_name").in("id",ids);
  const profileMap=new Map((profileResult.data||[]).map(profile=>[profile.id,profile.display_name]));
  data.forEach(c=>{const item=document.createElement("article");item.className="comment-item";const head=document.createElement("div");head.className="comment-head";const author=document.createElement("strong");author.textContent=profileMap.get(c.user_id)||"Reader";const date=document.createElement("time");date.dateTime=c.created_at;date.textContent=new Date(c.created_at).toLocaleDateString(window.currentLanguage==="fa"?"fa-IR":"en-US");head.append(author,date);const body=document.createElement("p");body.textContent=c.content;item.append(head,body);panel.appendChild(item);});
 }catch(e){panel.replaceChildren();const error=document.createElement("p");error.className="notice";error.textContent=t("commentsUnavailable");panel.appendChild(error);}
 const user=await client.auth.getUser();if(!user.data?.user)return;
 const form=document.createElement("form");form.className="comment-form";form.innerHTML=`<div class="form-field"><label for="newComment">${t("commentLabel")}</label><textarea id="newComment" maxlength="2000" required></textarea></div><div class="form-actions"><button class="button small-button" type="submit">${t("submitComment")}</button></div><p class="empty-state" aria-live="polite"></p>`;
 form.addEventListener("submit",async e=>{e.preventDefault();const content=form.querySelector("textarea").value.trim(),status=form.querySelector(".empty-state");if(!content)return;status.textContent=t("loading");
  const {error}=await client.from("comments").insert({book_id:window.BOOK_SITE_CONFIG.bookId,user_id:user.data.user.id,content,status:"pending"});
  if(error){status.textContent=t("authError");return;}form.reset();status.textContent=t("commentPending");
 });panel.appendChild(form);
};
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{if(window.refreshComments)window.refreshComments();},50));
