/* Supabase Auth: این بخش فقط پس از واردکردن URL و anon/publishable key فعال می‌شود. */
window.supabaseClient = null;
window.getSupabaseClient = async function(){
 const cfg=window.BOOK_SITE_CONFIG;
 if(!cfg.supabaseUrl||!cfg.supabaseAnonKey)return null;
 if(!window.supabaseClient){
  if(!window.supabaseLibraryPromise)window.supabaseLibraryPromise=import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
  const lib=await window.supabaseLibraryPromise;
  window.supabaseClient=lib.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
 }
 return window.supabaseClient;
};
window.refreshAuthUI=async function(){
 const panel=document.getElementById("authPanel");if(!panel)return;panel.replaceChildren();
 let client;try{client=await getSupabaseClient();}catch(e){client=null;}
 if(!client){const n=document.createElement("div");n.className="notice";n.textContent=t("commentSetup");panel.appendChild(n);return;}
 let result;try{result=await client.auth.getUser();}catch(e){}
 const user=result?.data?.user;
 if(user){
  const p=document.createElement("p");p.className="notice";p.textContent=`${user.email||""} — ${t("signOut")}`;
  const b=document.createElement("button");b.className="button small-button";b.textContent=t("signOut");b.addEventListener("click",async()=>{await client.auth.signOut();refreshAuthUI();refreshComments();});panel.append(p,b);
  const profileForm=document.createElement("form");profileForm.className="form-grid";profileForm.innerHTML=`<div class="form-field full"><label for="displayName">${t("displayName")}</label><input id="displayName" maxlength="60" autocomplete="nickname" required></div><div class="form-actions"><button class="button small-button" type="submit">${t("displayName")}</button></div>`;
  profileForm.addEventListener("submit",async e=>{e.preventDefault();const displayName=profileForm.querySelector("input").value.trim();const {error}=await client.from("profiles").upsert({id:user.id,display_name:displayName},{onConflict:"id"});showToast(error?t("authError"):t("copied"));});panel.appendChild(profileForm);return;
 }
 const form=document.createElement("form");form.className="auth-form";form.innerHTML=`<div class="form-grid"><div class="form-field"><label for="authEmail">${t("email")}</label><input id="authEmail" type="email" autocomplete="email" required></div><div class="form-field"><label for="authPassword">${t("password")}</label><input id="authPassword" type="password" autocomplete="current-password" minlength="8" required></div></div><div class="form-actions"><button class="button small-button" type="submit" data-mode="login">${t("signIn")}</button><button class="button small-button" type="button" data-mode="signup">${t("signUp")}</button></div><p class="empty-state" aria-live="polite"></p>`;
 let mode="login";form.querySelector('[data-mode="signup"]').addEventListener("click",()=>{mode="signup";form.requestSubmit();});
 form.addEventListener("submit",async e=>{e.preventDefault();const status=form.querySelector(".empty-state");status.textContent=t("loading");const email=form.querySelector("#authEmail").value.trim(),password=form.querySelector("#authPassword").value;let result;
  if(mode==="signup"){const displayName=email.split("@")[0];result=await client.auth.signUp({email,password,options:{data:{display_name:displayName}}});}
  else result=await client.auth.signInWithPassword({email,password});
  if(result.error){status.textContent=t("authError");return;}status.textContent=mode==="signup"?t("commentPending"):t("copied");if(result.data?.session){refreshAuthUI();refreshComments();}
 });
 form.querySelector('[data-mode="login"]').addEventListener("click",()=>mode="login");panel.appendChild(form);
};
document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{if(window.refreshAuthUI)window.refreshAuthUI();},0);});
