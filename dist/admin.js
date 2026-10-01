const RESERVATIONS_KEY="gessTurismo.reservas";
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="admin-enhanced.css?v=1">');
const money=value=>Number(value).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const date=value=>value?new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR"):"Não definido";
const escapeHtml=value=>String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const readReservations=()=>{try{return JSON.parse(localStorage.getItem(RESERVATIONS_KEY)||"[]").map(item=>item.isTest?{...item,email:"mariana@email.com",travelerNames:"Lucas Souza",adults:1,children:1,travelers:2,total:750,minDeposit:200,amountNow:200,balance:550}:item)}catch(_error){return[]}};
const writeReservations=items=>{localStorage.setItem(RESERVATIONS_KEY,JSON.stringify(items));render()};
const encodePayload=value=>{const bytes=new TextEncoder().encode(JSON.stringify(value));let binary="";bytes.forEach(byte=>binary+=String.fromCharCode(byte));return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")};
const makeTestReservation=()=>{const now=new Date(),trip=new Date();trip.setDate(now.getDate()+((6-now.getDay()+7)%7||7));return{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),code:`TESTE-${String(Date.now()).slice(-5)}`,customer:"Mariana Souza",phone:"(21) 99999-0000",email:"mariana@email.com",travelerNames:"Lucas Souza",destination:"Arraial do Cabo",date:trip.toISOString().slice(0,10),pickup:"São Paulo • Terminal Rodoviário Jabaquara",adults:1,children:1,travelers:2,total:750,minDeposit:200,pricePerPerson:500,duration:"2 dias • sábado e domingo",hotel:true,status:"Aguardando cobrança",createdAt:new Date().toISOString(),amountNow:200,balance:550,pix:"",paymentLink:"",reminder:"",isTest:true}};

const whatsappInput=document.querySelector("#adminWhatsapp"),whatsappFeedback=document.querySelector("#whatsappSettingsFeedback");
whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(window.GESS_CONFIG.getWhatsappNumber());
document.querySelector("#whatsappSettings").addEventListener("submit",event=>{event.preventDefault();try{const saved=window.GESS_CONFIG.saveWhatsapp(whatsappInput.value);whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(saved);whatsappFeedback.className="settings-feedback success";whatsappFeedback.textContent="WhatsApp salvo neste navegador."}catch(error){whatsappFeedback.className="settings-feedback error";whatsappFeedback.textContent=error.message}});

function reservationCard(item){
  const total=Number(item.total),minimum=100*Number(item.travelers||1),now=Math.max(minimum,Math.min(Number(item.amountNow)||minimum,total)),balance=Math.max(0,total-now),hasLink=Boolean(item.paymentLink);
  return `<article class="reservation-card" data-id="${escapeHtml(item.id)}">
    <div class="reservation-head"><div><span class="booking-code">${escapeHtml(item.code)}${item.isTest?' • EXEMPLO':''}</span><h3>${escapeHtml(item.customer)}</h3><p>${escapeHtml(item.phone)}</p></div><span class="status-pill">${escapeHtml(item.status)}</span></div>
    <dl class="reservation-data"><div><dt>Destino escolhido</dt><dd>${escapeHtml(item.destination)}</dd></div><div><dt>Data escolhida</dt><dd>${date(item.date)}</dd></div><div><dt>Referência de embarque</dt><dd>${escapeHtml(item.pickup)}</dd></div><div><dt>Viajantes</dt><dd>${Number(item.adults??item.travelers)} adulto${Number(item.adults??item.travelers)===1?'':'s'}${Number(item.children||0)?` + ${Number(item.children)} criança${Number(item.children)===1?'':'s'}`:''}</dd></div><div><dt>E-mail</dt><dd>${escapeHtml(item.email||"Não informado")}</dd></div><div><dt>Nomes informados</dt><dd>${escapeHtml(item.travelerNames||"Somente o responsável")}</dd></div><div><dt>Valor do pacote</dt><dd>${money(total)}</dd></div><div><dt>Recebido em</dt><dd>${new Date(item.createdAt).toLocaleString("pt-BR")}</dd></div></dl>
    <form class="charge-form" data-id="${escapeHtml(item.id)}" data-total="${total}"><div class="charge-title"><div><span>Sua única etapa</span><b>Defina o pagamento desta reserva</b></div><button class="full-payment" type="button">Cobrar valor completo</button></div>
      <div class="payment-workspace"><label class="amount-field">Valor que será pago agora<input class="amount-now" type="number" min="${minimum}" max="${total}" step="0.01" value="${now.toFixed(2)}" required><small>Caução mínima: ${money(minimum)} (${money(100)} × ${item.travelers} viajante${Number(item.travelers)===1?'':'s'}). Pode pagar qualquer valor até ${money(total)}.</small></label><div class="balance-preview"><div><span>Valor total</span><b>${money(total)}</b></div><div class="now-preview"><span>Pagamento agora</span><b>${money(now)}</b></div><div class="balance-highlight"><span>Saldo restante</span><strong>${money(balance)}</strong></div></div></div>
      <label>Código Pix que gerará o QR Code<textarea class="pix-code" rows="3" required placeholder="Cole o Pix copia e cola do valor informado">${escapeHtml(item.pix||"")}</textarea></label>
      <div class="charge-grid"><label>Lembrete interno<input class="reminder-date" type="date" value="${escapeHtml(item.reminder||"")}"><small>Visível somente no painel.</small></label><label>Observação para o cliente<input class="charge-note-input" value="${escapeHtml(item.note||"")}" placeholder="Ex.: sinal da excursão"></label></div>
      <div class="card-actions"><button class="generate-link" type="submit">Salvar cobrança e gerar QR Code</button><button class="proof-action" type="button">${item.status==="Comprovante recebido"?"Comprovante recebido ✓":"Marcar comprovante recebido"}</button><button class="delete-action" type="button">Apagar</button></div><p class="card-feedback" aria-live="polite"></p>
    </form>${hasLink?`<div class="card-link"><div><b>Cobrança pronta</b><span>${money(item.amountNow)} agora • ${money(item.balance)} restante</span></div><div><input value="${escapeHtml(item.paymentLink)}" readonly><button class="copy-link" type="button">Copiar link</button><a href="${escapeHtml(item.paymentLink)}" target="_blank" rel="noopener">Visualizar</a></div></div>`:""}
  </article>`;
}

function render(){
  const items=readReservations(),list=document.querySelector("#reservationList");list.innerHTML=items.map(reservationCard).join("");document.querySelector("#emptyReservations").hidden=items.length>0;
  document.querySelector("#metricTotal").textContent=items.length;document.querySelector("#metricWaiting").textContent=items.filter(item=>item.status==="Aguardando cobrança").length;document.querySelector("#metricLinks").textContent=items.filter(item=>item.paymentLink).length;document.querySelector("#metricProofs").textContent=items.filter(item=>item.status==="Comprovante recebido"||item.status==="Comprovante selecionado").length;
}

document.querySelector("#reservationList").addEventListener("input",event=>{if(!event.target.matches(".amount-now"))return;const form=event.target.closest(".charge-form"),total=Number(form.dataset.total),now=Number(event.target.value)||0;form.querySelector(".now-preview b").textContent=money(now);form.querySelector(".balance-highlight strong").textContent=money(Math.max(0,total-now))});
document.querySelector("#reservationList").addEventListener("click",async event=>{
  const card=event.target.closest(".reservation-card");if(!card)return;const id=card.dataset.id,items=readReservations(),item=items.find(entry=>entry.id===id);if(!item)return;
  if(event.target.closest(".full-payment")){const input=card.querySelector(".amount-now");input.value=Number(item.total).toFixed(2);input.dispatchEvent(new Event("input",{bubbles:true}));return}
  if(event.target.closest(".delete-action")){if(confirm(`Apagar a reserva ${item.code}?`))writeReservations(items.filter(entry=>entry.id!==id));return}
  if(event.target.closest(".proof-action")){item.status=item.status==="Comprovante recebido"?"Cobrança gerada":"Comprovante recebido";writeReservations(items);return}
  if(event.target.closest(".copy-link")){const field=card.querySelector(".card-link input");try{await navigator.clipboard.writeText(field.value)}catch(_error){field.select();document.execCommand("copy")}event.target.textContent="Copiado"}
});

document.querySelector("#reservationList").addEventListener("submit",event=>{
  const form=event.target.closest(".charge-form");if(!form)return;event.preventDefault();const items=readReservations(),item=items.find(entry=>entry.id===form.dataset.id);if(!item)return;
  const now=Number(form.querySelector(".amount-now").value),total=Number(item.total),minimum=100*Number(item.travelers||1),feedback=form.querySelector(".card-feedback");if(!Number.isFinite(now)||now<minimum||now>total){feedback.className="card-feedback error";feedback.textContent=`Informe um valor entre ${money(minimum)} e ${money(total)}.`;return}
  const pix=form.querySelector(".pix-code").value.trim();if(!pix){feedback.className="card-feedback error";feedback.textContent="Cole o código Pix para gerar o QR Code.";return}
  const payload={v:1,code:item.code,customer:item.customer,phone:item.phone,email:item.email||"",travelerNames:item.travelerNames||"",adults:Number(item.adults??item.travelers),children:Number(item.children||0),destination:item.destination,date:item.date,pickup:item.pickup,travelers:Number(item.travelers),total,now,balance:Number((total-now).toFixed(2)),pix,note:form.querySelector(".charge-note-input").value.trim(),sellerWhatsapp:window.GESS_CONFIG.getWhatsappNumber()};const url=new URL("pagamento.html",window.location.href);url.hash=`cobranca=${encodePayload(payload)}`;
  item.amountNow=now;item.balance=payload.balance;item.pix=pix;item.note=payload.note;item.reminder=form.querySelector(".reminder-date").value;item.paymentLink=url.href;item.status="Cobrança gerada";writeReservations(items);
});

document.querySelector("#createTest").addEventListener("click",()=>{const items=readReservations();items.unshift(makeTestReservation());writeReservations(items)});
if(localStorage.getItem(RESERVATIONS_KEY)===null)localStorage.setItem(RESERVATIONS_KEY,JSON.stringify([makeTestReservation()]));
window.addEventListener("storage",event=>{if(event.key===RESERVATIONS_KEY)render()});render();
