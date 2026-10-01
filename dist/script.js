const getWhatsappNumber = () => window.GESS_CONFIG?.getWhatsappNumber() || "5511987785390";
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="pickups.css?v=1">');
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="site-polish.css?v=1">');
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
    intro:"Dois dias nas praias mais conhecidas da Ilha de Santo Amaro, com hotel parceiro e café da manhã incluídos.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Traslados locais de ônibus ou van"],
    days:["Sábado • Praia da Enseada, Mirante da Campina e check-in no hotel","Domingo • Pitangueiras, Astúrias e Praia do Tombo, com saída às 20h"],
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

const q = selector => document.querySelector(selector);
const destinationSelect=q("#destinationSelect"), travelerSelect=q("#travelerSelect"), childSelect=q("#childSelect"), pickupStateSelect=q("#pickupStateSelect"), departureSelect=q("#departureSelect"), dateSelect=q("#dateSelect"), termsDialog=q("#termsDialog"), acceptTerms=q("#acceptTerms"), continueWhatsapp=q("#continueWhatsapp");
const packageKeys=Object.keys(packages);
const RESERVATIONS_KEY="gessTurismo.reservas";
let selectedKey="arraial";
let currentReservation=null;

const readReservations=()=>{try{return JSON.parse(localStorage.getItem(RESERVATIONS_KEY)||"[]")}catch(_error){return[]}};
const writeReservations=items=>localStorage.setItem(RESERVATIONS_KEY,JSON.stringify(items));
const party=()=>{const adults=Number(travelerSelect.value||1),children=Number(childSelect.value||0);return{adults,children,travelers:adults+children}};
const tripTotal=pkg=>{const {adults,children}=party();return pkg.price*adults+(pkg.price/2)*children};
const enforcePartyLimit=()=>{const adults=Number(travelerSelect.value||1),maxChildren=Math.max(0,6-adults);if(Number(childSelect.value)>maxChildren)childSelect.value=String(maxChildren);[...childSelect.options].forEach(option=>option.disabled=Number(option.value)>maxChildren)};
const updateCompanionNames=()=>{const field=q("#travelerNames"),label=field.closest("label"),others=party().travelers-1;label.childNodes[0].textContent="Nomes das outras pessoas";label.classList.toggle("is-hidden",others===0);label.classList.add("companion-names");field.required=others>0;if(others===0)field.value="";field.placeholder=others===1?"Nome completo da outra pessoa":`Informe os ${others} nomes, um por linha`};
const reservationFingerprint=()=>[q("#customerName").value.trim(),q("#customerPhone").value.trim(),q("#customerEmail").value.trim(),q("#travelerNames").value.trim(),selectedKey,dateSelect.value,departureSelect.value,travelerSelect.value,childSelect.value].join("|");
const createReservation=()=>{
  const pkg=packages[selectedKey],{adults,children,travelers}=party(),total=tripTotal(pkg),fingerprint=reservationFingerprint();
  if(currentReservation?.fingerprint===fingerprint)return currentReservation.record;
  const record={id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,code:`GESS-${String(Date.now()).slice(-6)}`,customer:q("#customerName").value.trim(),phone:q("#customerPhone").value.trim(),email:q("#customerEmail").value.trim(),travelerNames:q("#travelerNames").value.trim(),destinationKey:selectedKey,destination:pkg.title,date:dateSelect.value,pickup:departureSelect.value,adults,children,travelers,total,minDeposit:100*travelers,pricePerPerson:pkg.price,duration:pkg.duration,hotel:pkg.hotel,status:"Aguardando cobrança",createdAt:new Date().toISOString(),amountNow:0,balance:total,pix:"",paymentLink:"",reminder:""};
  const items=readReservations();items.unshift(record);writeReservations(items);currentReservation={fingerprint,record};return record;
};

function renderGallery(pkg){
  const setMain=photo=>{q("#galleryMainImage").src=photo[0];q("#galleryMainImage").alt=`${photo[1]}, ${photo[2]}`;q("#galleryMainTitle").textContent=photo[1];q("#galleryMainCaption").textContent=photo[2]};
  setMain(pkg.photos[0]);
  q("#galleryThumbs").innerHTML=pkg.photos.map((photo,index)=>`<button class="gallery-thumb ${index===0?"is-active":""}" type="button" data-photo="${index}"><img src="${photo[0]}" alt="${photo[1]}" loading="lazy"><span>${photo[1]}</span></button>`).join("");
  document.querySelectorAll(".gallery-thumb").forEach(button=>button.addEventListener("click",()=>{setMain(pkg.photos[Number(button.dataset.photo)]);document.querySelectorAll(".gallery-thumb").forEach(item=>item.classList.toggle("is-active",item===button))}));
}

function buildDates(pkg){
  const dates=[];const cursor=new Date();cursor.setHours(12,0,0,0);dateSelect.dataset.generatedDate=dateKey(cursor);const salesEnd=new Date(2026,11,20,12,0,0,0);
  for(let offset=1;offset<=240;offset++){
    const date=new Date(cursor);date.setDate(cursor.getDate()+offset);
    if(date>salesEnd)break;
    const valid=pkg.hotel?date.getDay()===6:[0,6].includes(date.getDay());
    if(valid) dates.push(date);
  }
  dateSelect.innerHTML=dates.length?dates.map(date=>{const value=date.toISOString().slice(0,10);return `<option value="${value}">${formatTripDate(value,pkg)}</option>`}).join(""):'<option value="">Nenhuma data disponível</option>';
}

const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
function refreshDates(){
  const today=dateKey(new Date());
  if(dateSelect.dataset.generatedDate===today)return;
  const previous=dateSelect.value;buildDates(packages[selectedKey]);
  if([...dateSelect.options].some(option=>option.value===previous))dateSelect.value=previous;
  updateBooking(false);
}

function formatTripDate(value,pkg=packages[selectedKey]){
  if(!value)return "Nenhuma data disponível";
  const start=new Date(`${value}T12:00:00`);
  const dayLabel=date=>date.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"2-digit"});
  if(pkg.hotel){const end=new Date(start);end.setDate(start.getDate()+1);return `${dayLabel(start)} e ${dayLabel(end)} de ${end.getFullYear()}`}
  return start.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
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
  q("#installmentPrice").textContent=`Criança até 12 anos: ${money(pkg.price/2)} • caução mínima: ${money(100*travelers)} (${money(100)} por viajante)`;
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
  return ["Olá, tudo bem? Preenchi meu pedido no site da Gess Turismo.",`Reserva: ${record.code}`,`Nome: ${q("#customerName").value.trim()}`,`WhatsApp: ${q("#customerPhone").value.trim()}`,`E-mail: ${q("#customerEmail").value.trim()}`,`Pacote: ${pkg.title} — ${pkg.duration}`,`Data desejada: ${formatTripDate(dateSelect.value,pkg)}`,`Região de referência para embarque: ${departureSelect.value}`,`Adultos/maiores de 12 anos: ${adults}`,`Crianças até 12 anos: ${children}`,`Total de viajantes: ${travelers}`,`Nomes dos demais viajantes: ${q("#travelerNames").value.trim()||"Não se aplica"}`,`Valor do pacote: ${money(total)} (adulto ${money(pkg.price)}; criança até 12 anos ${money(pkg.price/2)})`,`Caução mínima: ${money(100*travelers)} (${money(100)} por viajante)`,`Transporte: ${pkg.transport}`,"Pagamento: pode ser dividido em pagamentos via Pix; o saldo precisa estar quitado até 7 dias antes da viagem.","Acompanhamento: coordenador da equipe durante toda a excursão",pkg.hotel?"Hospedagem: hotel parceiro com café da manhã incluído":"Hospedagem: não incluída; pacote bate-volta","Estou ciente de que os pontos da rota, horários e detalhes serão divulgados no grupo da excursão.","Quero confirmar disponibilidade e receber as próximas orientações."].join("\n");
}

function openTerms(){
  if(!q("#bookingForm").reportValidity())return;
  const pkg=packages[selectedKey],{adults,children}=party();
  q("#termsSelection").innerHTML=`<span>Seu pedido</span><b>${pkg.title}</b><small>${formatTripDate(dateSelect.value,pkg)} • ${departureSelect.value} • ${adults} adulto${adults===1?"":"s"}${children?` + ${children} criança${children===1?"":"s"}`:""} • ${money(tripTotal(pkg))}</small>`;
  q("#dynamicStayTerm").textContent=pkg.hotel?"O pacote inclui hotel parceiro e café da manhã. O nome e o endereço serão informados após a confirmação operacional.":`${pkg.title} é um passeio bate-volta de um dia e não inclui hotel ou pernoite.`;
  acceptTerms.checked=false;continueWhatsapp.disabled=true;termsDialog.showModal();
}

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
continueWhatsapp.addEventListener("click",()=>{const record=createReservation();window.open(`https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(buildMessage(record))}`,"_blank","noopener");termsDialog.close()});
destinationSelect.innerHTML=packageKeys.map(key=>`<option value="${key}">${packages[key].title} • ${money(packages[key].price)}</option>`).join("");
q("#hotelLine").insertAdjacentHTML("beforebegin",'<div class="package-includes" id="packageIncludes"></div>');
q(".terms-content section:nth-child(2) p").textContent="Você informa no formulário o estado e uma região de referência. A equipe monta a rota e divulga no grupo os pontos finais de coleta e horários.";
q(".terms-content section:nth-child(5) p").textContent="A caução mínima é de R$ 100,00 por viajante. Você pode dividir o valor em pagamentos via Pix; o saldo restante aparecerá na cobrança e precisa estar totalmente quitado até 7 dias antes da viagem.";
q(".terms-content section:nth-child(4) b").textContent="Preço e crianças";
q(".terms-content section:nth-child(4) p").textContent="Crianças de até 12 anos pagam 50% do valor do pacote. A partir de 13 anos, aplica-se o preço integral. A caução mínima é calculada por viajante, incluindo crianças.";
q(".terms-content section:nth-child(8) p").textContent="Um coordenador da equipe acompanha toda a excursão. Escuna, mergulho, buggy e demais atividades só estão incluídos quando aparecem no roteiro escolhido e dependem das condições de segurança e operação.";
q(".flow-grid article:nth-child(4) p").textContent="Após pagar, selecione o comprovante e retorne ao WhatsApp com a mensagem pronta. Seus dados já estarão preenchidos.";
q(".terms-legal").textContent="Este aceite registra seu pedido no painel e abre o atendimento no WhatsApp. Não gera cobrança nem garante a vaga antes da confirmação da equipe.";
q(".pickup-heading span").textContent="Rota e embarques";
q(".pickup-heading b").textContent="Estados e pontos por onde o ônibus passa";
q(".pickup-box>small").textContent="A lista mostra as referências de cada estado atravessado até o destino. Você escolhe a região mais conveniente e a equipe confirma o ponto e o horário no grupo da excursão.";
selectPackage("arraial");
window.addEventListener("focus",refreshDates);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)refreshDates()});
window.setInterval(refreshDates,60000);
