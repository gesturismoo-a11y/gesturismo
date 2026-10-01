const money=value=>Number(value).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const decodePayload=value=>{
  const normalized=value.replace(/-/g,"+").replace(/_/g,"/");
  const binary=atob(normalized.padEnd(Math.ceil(normalized.length/4)*4,"="));
  const bytes=Uint8Array.from(binary,char=>char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
};
const hashParams=new URLSearchParams(location.hash.slice(1));
let charge=null;
try{charge=decodePayload(hashParams.get("cobranca")||"");if(!charge||charge.v!==1||!charge.code||!charge.pix||!(charge.now>0)||charge.now>charge.total)throw new Error("invalid")}
catch(_error){document.querySelector("#invalidCharge").hidden=false;document.querySelector("#chargeContent").hidden=true}

if(charge){
  const date=value=>new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
  document.querySelector("#bookingCode").textContent=charge.code;
  document.querySelector("#chargeCustomer").textContent=charge.customer||"Não informado";
  document.querySelector("#chargePhone").textContent=charge.phone||"Não informado";
  document.querySelector("#chargeEmail").textContent=charge.email||"Não informado";
  document.querySelector("#tripDestination").textContent=charge.destination;
  document.querySelector("#tripDate").textContent=date(charge.date);
  document.querySelector("#tripPickup").textContent=charge.pickup;
  document.querySelector("#tripTravelers").textContent=`${charge.adults??charge.travelers} adulto${Number(charge.adults??charge.travelers)===1?"":"s"}${Number(charge.children||0)?` + ${charge.children} criança${Number(charge.children)===1?"":"s"}`:""}`;
  document.querySelector("#tripTravelerNames").textContent=charge.travelerNames||"Somente o responsável";
  document.querySelector("#tripTravelerNames").previousElementSibling.textContent="Outros viajantes";
  document.querySelector("#packageAmount").textContent=money(charge.total);
  document.querySelector("#remainingAmount").textContent=charge.balance>0?money(charge.balance):"Nada a pagar";
  document.querySelector("#paymentAmount").textContent=money(charge.now);
  document.querySelector("#pixCode").value=charge.pix;
  const qr=document.querySelector("#pixQr");
  qr.onerror=()=>{if(qr.dataset.fallback)return;qr.dataset.fallback="true";qr.src=`https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(charge.pix)}`};
  qr.src=`https://quickchart.io/qr?size=320&margin=2&text=${encodeURIComponent(charge.pix)}`;
  if(charge.note){document.querySelector("#chargeNote").hidden=false;document.querySelector("#chargeNote").textContent=charge.note}
}

document.querySelector("#copyPix").addEventListener("click",async()=>{
  const code=document.querySelector("#pixCode");
  try{await navigator.clipboard.writeText(code.value)}catch(_error){code.select();document.execCommand("copy")}
  document.querySelector("#copyPix").textContent="Código copiado";
});

document.querySelector("#proofFile").addEventListener("change",event=>{
  const file=event.target.files[0];document.querySelector("#proofName").textContent=file?file.name:"Selecione uma imagem, print ou PDF";
});

document.querySelector("#proofForm").addEventListener("submit",event=>{
  event.preventDefault();if(!charge||!event.currentTarget.reportValidity())return;
  const file=document.querySelector("#proofFile").files[0];
  const message=["Olá, tudo bem? Realizei o pagamento da minha excursão e vou anexar o comprovante nesta conversa.",`Reserva: ${charge.code}`,`Nome: ${charge.customer||"Não informado"}`,`WhatsApp: ${charge.phone||"Não informado"}`,`E-mail: ${charge.email||"Não informado"}`,`Destino: ${charge.destination}`,`Data: ${new Date(`${charge.date}T12:00:00`).toLocaleDateString("pt-BR")}`,`Embarque: ${charge.pickup}`,`Adultos/maiores de 12 anos: ${charge.adults??charge.travelers}`,`Crianças até 12 anos: ${charge.children||0}`,`Nomes informados: ${charge.travelerNames||"Somente o responsável"}`,`Valor pago: ${money(charge.now)}`,`Saldo restante: ${money(charge.balance)}`,"Prazo do saldo: quitação até 7 dias antes da viagem",`Arquivo selecionado: ${file.name}`,"IMPORTANTE: vou anexar o comprovante manualmente antes de enviar esta mensagem.","Aguardo a confirmação da reserva."].join("\n");
  const number=charge.sellerWhatsapp||window.GESS_CONFIG.getWhatsappNumber();
  try{const key="gessTurismo.reservas",items=JSON.parse(localStorage.getItem(key)||"[]"),item=items.find(entry=>entry.code===charge.code);if(item){item.status="Comprovante selecionado";item.proofName=file.name;item.proofSelectedAt=new Date().toISOString();localStorage.setItem(key,JSON.stringify(items))}}catch(_error){}
  document.querySelector("#paymentFeedback").textContent="O WhatsApp será aberto. Anexe o arquivo selecionado antes de enviar a mensagem.";
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
