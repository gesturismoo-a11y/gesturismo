const WHATSAPP_NUMBER = ""; // Adicione DDI + DDD + número, somente dígitos.
const PRICE_PER_PERSON = 1599.90;
const routes = {
  rio: {
    title:"Rio de Janeiro", location:"Rio de Janeiro • RJ", select:"Rio de Janeiro",
    intro:"Mar, montanha e os cartões-postais mais famosos da capital carioca.",
    map:"https://www.google.com/maps/dir/Copacabana,+Rio+de+Janeiro/Ipanema,+Rio+de+Janeiro/P%C3%A3o+de+A%C3%A7%C3%BAcar,+Rio+de+Janeiro/Cristo+Redentor,+Rio+de+Janeiro/Ba%C3%ADa+de+Guanabara",
    days:["Copacabana e Forte de Copacabana","Ipanema e pôr do sol no Arpoador","Urca e Pão de Açúcar","Cristo Redentor e Floresta da Tijuca","Passeio de barco pela Baía de Guanabara"],
    photos:[["assets/rio.jpg","Praia de Copacabana","Rio de Janeiro • RJ"],["assets/rio-ipanema.jpg","Ipanema vista do Arpoador","Zona Sul • Rio de Janeiro"],["assets/rio-pao-acucar.jpg","Pão de Açúcar","Urca • Rio de Janeiro"],["assets/rio-guanabara.jpg","Baía de Guanabara","Passeio náutico • Rio de Janeiro"]]
  },
  arraial: {
    title:"Arraial do Cabo", location:"Região dos Lagos • RJ", select:"Arraial do Cabo",
    intro:"Areia branca, água transparente e um dos roteiros náuticos mais bonitos do país.",
    map:"https://www.google.com/maps/dir/Praia+dos+Anjos,+Arraial+do+Cabo/Praia+do+Farol,+Arraial+do+Cabo/Prainhas+do+Pontal+do+Atalaia/Praia+do+Forno,+Arraial+do+Cabo/Praia+Grande,+Arraial+do+Cabo",
    days:["Praia dos Anjos e embarque no cais","Passeio de barco: Praia do Farol e Gruta Azul","Prainhas do Pontal do Atalaia","Trilha e banho na Praia do Forno","Praia Grande e pôr do sol"],
    photos:[["assets/arraial.jpg","Prainhas do Pontal do Atalaia","Arraial do Cabo • RJ"],["assets/arraial-forno.jpg","Praia do Forno","Arraial do Cabo • RJ"],["assets/arraial-farol.jpg","Praia do Farol","Acesso por barco • Arraial do Cabo"],["assets/arraial-praia-grande.jpg","Praia Grande","Pôr do sol • Arraial do Cabo"]]
  },
  "santa-catarina": {
    title:"Florianópolis", location:"Santa Catarina • SC", select:"Santa Catarina — Florianópolis",
    intro:"O pacote catarinense tem base em Florianópolis e combina ilha, dunas e cultura local.",
    map:"https://www.google.com/maps/dir/Ilha+do+Campeche,+Florian%C3%B3polis/Praia+do+Campeche,+Florian%C3%B3polis/Praia+da+Joaquina,+Florian%C3%B3polis/Lagoa+da+Concei%C3%A7%C3%A3o,+Florian%C3%B3polis/Barra+da+Lagoa,+Florian%C3%B3polis",
    days:["Travessia de barco para a Ilha do Campeche","Praia do Campeche","Praia e Dunas da Joaquina","Lagoa da Conceição","Barra da Lagoa e piscinas naturais"],
    photos:[["assets/santa-catarina.jpg","Ilha do Campeche","Florianópolis • SC"],["assets/floripa-joaquina.jpg","Praia da Joaquina","Florianópolis • SC"],["assets/floripa-dunas.jpg","Dunas da Joaquina","Florianópolis • SC"],["assets/floripa-barra-lagoa.jpg","Barra da Lagoa","Florianópolis • SC"]]
  },
  maragogi: {
    title:"Maragogi", location:"Costa dos Corais • AL", select:"Maragogi",
    intro:"Piscinas naturais, praias tranquilas e os tons de azul mais famosos de Alagoas.",
    map:"https://www.google.com/maps/dir/Gal%C3%A9s+de+Maragogi/Praia+de+Antunes,+Maragogi/Praia+de+Barra+Grande,+Maragogi/Praia+de+Ponta+de+Mangue,+Maragogi/Orla+de+Maragogi",
    days:["Catamarã às Galés de Maragogi e piscinas naturais","Praia de Antunes","Barra Grande e Caminho de Moisés","Praia de Ponta de Mangue","Orla de Maragogi e Praia de Burgalhau"],
    photos:[["assets/maragogi.jpg","Praia de Antunes","Maragogi • AL"],["assets/maragogi-corais.jpg","Galés e piscinas naturais","Costa dos Corais • Maragogi"],["assets/maragogi-barra-grande.jpg","Praia de Barra Grande","Maragogi • AL"],["assets/maragogi-ponta-mangue.jpg","Praia de Ponta de Mangue","Maragogi • AL"]]
  },
  "porto-seguro": {
    title:"Porto Seguro", location:"Costa do Descobrimento • BA", select:"Porto Seguro",
    intro:"Praias animadas, história e vilas charmosas no litoral sul da Bahia.",
    map:"https://www.google.com/maps/dir/Cidade+Hist%C3%B3rica,+Porto+Seguro/Praia+de+Munda%C3%AD,+Porto+Seguro/Praia+de+Taperapu%C3%A3,+Porto+Seguro/Arraial+d%27Ajuda,+Porto+Seguro/Trancoso,+Porto+Seguro",
    days:["Centro Histórico e Passarela do Descobrimento","Praia de Mundaí","Praia de Taperapuã e complexo Tôa Tôa","Arraial d’Ajuda e Praia do Mucugê","Trancoso e Praia dos Nativos"],
    photos:[["assets/porto-seguro.jpg","Orla de Porto Seguro","Porto Seguro • BA"],["assets/porto-seguro-mundai.jpg","Praia de Mundaí","Porto Seguro • BA"],["assets/porto-seguro-toatoa.jpg","Praia de Taperapuã","Porto Seguro • BA"],["assets/porto-seguro-trancoso.jpg","Trancoso","Porto Seguro • BA"]]
  },
  "porto-galinhas": {
    title:"Porto de Galinhas", location:"Ipojuca • PE", select:"Porto de Galinhas",
    intro:"Piscinas naturais, jangadas e praias de águas mornas no litoral pernambucano.",
    map:"https://www.google.com/maps/dir/Piscinas+Naturais+de+Porto+de+Galinhas/Praia+de+Muro+Alto,+Ipojuca/Pontal+do+Cupe,+Ipojuca/Pontal+de+Maraca%C3%ADpe,+Ipojuca/Vila+de+Porto+de+Galinhas",
    days:["Jangada às piscinas naturais","Praia de Muro Alto","Pontal do Cupe","Maracaípe e passeio de jangada no mangue","Vila e Praia do Centro de Porto de Galinhas"],
    photos:[["assets/porto-galinhas.jpg","Praia de Porto de Galinhas","Ipojuca • PE"],["assets/porto-galinhas-piscinas.jpg","Piscinas naturais","Porto de Galinhas • PE"],["assets/porto-galinhas-muro-alto.jpg","Praia de Muro Alto","Ipojuca • PE"],["assets/porto-galinhas-mergulho.jpg","Mergulho em Porto de Galinhas","Ipojuca • PE"]]
  },
  jericoacoara: {
    title:"Jericoacoara", location:"Jijoca de Jericoacoara • CE", select:"Jericoacoara",
    intro:"Dunas, lagoas e mar em uma vila cercada pelas paisagens do litoral cearense.",
    map:"https://www.google.com/maps/dir/Vila+de+Jericoacoara/Pedra+Furada,+Jericoacoara/Duna+do+P%C3%B4r+do+Sol,+Jericoacoara/Lagoa+do+Para%C3%ADso,+Jijoca+de+Jericoacoara/Buraco+Azul,+Cruz,+CE",
    days:["Vila e Praia de Jericoacoara","Trilha até a Pedra Furada","Duna do Pôr do Sol","Lagoa do Paraíso e Árvore da Preguiça","Circuito leste com Buraco Azul"],
    photos:[["assets/jericoacoara.jpg","Praia de Jericoacoara","Jijoca de Jericoacoara • CE"],["assets/jeri-duna.jpg","Duna do Pôr do Sol","Jericoacoara • CE"],["assets/jeri-praia.jpg","Praia e vila de Jericoacoara","Ceará"],["assets/jeri-cavalos.jpg","Dunas de Jericoacoara","Parque Nacional • CE"]]
  },
  natal: {
    title:"Natal", location:"Natal • RN", select:"Natal",
    intro:"Falésias, dunas e praias marcantes em um roteiro pela capital potiguar e seus arredores.",
    map:"https://www.google.com/maps/dir/Ponta+Negra,+Natal/Forte+dos+Reis+Magos,+Natal/Genipabu,+Extremoz/Praia+de+Pipa,+Tibau+do+Sul/Barra+do+Cunha%C3%BA,+Canguaretama",
    days:["Ponta Negra e Morro do Careca","Forte dos Reis Magos e Via Costeira","Dunas e Praia de Genipabu","Praia da Pipa e Baía dos Golfinhos","Barra do Cunhaú e piscinas naturais"],
    photos:[["assets/natal-ponta-negra.jpg","Ponta Negra e Morro do Careca","Natal • RN"],["assets/natal-morro-careca.jpg","Praia de Ponta Negra","Natal • RN"],["assets/natal-genipabu.jpg","Dunas de Genipabu","Extremoz • RN"],["assets/natal-pipa.jpg","Praia da Pipa","Tibau do Sul • RN"]]
  }
};
const months = [
  {value:"2026-10",label:"Outubro de 2026",start:3,end:31},{value:"2026-11",label:"Novembro de 2026",start:3,end:30},
  {value:"2026-12",label:"Dezembro de 2026",start:3,end:19},{value:"2027-01",label:"Janeiro de 2027",start:6,end:31},
  {value:"2027-02",label:"Fevereiro de 2027",start:3,end:28},{value:"2027-03",label:"Março de 2027",start:3,end:31},
  {value:"2027-04",label:"Abril de 2027",start:3,end:30},{value:"2027-05",label:"Maio de 2027",start:3,end:31},
  {value:"2027-06",label:"Junho de 2027",start:3,end:30},{value:"2027-07",label:"Julho de 2027",start:3,end:31}
];
const q = selector => document.querySelector(selector);
const destinationSelect=q("#destinationSelect"), adultSelect=q("#adultSelect"), childSelect=q("#childSelect"), monthSelect=q("#monthSelect"), daySelect=q("#daySelect"), whatsappButton=q("#whatsappButton"),termsDialog=q("#termsDialog"),acceptTerms=q("#acceptTerms"),continueWhatsapp=q("#continueWhatsapp");
const weekdayLabels=["Segunda","Terça","Quarta","Quinta","Sexta"];
function money(value){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:2}).format(value)}
function renderGallery(route){
  const setMain=photo=>{q("#galleryMainImage").src=photo[0];q("#galleryMainImage").alt=`${photo[1]}, ${photo[2]}`;q("#galleryMainTitle").textContent=photo[1];q("#galleryMainCaption").textContent=photo[2]};
  setMain(route.photos[0]);
  q("#galleryThumbs").innerHTML=route.photos.map((photo,index)=>`<button type="button" class="gallery-thumb ${index===0?"is-active":""}" data-photo="${index}" aria-label="Ver ${photo[1]}"><img src="${photo[0]}" alt="${photo[1]}" loading="lazy"><span>${photo[1]}</span></button>`).join("");
  document.querySelectorAll(".gallery-thumb").forEach(button=>button.addEventListener("click",()=>{setMain(route.photos[Number(button.dataset.photo)]);document.querySelectorAll(".gallery-thumb").forEach(item=>item.classList.toggle("is-active",item===button))}));
}
function selectDestination(key,scroll=false){
  const route=routes[key]; if(!route)return;
  q("#galleryHeading").textContent=`Veja o que você vai viver em ${route.title}`;q("#routeTitle").textContent=route.title;q("#routeLocation").textContent=route.location;q("#routeIntro").textContent=route.intro;q("#routeMap").href=route.map;
  q("#routeList").innerHTML=route.days.map((day,index)=>`<li><span>${weekdayLabels[index]}</span>${day}</li>`).join("");
  destinationSelect.value=route.select;
  document.querySelectorAll("[data-destination]").forEach(button=>{const active=button.dataset.destination===key;button.classList.toggle("is-active",active);button.setAttribute("aria-selected",String(active))});
  document.querySelectorAll("[data-choose]").forEach(button=>button.classList.toggle("is-active",button.dataset.choose===key));
  renderGallery(route);updateQuote();
  if(scroll)q("#destinos").scrollIntoView({behavior:"smooth",block:"start"});
}
function updateDays(){
  const month=months.find(item=>item.value===monthSelect.value)||months[0];
  const [year,monthNumber]=month.value.split("-").map(Number);
  const available=Array.from({length:month.end-month.start+1},(_,index)=>month.start+index).filter(day=>{const weekday=new Date(year,monthNumber-1,day).getDay();return weekday===0||weekday===6});
  daySelect.innerHTML=available.map(day=>{const weekday=new Date(year,monthNumber-1,day).getDay()===6?"sábado":"domingo";return `<option value="${day}">${weekday}, dia ${day}</option>`}).join("");
  updateQuote();
}
function updateQuote(){
  if(!monthSelect.value||!daySelect.value)return;
  const adults=Number(adultSelect.value),maxChildren=6-adults;
  Array.from(childSelect.options).forEach(option=>{option.disabled=Number(option.value)>maxChildren});
  if(Number(childSelect.value)>maxChildren)childSelect.value=String(maxChildren);
  const children=Number(childSelect.value),adultTotal=adults*PRICE_PER_PERSON,childTotal=children*(PRICE_PER_PERSON/2),total=adultTotal+childTotal;
  q("#totalPrice").textContent=money(total);
  q("#installmentPrice").textContent=`ou até 10 parcelas mensais de ${money(total/10)} sem juros`;
  q("#summaryLabel").textContent=children>0?"Total estimado • adultos + crianças":"Total estimado • pacote de 5 dias";
  q("#childPriceNotice").textContent=children>0?`${children} ${children===1?"criança":"crianças"} a ${money(PRICE_PER_PERSON/2)} cada`:"";
  q("#childPriceNotice").hidden=children===0;
}
function buildMessage(){
  const name=q("#customerName").value.trim(),origin=q("#originCity").value.trim(),adults=Number(adultSelect.value),children=Number(childSelect.value),month=months.find(item=>item.value===monthSelect.value),adultTotal=adults*PRICE_PER_PERSON,childTotal=children*(PRICE_PER_PERSON/2),total=adultTotal+childTotal;
  return ["Olá, tudo bem? Tenho interesse em um pacote da Gess Turismo.",`Meu nome: ${name}`,`Cidade de saída: ${origin}`,`Destino: ${destinationSelect.value}`,`Embarque desejado: dia ${daySelect.value} de ${month.label} (sábado ou domingo)`,"Pacote: 5 dias de roteiro fixo, de segunda a sexta","Hospedagem: hostel parceiro desde a chegada no fim de semana até o encerramento do roteiro","Incluso: voo, hostel com café da manhã, traslados programados e atividades anunciadas",`Adultos: ${adults} × ${money(PRICE_PER_PERSON)}`,`Crianças: ${children} × ${money(PRICE_PER_PERSON/2)}`,`Total estimado: ${money(total)}`,"Estou ciente de que a condição infantil depende da disponibilidade da tarifa aérea.","Li e aceitei o resumo das condições apresentado no site.","Tenho interesse em pagar o sinal de reserva e quitar o restante até 10 dias antes da viagem.","Quero confirmar voo, aeroporto, horários, traslado, hostel e disponibilidade. Pode me ajudar?"].join("\n");
}
function renderTermsSelection(){
  const adults=Number(adultSelect.value),children=Number(childSelect.value),total=adults*PRICE_PER_PERSON+children*(PRICE_PER_PERSON/2),month=months.find(item=>item.value===monthSelect.value);
  q("#termsSelection").innerHTML=`<span>Seu pedido</span><b>${destinationSelect.value}</b><small>Embarque dia ${daySelect.value} de ${month.label} • ${adults} ${adults===1?"adulto":"adultos"} • ${children} ${children===1?"criança":"crianças"} • Total estimado ${money(total)}</small>`;
}
function openTerms(){
  const form=q("#bookingForm");
  if(!form.reportValidity())return;
  renderTermsSelection();
  acceptTerms.checked=false;
  continueWhatsapp.disabled=true;
  if(typeof termsDialog.showModal==="function")termsDialog.showModal();
  else termsDialog.setAttribute("open","");
}
q("#bookingForm").addEventListener("submit",event=>{event.preventDefault();openTerms()});
whatsappButton.addEventListener("click",openTerms);
acceptTerms.addEventListener("change",()=>{continueWhatsapp.disabled=!acceptTerms.checked});
q("#termsClose").addEventListener("click",()=>termsDialog.close());
q("#cancelTerms").addEventListener("click",()=>termsDialog.close());
continueWhatsapp.addEventListener("click",()=>{if(!acceptTerms.checked)return;const base=WHATSAPP_NUMBER?`https://wa.me/${WHATSAPP_NUMBER}`:"https://wa.me/";window.open(`${base}?text=${encodeURIComponent(buildMessage())}`,"_blank","noopener");termsDialog.close()});
termsDialog.addEventListener("click",event=>{if(event.target===termsDialog)termsDialog.close()});
monthSelect.innerHTML=months.map(month=>`<option value="${month.value}">${month.label}</option>`).join("");
document.querySelectorAll("[data-destination]").forEach(button=>button.addEventListener("click",()=>selectDestination(button.dataset.destination)));
document.querySelectorAll("[data-choose]").forEach(button=>button.addEventListener("click",()=>selectDestination(button.dataset.choose,true)));
destinationSelect.addEventListener("change",()=>selectDestination(Object.keys(routes).find(key=>routes[key].select===destinationSelect.value)));
monthSelect.addEventListener("change",updateDays);
[daySelect,adultSelect,childSelect].forEach(field=>field.addEventListener("change",updateQuote));
updateDays();selectDestination("rio");
