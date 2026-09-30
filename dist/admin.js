const whatsappInput=document.querySelector("#adminWhatsapp");
const whatsappFeedback=document.querySelector("#whatsappSettingsFeedback");
whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(window.GESS_CONFIG.getWhatsappNumber());

document.querySelector("#whatsappSettings").addEventListener("submit",event=>{
  event.preventDefault();
  try{const saved=window.GESS_CONFIG.saveWhatsapp(whatsappInput.value);whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(saved);whatsappFeedback.className="settings-feedback success";whatsappFeedback.textContent="WhatsApp salvo neste navegador."}
  catch(error){whatsappFeedback.className="settings-feedback error";whatsappFeedback.textContent=error.message}
});

const codeInput=document.querySelector("#chargeCode");
codeInput.value=`GESS-${String(Date.now()).slice(-6)}`;
const today=new Date();today.setHours(12,0,0,0);
const nextSaturday=new Date(today);nextSaturday.setDate(today.getDate()+((6-today.getDay()+7)%7||7));
document.querySelector("#chargeDate").value=nextSaturday.toISOString().slice(0,10);
document.querySelector("#chargeDue").value=today.toISOString().slice(0,10);

const encodePayload=value=>{
  const bytes=new TextEncoder().encode(JSON.stringify(value));
  let binary="";bytes.forEach(byte=>binary+=String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
};

document.querySelector("#chargeForm").addEventListener("submit",event=>{
  event.preventDefault();
  const total=Number(document.querySelector("#chargeTotal").value),now=Number(document.querySelector("#chargeNow").value);
  const feedback=document.querySelector("#chargeFeedback");
  if(!Number.isFinite(total)||!Number.isFinite(now)||now<=0||now>total){feedback.className="settings-feedback error";feedback.textContent="O valor para pagar agora deve ser maior que zero e não pode ultrapassar o total.";return}
  const payload={v:1,code:codeInput.value.trim().toUpperCase(),customer:document.querySelector("#chargeCustomer").value.trim(),phone:document.querySelector("#chargePhone").value.trim(),destination:document.querySelector("#chargeDestination").value,date:document.querySelector("#chargeDate").value,pickup:document.querySelector("#chargePickup").value.trim(),travelers:Number(document.querySelector("#chargeTravelers").value),total,now,balance:Number((total-now).toFixed(2)),due:document.querySelector("#chargeDue").value,pix:document.querySelector("#chargePix").value.trim(),note:document.querySelector("#chargeNote").value.trim(),sellerWhatsapp:window.GESS_CONFIG.getWhatsappNumber()};
  const url=new URL("pagamento.html",window.location.href);url.hash=`cobranca=${encodePayload(payload)}`;
  document.querySelector("#paymentLink").value=url.href;document.querySelector("#openPaymentLink").href=url.href;document.querySelector("#generatedLink").hidden=false;
  feedback.className="settings-feedback success";feedback.textContent="Link gerado. Confira a cobrança antes de enviar ao cliente.";
});

document.querySelector("#copyPaymentLink").addEventListener("click",async()=>{
  const field=document.querySelector("#paymentLink");
  try{await navigator.clipboard.writeText(field.value);document.querySelector("#copyPaymentLink").textContent="Link copiado"}
  catch(_error){field.select();document.execCommand("copy");document.querySelector("#copyPaymentLink").textContent="Link copiado"}
});
