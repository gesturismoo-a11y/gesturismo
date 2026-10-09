const getWhatsappNumber = () => window.GESS_CONFIG?.getWhatsappNumber() || "5511987785390";
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="pickups.css?v=1">');
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="site-polish.css?v=26">');
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="mobile-polish.css?v=4">');
const money = value => new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL"}).format(value);

const packages = {
  arraial: {
    title:"Arraial do Cabo", location:"Região dos Lagos • RJ", price:500, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Arraial no domingo, às 20h", hotel:true,
    intro:"Fim de semana de mar cristalino com hotel, café da manhã, mergulho, passeio de buggy e passeio de escuna pelas praias.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de escuna","Mergulho","Passeio de buggy"],
    days:["Sábado • Praia do Forno, Prainhas do Pontal do Atalaia, mergulho e check-in no hotel","Domingo • Passeio de escuna com Praia do Farol, Gruta Azul e paradas previstas no roteiro; passeio panorâmico de buggy e saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]},{region:"Minas Gerais",points:["Rodoviária de Belo Horizonte • Praça Rio Branco","Rodoviária de Barbacena","Terminal Rodoviário Miguel Mansur • Juiz de Fora"]},{region:"Rio de Janeiro",points:["Terminal Rodoviário Novo Rio","Terminal Roberto Silveira • Niterói","Terminal Leonel Brizola (Bingen) • Petrópolis"]}],
    photos:[["assets/arraial.jpg","Prainhas do Pontal do Atalaia","Arraial do Cabo • RJ"],["assets/arraial-forno.jpg","Praia do Forno","Arraial do Cabo • RJ"],["assets/arraial-farol.jpg","Praia do Farol","Acesso por barco"],["assets/arraial-praia-grande.jpg","Praia Grande","Arraial do Cabo • RJ"]]
  },
  campos: {
    title:"Campos do Jordão", location:"Serra da Mantiqueira • SP", price:150, priceContext:"Valor promocional do bate-volta", duration:"1 dia • bate-volta", transport:"Ônibus de excursão", returnTime:"Saída de Campos no fim do dia, prevista para 20h", hotel:false,
    intro:"Um dia inteiro na serra, sem hospedagem, com aproximadamente 3 horas de estrada a partir da capital paulista, além do tempo dos embarques.",
    includes:["Ônibus ida e volta","Coordenador da equipe","City tour de ônibus ou van","Tempo livre em Capivari"],
    days:["Manhã • Portal, Ducha de Prata e Morro do Elefante","Tarde • Vila Capivari, Boulevard Geneve e tempo livre para conhecer a gastronomia local","Noite • Encontro do grupo e saída prevista de Campos do Jordão às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]}],
    photos:[["assets/campos-1.jpg","Vila Capivari e paisagens da serra","Campos do Jordão • SP"],["assets/campos-2.jpg","Boulevard Geneve","Campos do Jordão • SP"],["assets/campos-3.jpg","Portal de Campos do Jordão","Serra da Mantiqueira • SP"],["assets/campos-4.jpg","Centro turístico","Campos do Jordão • SP"]]
  },
  guaruja: {
    title:"Guarujá", location:"Baixada Santista • SP", price:150, priceContext:"Lote promocional por pessoa", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída do Guarujá no domingo, às 20h", hotel:true,
    intro:"Embarque na sexta-feira à noite para aproveitar sábado e domingo na praia. O pacote inclui uma noite no hotel parceiro, de sábado para domingo, e café da manhã. Retorno no domingo.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Traslados locais de ônibus ou van"],
    days:["Sexta à noite • Embarque nos pontos e horários confirmados no grupo","Sábado • Praia da Enseada, Mirante da Campina e pernoite no hotel parceiro","Domingo • Café da manhã incluído, Pitangueiras, Astúrias e Praia do Tombo; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Terminal Ferrazópolis • São Bernardo do Campo"]}],
    photos:[["assets/guaruja-1.jpg","Praia da Enseada","Guarujá • SP"],["assets/guaruja-2.jpg","Enseada","Guarujá • SP"],["assets/guaruja-3.jpg","Orla do Guarujá","Baixada Santista • SP"],["assets/guaruja-1.jpg","Litoral do Guarujá","São Paulo"]]
  },
  bertioga: {
    title:"Bertioga", location:"Litoral paulista • SP", price:150, priceContext:"Lote promocional por pessoa", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Bertioga no domingo, às 20h", hotel:true,
    intro:"Fim de semana entre praias, Mata Atlântica e história, com hotel parceiro e café da manhã incluídos.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Traslados locais de ônibus ou van"],
    days:["Sábado • Praia da Enseada, Riviera de São Lourenço e check-in no hotel","Domingo • Forte São João pela manhã e tarde de praia em Itaguaré, com saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Shopping Internacional • Guarulhos","Terminal Estudantes • Mogi das Cruzes"]}],
    photos:[["assets/bertioga-1.jpg","Praia em Bertioga","Bertioga • SP"],["assets/bertioga-2.jpg","Litoral de Bertioga","Bertioga • SP"],["assets/bertioga-3.jpg","Forte São João","Bertioga • SP"],["assets/bertioga-4.jpg","Praias e Mata Atlântica","Bertioga • SP"]]
  },
  buzios: {
    title:"Búzios", location:"Região dos Lagos • RJ", price:500, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Búzios no domingo, às 20h", hotel:true,
    intro:"Fim de semana em praias famosas e na orla mais charmosa da Região dos Lagos, com hotel parceiro e café da manhã.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Traslados locais de ônibus ou van"],
    days:["Sábado • Praia de Geribá, Orla Bardot, Rua das Pedras e check-in no hotel","Domingo • João Fernandes, Azeda e Azedinha, com saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]},{region:"Rio de Janeiro",points:["Terminal Rodoviário Novo Rio","Terminal Roberto Silveira • Niterói","Terminal Rodoviário de Alcântara • São Gonçalo"]}],
    photos:[["assets/buzios-1.jpg","Armação dos Búzios","Região dos Lagos • RJ"],["assets/buzios-2.jpg","Praia da Armação","Búzios • RJ"],["assets/buzios-3.jpg","Praia de João Fernandes","Búzios • RJ"],["assets/buzios-4.jpg","João Fernandes","Búzios • RJ"]]
  },
  cananeia: {
    title:"Cananéia", location:"Vale do Ribeira • SP", price:450, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Cananéia no domingo, às 20h", hotel:true,
    intro:"Fim de semana entre o centro histórico, a orla e a natureza do litoral sul, com hotel parceiro e café da manhã.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Traslados locais de ônibus ou van","Passeio pela orla e centro histórico"],
    days:["Sábado • Centro histórico, Igreja Matriz de São João Batista, orla e check-in no hotel","Domingo • Dia de natureza e praia na região, conforme condições de navegação e operação; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Rodoviária de Registro"]}],
    photos:[["assets/cananeia-1.jpg","Praia do Itacuruçá","Ilha do Cardoso • Cananéia"],["assets/cananeia-2.jpg","Baía do Trapandé","Cananéia • SP"],["assets/cananeia-3.jpg","Praia do Fole","Ilha do Cardoso • Cananéia"],["assets/cananeia-4.jpg","Praia da Laje","Ilha do Cardoso • Cananéia"]]
  },
  capitolio: {
    title:"Capitólio", location:"Lago de Furnas • MG", price:300, priceContext:"Lote promocional com passeio de lancha", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Capitólio no domingo, às 20h", hotel:true,
    intro:"Fim de semana no Lago de Furnas com hotel, café da manhã e passeio de lancha pelos cânions incluído no roteiro.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de lancha","Traslados locais de ônibus ou van"],
    days:["Sábado • Mirantes, paisagens do Lago de Furnas e check-in no hotel","Domingo • Passeio de lancha pelos cânions e paradas autorizadas no roteiro; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Terminal Rodoviário Jabaquara"]},{region:"Minas Gerais",points:["Rodoviária de Belo Horizonte • Praça Rio Branco","Terminal Rodoviário de Passos","Terminal Rodoviário de Piumhi"]}],
    photos:[["assets/capitolio-1.jpg","Cânions do Lago de Furnas","Capitólio • MG"],["assets/capitolio-2.jpg","Paredões e águas de Furnas","Capitólio • MG"],["assets/capitolio-3.jpg","Passeio pelo Lago de Furnas","Capitólio • MG"],["assets/capitolio-4.jpg","Paisagens de Capitólio","Minas Gerais"]]
  },
  ilhabela: {
    title:"Ilhabela", location:"Litoral Norte • SP", price:150, priceContext:"Valor promocional do bate-volta", duration:"1 dia • bate-volta", transport:"Ônibus de excursão", returnTime:"Saída de Ilhabela no fim do dia, prevista para 20h", hotel:false,
    intro:"Um dia de mar, montanha e orla no Litoral Norte, com travessia de balsa e acompanhamento da equipe.",
    includes:["Ônibus ida e volta","Travessia de balsa","Coordenador da equipe","Traslados locais de ônibus ou van","Tempo livre na praia"],
    days:["Manhã • Travessia de balsa, Vila e Praia do Perequê","Tarde • Praia Grande e tempo livre para curtir o litoral","Noite • Encontro do grupo e saída prevista de Ilhabela às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Shopping Internacional • Guarulhos","Terminal Rodoviário de São José dos Campos"]}],
    photos:[["assets/ilhabela-1.jpg","Orla de Ilhabela","Ilhabela • SP"],["assets/ilhabela-2.jpg","Praias e Mata Atlântica","Ilhabela • SP"],["assets/ilhabela-3.jpg","Litoral de Ilhabela","Litoral Norte • SP"],["assets/ilhabela-4.jpg","Mar e montanhas","Ilhabela • SP"]]
  }
};

packages.angra={
  title:"Angra dos Reis",location:"Costa Verde • RJ",price:500,priceContext:"Pacote de dois dias por pessoa",duration:"2 dias • sábado e domingo",transport:"Ônibus de excursão",returnTime:"Retorno no domingo • horário informado pela equipe",hotel:true,
  intro:"Dois dias na Costa Verde, com hotel parceiro, café da manhã e acompanhamento. O pacote inclui escuna, mergulho e passeio de buggy, conforme a programação confirmada pela equipe.",
  includes:[...packages.arraial.includes],
  days:["Sábado • Centro de Angra, Praia do Anil e acomodação no hotel; atividades distribuídas pela equipe","Domingo • Passeio de escuna pela região de Ilha Grande, com paradas conforme maré e condições de navegação; retorno do grupo"],
  pickupGroups:structuredClone(packages.arraial.pickupGroups),
  photos:[["assets/angra.jpg","Angra dos Reis","Costa Verde • Rio de Janeiro"]]
};
packages.paraty={
  title:"Paraty",location:"Costa Verde • RJ",price:200,priceContext:"Bate-volta por pessoa",duration:"1 dia • bate-volta",transport:"Ônibus de excursão",returnTime:"Retorno ao fim do passeio • horário informado pela equipe",hotel:false,
  intro:"Um dia entre o centro histórico e o litoral de Paraty, com ônibus e coordenador acompanhando a excursão.",
  includes:["Ônibus ida e volta","Coordenador da equipe","Visita ao centro histórico","Tempo livre na praia"],
  days:["Manhã • Centro Histórico, Igreja de Santa Rita e orla","Tarde • Praia do Pontal e tempo livre; encontro para o retorno"],
  pickupGroups:structuredClone(packages.buzios.pickupGroups),
  photos:[["assets/paraty.jpg","Centro Histórico de Paraty","Costa Verde • Rio de Janeiro"]]
};
packages.hopi={
  title:"Hopi Hari",location:"Vinhedo • SP",price:150,priceContext:"Excursão de 08/11 • confirme ingresso e condições com a equipe",duration:"1 dia • 08/11/2026",transport:"Ônibus de excursão",returnTime:"Retorno após a programação • horário informado no grupo",hotel:false,fixedDate:"2026-11-08",
  intro:"Saída especial em 8 de novembro para a Hora do Horror, no Hopi Hari. Consulte com a equipe a composição do pacote de R$ 150 e as condições do ingresso antes do pagamento.",
  includes:["Ônibus ida e volta","Coordenador da equipe"],
  days:["Domingo, 08/11 • Embarques nos pontos organizados para o grupo","Parque • Atrações e Hora do Horror conforme o calendário e as regras do Hopi Hari","Retorno • Encontro com o coordenador no horário combinado"],
  pickupGroups:structuredClone(packages.campos.pickupGroups),
  photos:[["assets/hopi.jpg","Hopi Hari","Rodovia dos Bandeirantes, km 72 • Vinhedo, SP"]]
};
packages.copacabana={
  title:"Copacabana",location:"Rio de Janeiro • RJ",price:200,priceContext:"Bate-volta por pessoa",duration:"1 dia • bate-volta",transport:"Ônibus de excursão",returnTime:"Retorno ao fim do passeio • horário confirmado no grupo",hotel:false,
  intro:"Um dia para curtir a Praia de Copacabana e seu calçadão, com transporte de ida e volta e coordenador da equipe. Sem hospedagem. O horário de saída depende da região de embarque e pode ser na noite anterior.",
  includes:["Ônibus ida e volta","Coordenador da equipe","Dia na Praia de Copacabana","Passeio pelo calçadão"],
  days:["Manhã • Chegada à Praia de Copacabana e orientações do coordenador","Tarde • Tempo livre na praia e caminhada pelo calçadão","Retorno • Encontro do grupo no ponto e horário combinados"],
  pickupGroups:structuredClone(packages.buzios.pickupGroups),
  photos:[["assets/rio.jpg","Praia de Copacabana","Rio de Janeiro • RJ"]]
};
const sharedSaoPauloPickups=[
  "Diadema • ponto a combinar",
  "São Bernardo do Campo • Terminal Ferrazópolis",
  "Guarulhos • Shopping Internacional",
  "Campinas • ponto a combinar",
  "Piracicaba • ponto a combinar",
  "Americana • ponto a combinar",
  "Limeira • ponto a combinar",
  "Rio Claro • ponto a combinar",
  "Valinhos • ponto a combinar",
  "Serra Negra • ponto a combinar"
];
for(const pkg of Object.values(packages)){
  const sp=pkg.pickupGroups.find(group=>group.region==="São Paulo");
  if(sp)for(const point of sharedSaoPauloPickups){
    const city=point.split(" • ")[0];if(!sp.points.some(existing=>existing.includes(city)))sp.points.push(point);
  }
}
const travelSchedule=window.GESS_TRAVEL_SCHEDULE;
for(const [key,pkg] of Object.entries(packages))pkg.departures=travelSchedule.departures[key]||[];
const q = selector => document.querySelector(selector);
const destinationSelect=q("#destinationSelect"), travelerSelect=q("#travelerSelect"), childSelect=q("#childSelect"), pickupStateSelect=q("#pickupStateSelect"), departureSelect=q("#departureSelect"), dateSelect=q("#dateSelect"), dateHelp=q("#dateHelp"), termsDialog=q("#termsDialog"), acceptTerms=q("#acceptTerms"), continueWhatsapp=q("#continueWhatsapp");
const customerName=q('#customerName'),customerPhone=q('#customerPhone'),customerEmail=q('#customerEmail'),travelerNamesField=q('#travelerNames');
const packageKeys=Object.keys(packages);
let selectedKey="arraial";
let currentReservation=null;

const party=()=>{const adults=Number(travelerSelect.value||1),children=Number(childSelect.value||0);return{adults,children,travelers:adults+children}};
const fullNamePattern=/^[A-Za-zÀ-ÖØ-öø-ÿ'’-]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'’-]{2,})+$/;
const emailPattern=/^[^\s@]+@[^\s@]+\.com(?:\.[a-z]{2})?$/i;
const phoneDigits=value=>String(value||'').replace(/\D/g,'').replace(/^55(?=\d{11}$)/,'').slice(0,11);
const formatPhoneInput=value=>{const digits=phoneDigits(value);if(digits.length<=2)return digits?`(${digits}`:'';if(digits.length<=7)return `(${digits.slice(0,2)}) ${digits.slice(2)}`;return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`};
function validateBookingFields(){
  const name=customerName.value.trim().replace(/\s+/g,' '),email=customerEmail.value.trim(),phone=phoneDigits(customerPhone.value),others=party().travelers-1,names=travelerNamesField.value.split(/\n+/).map(value=>value.trim().replace(/\s+/g,' ')).filter(Boolean);
  customerName.value=name;customerName.setCustomValidity(fullNamePattern.test(name)?'':'Informe nome e sobrenome completos.');
  customerPhone.setCustomValidity(/^\d{2}9\d{8}$/.test(phone)?'':'Informe um celular válido com DDD: (00) 90000-0000.');
  customerEmail.setCustomValidity(emailPattern.test(email)?'':'Informe um e-mail válido terminado em .com ou .com.br.');
  travelerNamesField.setCustomValidity(others===0||names.length===others&&names.every(value=>fullNamePattern.test(value))?'':`Informe ${others===1?'o nome completo da outra pessoa':`os ${others} nomes completos, um por linha`}.`);
  return customerName.checkValidity()&&customerPhone.checkValidity()&&customerEmail.checkValidity()&&travelerNamesField.checkValidity();
}
customerName.maxLength=120;customerPhone.maxLength=15;customerPhone.inputMode='numeric';customerEmail.maxLength=160;
customerPhone.addEventListener('input',()=>{customerPhone.value=formatPhoneInput(customerPhone.value);customerPhone.setCustomValidity('')});
[customerName,customerEmail,travelerNamesField].forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
const tripTotal=pkg=>{const {adults,children}=party();return pkg.price*adults+(pkg.price/2)*children};
const enforcePartyLimit=()=>{const adults=Number(travelerSelect.value||1),maxChildren=Math.max(0,6-adults);if(Number(childSelect.value)>maxChildren)childSelect.value=String(maxChildren);[...childSelect.options].forEach(option=>option.disabled=Number(option.value)>maxChildren)};
const updateCompanionNames=()=>{const field=q("#travelerNames"),label=field.closest("label"),others=party().travelers-1;label.childNodes[0].textContent="Nomes das outras pessoas";label.classList.toggle("is-hidden",others===0);label.classList.add("companion-names");field.required=others>0;field.setCustomValidity('');if(others===0)field.value="";field.placeholder=others===1?"Nome completo da outra pessoa":`Informe os ${others} nomes, um por linha`};
const reservationFingerprint=()=>[q("#customerName").value.trim(),q("#customerPhone").value.trim(),q("#customerEmail").value.trim(),q("#travelerNames").value.trim(),selectedKey,dateSelect.value,departureSelect.value,travelerSelect.value,childSelect.value].join("|");
const createReservation=async()=>{
  const pkg=packages[selectedKey],{adults,children,travelers}=party(),total=tripTotal(pkg),fingerprint=reservationFingerprint();
  if(currentReservation?.fingerprint===fingerprint)return currentReservation.record;
  const payload={customer:q("#customerName").value.trim(),phone:q("#customerPhone").value.trim(),email:q("#customerEmail").value.trim(),travelerNames:q("#travelerNames").value.trim(),destinationKey:selectedKey,destination:pkg.title,date:dateSelect.value,pickup:departureSelect.value,adults,children,total};
  const response=await fetch('/api/reservations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const record=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(record.error||'Não foi possível registrar o pedido. Tente novamente.');
  currentReservation={fingerprint,record};return record;
};

function renderGallery(pkg){
  const setMain=photo=>{q("#galleryMainImage").src=photo[0];q("#galleryMainImage").alt=`${photo[1]}, ${photo[2]}`;q("#galleryMainTitle").textContent=photo[1];q("#galleryMainCaption").textContent=photo[2]};
  setMain(pkg.photos[0]);
  q("#galleryThumbs").hidden=pkg.photos.length<2;
  q("#galleryThumbs").innerHTML=pkg.photos.map((photo,index)=>`<button class="gallery-thumb ${index===0?"is-active":""}" type="button" data-photo="${index}"><img src="${photo[0]}" alt="${photo[1]}" loading="lazy"><span>${photo[1]}</span></button>`).join("");
  document.querySelectorAll(".gallery-thumb").forEach(button=>button.addEventListener("click",()=>{setMain(pkg.photos[Number(button.dataset.photo)]);document.querySelectorAll(".gallery-thumb").forEach(item=>item.classList.toggle("is-active",item===button))}));
}

function buildDates(pkg){
  const dates=travelSchedule.available(selectedKey);
  dateSelect.dataset.generatedDate=travelSchedule.saoPauloDateKey();
  dateSelect.innerHTML=dates.length?dates.map(departure=>`<option value="${departure.start}">${formatDeparture(departure)}</option>`).join(""):'<option value="">Agenda encerrada para este destino</option>';
  dateSelect.disabled=dates.length===0;
  dateHelp.textContent=dates.length>1?`${dates.length} saídas confirmadas disponíveis.`:dates.length===1?"Última saída confirmada disponível.":"As datas encerradas são removidas automaticamente.";
  q("#whatsappButton").disabled=dates.length===0;
  renderDepartureSchedule(pkg);
}

function refreshDates(){
  const today=travelSchedule.saoPauloDateKey();
  if(dateSelect.dataset.generatedDate===today)return;
  const previous=dateSelect.value;buildDates(packages[selectedKey]);
  if([...dateSelect.options].some(option=>option.value===previous))dateSelect.value=previous;
  updateBooking(false);
}

const departureFor=(value,pkg=packages[selectedKey])=>pkg.departures.find(departure=>departure.start===value);
const dateAtNoon=value=>new Date(`${value}T12:00:00-03:00`);
const shortDay=value=>dateAtNoon(value).toLocaleDateString("pt-BR",{timeZone:"America/Sao_Paulo",weekday:"long",day:"2-digit",month:"2-digit"});
function formatDeparture(departure){
  if(!departure)return "Nenhuma data disponível";
  if(departure.start===departure.end)return dateAtNoon(departure.start).toLocaleDateString("pt-BR",{timeZone:"America/Sao_Paulo",weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
  return `${shortDay(departure.start)} e ${shortDay(departure.end)}/${departure.end.slice(0,4)}`;
}
function formatTripDate(value,pkg=packages[selectedKey]){
  if(!value)return "Nenhuma data disponível";
  return formatDeparture(departureFor(value,pkg)||{start:value,end:value});
}

function renderDepartureSchedule(pkg){
  const available=travelSchedule.available(selectedKey);
  q("#routeDepartures").innerHTML=available.length?`<div><span>Próximas saídas confirmadas</span><b>Escolha uma destas datas no pedido</b></div><ul>${available.map((departure,index)=>`<li${index===0?' class="is-next"':''}><span>${index===0?'Próxima saída':'Saída seguinte'}</span><strong>${formatDeparture(departure)}</strong></li>`).join("")}</ul>`:`<div class="schedule-ended"><span>Agenda encerrada</span><b>As datas deste destino já passaram. Fale com a equipe sobre a próxima programação.</b></div>`;
}

function updateBooking(resetOptions=true){
  const pkg=packages[selectedKey];
  enforcePartyLimit();
  updateCompanionNames();
  if(resetOptions){
    pickupStateSelect.innerHTML=pkg.pickupGroups.map((group,index)=>`<option value="${index}">${group.region}</option>`).join("");
    updatePickupOptions();
    buildDates(pkg);
  }
  const {adults,children,travelers}=party(),total=tripTotal(pkg);
  q("#summaryLabel").textContent=`${pkg.duration} • ${adults} adulto${adults===1?"":"s"}${children?` + ${children} criança${children===1?"":"s"}`:""}`;
  q("#totalPrice").textContent=money(total);
  q("#installmentPrice").textContent=`Criança até 12 anos: ${money(pkg.price/2)} • sinal mínimo: ${money(Math.min(total,100*travelers))} (R$ 100 por viajante, limitado ao total do pacote)`;
  q("#whatsappButton").disabled=!dateSelect.value;
}

function updatePickupOptions(){
  const group=packages[selectedKey].pickupGroups[Number(pickupStateSelect.value)||0];
  departureSelect.innerHTML=group.points.map(point=>`<option value="${group.region} • ${point}">${point}</option>`).join("");
}

function selectPackage(key,scroll=false){
  selectedKey=key;const pkg=packages[key];
  q("#galleryHeading").textContent=`Conheça o pacote para ${pkg.title}`;
  q("#routeTitle").textContent=pkg.title;q("#routeLocation").textContent=pkg.location;q("#routeIntro").textContent=pkg.intro;
  q("#routeMeta").innerHTML=`<b>${pkg.duration}</b><span>${pkg.transport}</span><span>${pkg.returnTime}</span>`;
  q("#routeList").innerHTML=pkg.days.map((day,index)=>`<li><span>${String(index+1).padStart(2,"0")}</span>${day}</li>`).join("");
  q("#pickupList").innerHTML=pkg.pickupGroups.map(group=>`<li class="pickup-group"><b>${group.region}</b><div class="pickup-chips">${group.points.map(point=>`<span>${point}</span>`).join("")}</div></li>`).join("");
  q("#packageIncludes").innerHTML=`<div class="includes-heading"><span>Incluso no pacote</span><b>${pkg.hotel?"Fim de semana completo":"Bate-volta de um dia"}</b></div><div>${pkg.includes.map(item=>`<span>${item}</span>`).join("")}</div>`;
  q("#hotelLine").innerHTML=pkg.hotel?`<span>Hospedagem incluída</span><b>Hotel parceiro + café da manhã • nome e endereço a confirmar</b>`:`<span>Bate-volta de um dia</span><b>Este pacote não inclui hotel nem pernoite</b>`;
  q("#routePrice").innerHTML=`${money(pkg.price)} por pessoa<small>${pkg.priceContext}</small>`;
  renderGallery(pkg);
  document.querySelectorAll("[data-destination],[data-choose]").forEach(button=>button.classList.toggle("is-active",(button.dataset.destination||button.dataset.choose)===key));
  destinationSelect.value=key;updateBooking();
  if(scroll)q("#destinos").scrollIntoView({behavior:"smooth",block:"start"});
}

function buildMessage(record){
  const pkg=packages[selectedKey],{adults,children,travelers}=party(),total=tripTotal(pkg);
  return [`📋 *FORMULÁRIO DE INTERESSE PREENCHIDO*`,`*Gess Turismo*`,'',`🎫 *Reserva:* ${record.code}`,'',`👤 *DADOS DO RESPONSÁVEL*`,`• Nome: ${customerName.value.trim()}`,`• WhatsApp: ${customerPhone.value.trim()}`,`• E-mail: ${customerEmail.value.trim()}`,'',`🚌 *DETALHES DA VIAGEM*`,`• Destino: ${pkg.title}`,`• Duração: ${pkg.duration}`,`• Data desejada: ${formatTripDate(dateSelect.value,pkg)}`,`• Embarque: ${departureSelect.value}`,`• Transporte: ${pkg.transport}`,'',`👥 *VIAJANTES*`,`• Adultos/maiores de 12 anos: ${adults}`,`• Crianças até 12 anos: ${children}`,`• Total: ${travelers}`,`• Demais viajantes: ${travelerNamesField.value.trim()||'Não se aplica'}`,'',`💳 *VALORES*`,`• Total do pacote: ${money(total)}`,`• Adulto: ${money(pkg.price)}`,`• Criança até 12 anos: ${money(pkg.price/2)}`,`• Sinal mínimo: ${money(Math.min(total,100*travelers))}`,'',pkg.hotel?'🏨 Hotel parceiro e café da manhã incluídos.':'☀️ Passeio bate-volta, sem hospedagem.','🧭 Acompanhamento da equipe durante toda a excursão.','',`✅ Condições lidas e aceitas.`,`📅 Saldo integral até 7 dias antes da viagem.`,`📍 Pontos e horários finais serão informados no grupo.`,'',`*Aguardando confirmação de disponibilidade.* 🌴`].join("\n");
}

function openTerms(){
  if(!dateSelect.value){dateHelp.textContent="Não há uma saída ativa para este destino no momento.";return;}
  validateBookingFields();if(!q("#bookingForm").reportValidity())return;
  const pkg=packages[selectedKey],{adults,children}=party();
  q('.terms-legal').textContent='Este aceite registra seu pedido no painel e abre o atendimento no WhatsApp. Não gera cobrança nem garante a vaga antes da confirmação da equipe.';q('.terms-legal').style.color='';
  q("#termsSelection").innerHTML=`<span>Seu pedido</span><b>${pkg.title}</b><small>${formatTripDate(dateSelect.value,pkg)} • ${departureSelect.value} • ${adults} adulto${adults===1?"":"s"}${children?` + ${children} criança${children===1?"":"s"}`:""} • ${money(tripTotal(pkg))}</small>`;
  q("#dynamicStayTerm").textContent=selectedKey==='guaruja'?"Guarujá: embarque na sexta à noite, praia no sábado e domingo, uma noite de hotel de sábado para domingo e café da manhã incluídos. Retorno no domingo. Horários e hotel são confirmados pela equipe.":pkg.hotel?"O pacote inclui hotel parceiro e café da manhã. O nome e o endereço serão informados após a confirmação operacional.":`${pkg.title} é um passeio bate-volta de um dia e não inclui hotel ou pernoite.`;
  acceptTerms.checked=false;continueWhatsapp.disabled=true;termsDialog.showModal();
}

const nextDepartureLabel=key=>{const next=travelSchedule.available(key)[0];return next?formatDeparture(next).replace(/ de /g," "):"Agenda encerrada"};
q(".package-choice-grid").innerHTML=packageKeys.map(key=>`<button class="choice-button" data-choose="${key}" type="button"><b>${packages[key].title}</b><small>${packages[key].hotel?"2 dias":"1 dia"} • ${money(packages[key].price)}</small><em>${nextDepartureLabel(key)}</em></button>`).join("");
q(".destination-tabs").innerHTML=packageKeys.map(key=>`<button class="destination-tab" data-destination="${key}" type="button">${packages[key].title}</button>`).join("");
q("#destinos .eyebrow").textContent="Doze destinos para escolher";
q("#destinos .section-heading>p:last-child").textContent="Agenda confirmada de outubro a dezembro de 2026 e para o verão de janeiro de 2027. As datas encerradas saem automaticamente do site.";
q(".pickup-box").id="pontos-do-pacote";
q('.quick-nav a[href="#embarques"]').href="#pontos-do-pacote";
q(".faq-list details:nth-child(4) p").textContent="Os pacotes de dois dias — Arraial do Cabo, Guarujá, Bertioga, Búzios, Cananéia, Capitólio e Angra dos Reis — incluem hotel parceiro e café da manhã. Campos do Jordão, Ilhabela, Paraty, Copacabana e Hopi Hari são passeios de um dia e não incluem hotel.";
document.querySelectorAll("[data-destination]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.destination)));
document.querySelectorAll("[data-choose]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.choose,true)));
destinationSelect.addEventListener("change",()=>selectPackage(destinationSelect.value));
pickupStateSelect.addEventListener("change",updatePickupOptions);
travelerSelect.addEventListener("change",()=>updateBooking(false));
childSelect.addEventListener("change",()=>updateBooking(false));
q("#whatsappButton").addEventListener("click",openTerms);
q("#bookingForm").addEventListener("submit",event=>{event.preventDefault();openTerms()});
acceptTerms.addEventListener("change",()=>continueWhatsapp.disabled=!acceptTerms.checked);
q("#termsClose").addEventListener("click",()=>termsDialog.close());q("#cancelTerms").addEventListener("click",()=>termsDialog.close());
continueWhatsapp.addEventListener("click",async()=>{
  const original=continueWhatsapp.textContent,whatsappWindow=window.open('about:blank','_blank');continueWhatsapp.disabled=true;continueWhatsapp.textContent='Registrando pedido...';
  try{await window.GESS_CONFIG.ready;const record=await createReservation(),url=`https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(buildMessage(record))}`;if(whatsappWindow)whatsappWindow.location.href=url;else location.href=url;termsDialog.close();}
  catch(error){if(whatsappWindow)whatsappWindow.close();q('.terms-legal').textContent=error.message;q('.terms-legal').style.color='#b72d24';}
  finally{continueWhatsapp.textContent=original;continueWhatsapp.disabled=!acceptTerms.checked;}
});
destinationSelect.innerHTML=packageKeys.map(key=>`<option value="${key}">${packages[key].title} • ${money(packages[key].price)}</option>`).join("");
q("#hotelLine").insertAdjacentHTML("beforebegin",'<div class="package-includes" id="packageIncludes"></div>');
q(".terms-content section:nth-child(2) p").textContent="Você informa no formulário o estado e uma região de referência. A equipe monta a rota e divulga no grupo os pontos finais de coleta e horários.";
q(".terms-content section:nth-child(5) p").textContent="O sinal mínimo é de R$ 100,00 por viajante, limitado ao valor total do pacote. Você pode dividir o valor em pagamentos via Pix; o saldo restante aparecerá na cobrança e precisa estar totalmente quitado até 7 dias antes da viagem.";
q(".terms-content section:nth-child(4) b").textContent="Preço e crianças";
q(".terms-content section:nth-child(4) p").textContent="Crianças de até 12 anos pagam 50% do valor do pacote. A partir de 13 anos, aplica-se o preço integral. A caução mínima é calculada por viajante, incluindo crianças.";
q(".terms-content section:nth-child(8) p").textContent="Um coordenador da equipe acompanha toda a excursão. Escuna, mergulho, buggy e demais atividades só estão incluídos quando aparecem no roteiro escolhido e dependem das condições de segurança e operação.";
q(".flow-grid article:nth-child(4) p").textContent="Após pagar, selecione o comprovante e retorne ao WhatsApp com a mensagem pronta. Seus dados já estarão preenchidos.";
q(".terms-legal").textContent="Este aceite registra seu pedido no painel e abre o atendimento no WhatsApp. Não gera cobrança nem garante a vaga antes da confirmação da equipe.";
q(".pickup-heading span").textContent="Rota e embarques";
q(".pickup-heading b").textContent="Estados e pontos por onde o ônibus passa";
q(".pickup-box>small").textContent="A lista mostra as cidades e referências atendidas na rota. Você escolhe a opção mais conveniente; o ponto exato e o horário serão confirmados pela equipe no grupo da excursão.";
selectPackage("arraial");
window.addEventListener("focus",refreshDates);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)refreshDates()});
window.setInterval(refreshDates,60000);
