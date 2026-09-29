const params = new URLSearchParams(window.location.search);
const money = value => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
const ADULT_PRICE = 1599.90;
const CHILD_PRICE = 599.90;
const MIN_SIGNAL = 200;
const code = params.get("reserva");
let packageTotal = ADULT_PRICE;
let paymentMode = "signal";
let signalValue = MIN_SIGNAL;
let selectedMethod = "pix";

if (code && /^[A-Za-z0-9-]{4,24}$/.test(code)) document.querySelector("#bookingCode").textContent = code.toUpperCase();

const availableMonths = [
  [2026,9,"Outubro de 2026"],[2026,10,"Novembro de 2026"],[2026,11,"Dezembro de 2026"],
  [2027,0,"Janeiro de 2027"],[2027,1,"Fevereiro de 2027"],[2027,2,"Março de 2027"],
  [2027,3,"Abril de 2027"],[2027,4,"Maio de 2027"],[2027,5,"Junho de 2027"],[2027,6,"Julho de 2027"]
];
const monthSelect = document.querySelector("#tripMonth");
const weekSelect = document.querySelector("#tripWeek");
const formatDay = date => date.toLocaleDateString("pt-BR", {day:"2-digit", month:"2-digit"});
const isBlackout = date => date >= new Date(2026,11,20,12) && date <= new Date(2027,0,5,12);
monthSelect.innerHTML = availableMonths.map(([year,month,label]) => `<option value="${year}-${month}">${label}</option>`).join("");

function updateWeeks(){
  const [year,month] = monthSelect.value.split("-").map(Number);
  const lastDay = new Date(year,month+1,0).getDate();
  const weeks = [];
  for(let day=1;day<=lastDay;day++){
    const monday = new Date(year,month,day,12);
    if(monday.getDay() !== 1) continue;
    const friday = new Date(year,month,day+4,12);
    const saturday = new Date(year,month,day-2,12);
    const sunday = new Date(year,month,day-1,12);
    if(friday.getMonth() !== month || [monday,friday,saturday,sunday].some(isBlackout)) continue;
    weeks.push(`<option value="${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}">Embarque ${formatDay(saturday)} ou ${formatDay(sunday)} • roteiro ${formatDay(monday)} a ${formatDay(friday)}</option>`);
  }
  weekSelect.innerHTML = weeks.join("") || '<option value="">Sem semana disponível neste mês</option>';
}

const panels = {
  pix: '<div class="method-panel-icon"><svg class="method-logo pix-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.283 18.36a3.505 3.505 0 0 0 2.493-1.032l3.6-3.6a.684.684 0 0 1 .946 0l3.613 3.613a3.504 3.504 0 0 0 2.493 1.032h.71l-4.56 4.56a3.647 3.647 0 0 1-5.156 0L4.85 18.36ZM18.428 5.627a3.505 3.505 0 0 0-2.493 1.032l-3.613 3.614a.67.67 0 0 1-.946 0l-3.6-3.6A3.505 3.505 0 0 0 5.283 5.64h-.434l4.573-4.572a3.646 3.646 0 0 1 5.156 0l4.559 4.559ZM1.068 9.422 3.79 6.699h1.492a2.483 2.483 0 0 1 1.744.722l3.6 3.6a1.73 1.73 0 0 0 2.443 0l3.614-3.613a2.482 2.482 0 0 1 1.744-.723h1.767l2.737 2.737a3.646 3.646 0 0 1 0 5.156l-2.736 2.736h-1.768a2.482 2.482 0 0 1-1.744-.722l-3.613-3.613a1.77 1.77 0 0 0-2.444 0l-3.6 3.6a2.483 2.483 0 0 1-1.744.722H3.791l-2.723-2.723a3.646 3.646 0 0 1 0-5.156"/></svg></div><div><b>Pagamento instantâneo por Pix</b><p>O Mercado Pago exibirá o QR Code e o código Pix copia e cola na próxima etapa.</p></div>',
  card: '<div class="method-panel-icon"><svg class="method-logo card-logo" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/></svg></div><div><b>Cartão protegido pelo Mercado Pago</b><p>Os campos seguros do cartão e as parcelas serão carregados pelo Mercado Pago na próxima etapa.</p></div>'
};

function validateSignal(){
  const signalInput=document.querySelector("#customSignal");
  const payButton=document.querySelector("#payButton");
  const feedback=document.querySelector("#paymentFeedback");
  const entered=Number(signalInput.value);
  const belowMinimum=!Number.isFinite(entered)||entered<MIN_SIGNAL;
  const aboveTotal=entered>packageTotal;
  const invalid=paymentMode==="signal"&&(belowMinimum||aboveTotal);
  const message=belowMinimum?"Valor mínimo do sinal: R$ 200.":aboveTotal?"O sinal não pode ser maior que o valor total do pacote.":"";
  signalInput.setCustomValidity(invalid?message:"");
  signalInput.setAttribute("aria-invalid",String(invalid));
  payButton.disabled=invalid;
  payButton.setAttribute("aria-disabled",String(invalid));
  feedback.textContent=invalid?message:"";
  feedback.classList.toggle("is-error",invalid);
  return !invalid;
}

function updateAmount(){
  const payNow = paymentMode === "full" ? packageTotal : Math.min(Math.max(signalValue,MIN_SIGNAL),packageTotal);
  const remaining = Math.max(packageTotal-payNow,0);
  document.querySelector("#paymentAmount").textContent = money(payNow);
  document.querySelector("#remainingAmount").textContent = remaining ? money(remaining) : "Nada a pagar";
  document.querySelector("#customSignal").max = String(packageTotal);
  validateSignal();
}

function updateTravelers(){
  const adults = Number(document.querySelector("#tripAdults").value);
  const childrenSelect = document.querySelector("#tripChildren");
  const maxChildren = 6-adults;
  Array.from(childrenSelect.options).forEach(option => option.disabled = Number(option.value)>maxChildren);
  if(Number(childrenSelect.value)>maxChildren) childrenSelect.value=String(maxChildren);
  packageTotal = adults*ADULT_PRICE + Number(childrenSelect.value)*CHILD_PRICE;
  document.querySelector("#packageAmount").textContent=money(packageTotal);
  updateAmount();
}

monthSelect.addEventListener("change",updateWeeks);
document.querySelector("#tripAdults").addEventListener("change",updateTravelers);
document.querySelector("#tripChildren").addEventListener("change",updateTravelers);
document.querySelectorAll(".amount-mode-button").forEach(button => button.addEventListener("click", () => {
  paymentMode=button.dataset.mode;
  document.querySelectorAll(".amount-mode-button").forEach(item => {const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-checked",String(active));});
  document.querySelector("#signalOptions").hidden=paymentMode==="full";
  updateAmount();
}));
document.querySelector("#customSignal").addEventListener("input", event => {
  const entered=Number(event.target.value)||0;
  signalValue=entered;
  updateAmount();
});
document.querySelectorAll(".payment-method").forEach(button => button.addEventListener("click", () => {
  selectedMethod=button.dataset.method;
  document.querySelectorAll(".payment-method").forEach(item => {const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-selected",String(active));});
  document.querySelector("#methodPanel").innerHTML=panels[selectedMethod];
  document.querySelector("#payButton").textContent=selectedMethod==="pix"?"Continuar com Pix":"Continuar com cartão";
}));
document.querySelector("#payButton").addEventListener("click",()=>{
  const required=["payerName","payerPhone","payerEmail","originCity","tripDestination","tripMonth","tripWeek"];
  const missing=required.some(id=>!document.querySelector(`#${id}`).value.trim());
  const signalInput=document.querySelector("#customSignal");
  if(!validateSignal()){signalInput.reportValidity();return;}
  document.querySelector("#paymentFeedback").textContent=missing?"Preencha os dados do responsável e da viagem para continuar.":"O pagamento será liberado pela equipe após a confirmação final da reserva.";
});

updateWeeks();
updateTravelers();
