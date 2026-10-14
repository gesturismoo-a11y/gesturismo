const getWhatsappNumber = () => window.GESS_CONFIG?.getWhatsappNumber() || "5511987785390";
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="pickups.css?v=3">');
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="site-polish.css?v=26">');
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="mobile-polish.css?v=6">');
const money = value => new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL"}).format(value);

const packages = {
  arraial: {
    title:"Arraial do Cabo", location:"Região dos Lagos • RJ", price:450, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Arraial no domingo, às 20h", hotel:true,
    intro:"Dois dias em Arraial do Cabo com hotel, café da manhã, passeio de lancha, buggy e mergulho acompanhado de instrutor. Explore as praias e a vida marinha.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de lancha","Mergulho com instrutor","Passeio de buggy"],
    days:["Sábado • Praia do Forno, passeio panorâmico de buggy com vista das Prainhas do Pontal do Atalaia, mergulho acompanhado e hotel","Domingo • Passeio de lancha com Praia do Farol e Gruta Azul, conforme liberação e condições do mar; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]},{region:"Minas Gerais",points:["Rodoviária de Belo Horizonte • Praça Rio Branco","Rodoviária de Barbacena","Terminal Rodoviário Miguel Mansur • Juiz de Fora"]},{region:"Rio de Janeiro",points:["Terminal Rodoviário Novo Rio","Terminal Roberto Silveira • Niterói","Terminal Leonel Brizola (Bingen) • Petrópolis"]}],
    photos:[["assets/arraial.jpg","Prainhas do Pontal do Atalaia","Arraial do Cabo • RJ"],["assets/arraial-forno.jpg","Praia do Forno","Arraial do Cabo • RJ"],["assets/arraial-farol.jpg","Praia do Farol","Acesso por barco"],["assets/arraial-praia-grande.jpg","Praia Grande","Arraial do Cabo • RJ"]]
  },
  campos: {
    title:"Campos do Jordão", location:"Serra da Mantiqueira • SP", price:150, priceContext:"Valor promocional do bate-volta", duration:"1 dia • bate-volta", transport:"Ônibus de excursão", returnTime:"Saída de Campos no fim do dia, prevista para 20h", hotel:false,
    intro:"Um dia inteiro na serra, sem hospedagem, com aproximadamente 3 horas de estrada a partir da capital paulista, além do tempo dos embarques.",
    includes:["Ônibus ida e volta","Café da manhã","Coordenador da equipe","Passeio local de van","Tempo livre em Capivari"],
    days:["Manhã • Portal, Ducha de Prata e Morro do Elefante","Tarde • Vila Capivari, Boulevard Geneve e tempo livre para conhecer a gastronomia local","Noite • Encontro do grupo e saída prevista de Campos do Jordão às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]}],
    photos:[["assets/campos-1.jpg","Vila Capivari e paisagens da serra","Campos do Jordão • SP"],["assets/campos-2.jpg","Boulevard Geneve","Campos do Jordão • SP"],["assets/campos-3.jpg","Portal de Campos do Jordão","Serra da Mantiqueira • SP"],["assets/campos-4.jpg","Centro turístico","Campos do Jordão • SP"]]
  },
  guaruja: {
    title:"Guarujá", location:"Baixada Santista • SP", price:200, priceContext:"Valor regular por pessoa", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída do Guarujá no domingo, às 20h", hotel:true,
    intro:"Embarque na sexta à noite para dois dias de praia, com uma noite de hotel de sábado para domingo, café da manhã, almoço, passeio de lancha e buggy incluídos. Retorno no domingo.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Almoço","Passeio de lancha","Passeio de buggy"],
    days:["Sexta à noite • Embarque nos pontos e horários confirmados no grupo","Sábado • Praia da Enseada, lancha, almoço e pernoite no hotel parceiro","Domingo • Café da manhã, buggy por praias e mirantes, almoço e tempo de praia; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Terminal Ferrazópolis • São Bernardo do Campo"]}],
    photos:[["assets/guaruja-1.jpg","Praia da Enseada","Guarujá • SP"],["assets/guaruja-2.jpg","Enseada","Guarujá • SP"],["assets/guaruja-3.jpg","Orla do Guarujá","Baixada Santista • SP"],["assets/guaruja-1.jpg","Litoral do Guarujá","São Paulo"]]
  },
  bertioga: {
    title:"Bertioga", location:"Litoral paulista • SP", price:250, priceContext:"Valor por pessoa", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Bertioga no domingo, às 20h", hotel:true,
    intro:"Dois dias entre praias, Mata Atlântica e história, com hotel parceiro, café da manhã, almoço e passeio de lancha incluídos.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Almoço","Passeio de lancha","Traslados locais de ônibus ou van"],
    days:["Sábado • Praia da Enseada, Riviera de São Lourenço, almoço e hotel","Domingo • Café da manhã, passeio de lancha pelo canal de Bertioga, região do Forte São João, almoço e tempo de praia; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Shopping Internacional • Guarulhos","Terminal Estudantes • Mogi das Cruzes"]}],
    photos:[["assets/bertioga-1.jpg","Praia em Bertioga","Bertioga • SP"],["assets/bertioga-2.jpg","Litoral de Bertioga","Bertioga • SP"],["assets/bertioga-3.jpg","Forte São João","Bertioga • SP"],["assets/bertioga-4.jpg","Praias e Mata Atlântica","Bertioga • SP"]]
  },
  buzios: {
    title:"Búzios", location:"Região dos Lagos • RJ", price:450, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Búzios no domingo, às 20h", hotel:true,
    intro:"Dois dias na Região dos Lagos com hotel, café da manhã, passeio de lancha, buggy por praias e mirantes e mergulho acompanhado de instrutor.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de lancha","Passeio de buggy","Mergulho com instrutor"],
    days:["Sábado • Passeio de buggy por praias e mirantes, Geribá, Orla Bardot e hotel; tempo livre na Rua das Pedras","Domingo • Mergulho acompanhado e passeio de lancha pela costa; região de João Fernandes e Azeda conforme condições do mar; saída às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê"]},{region:"Rio de Janeiro",points:["Terminal Rodoviário Novo Rio","Terminal Roberto Silveira • Niterói","Terminal Rodoviário de Alcântara • São Gonçalo"]}],
    photos:[["assets/buzios-1.jpg","Armação dos Búzios","Região dos Lagos • RJ"],["assets/buzios-2.jpg","Praia da Armação","Búzios • RJ"],["assets/buzios-3.jpg","Praia de João Fernandes","Búzios • RJ"],["assets/buzios-4.jpg","João Fernandes","Búzios • RJ"]]
  },
  cananeia: {
    title:"Cananéia", location:"Vale do Ribeira • SP", price:400, priceContext:"Lote promocional com hotel e café da manhã", duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Cananéia no domingo, às 20h", hotel:true,
    intro:"Dois dias no litoral sul, com centro histórico, passeio de lancha na região da Ilha do Cardoso, hotel parceiro e café da manhã.",
    includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de lancha","Centro histórico e orla"],
    days:["Sábado • Centro histórico, Igreja Matriz de São João Batista, orla e hotel","Domingo • Café da manhã e passeio de lancha na região da Ilha do Cardoso, com praia e paradas autorizadas; saída às 20h"],
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
    intro:"Um dia em Ilhabela com ônibus, balsa, café da manhã, passeio de lancha e mergulho acompanhado de instrutor. Pacote bate-volta, sem hotel.",
    includes:["Ônibus ida e volta","Café da manhã","Coordenador da equipe","Travessia de balsa","Passeio de lancha","Mergulho com instrutor"],
    days:["Manhã • Travessia de balsa, café da manhã e mergulho acompanhado de instrutor","Tarde • Passeio de lancha pelo litoral e tempo de praia conforme a operação; visita à Vila se houver tempo","Noite • Encontro do grupo e saída prevista de Ilhabela às 20h"],
    pickupGroups:[{region:"São Paulo",points:["Terminal Rodoviário Jabaquara","Terminal Rodoviário Barra Funda","Terminal Rodoviário Tietê","Shopping Internacional • Guarulhos","Terminal Rodoviário de São José dos Campos"]}],
    photos:[["assets/ilhabela-1.jpg","Orla de Ilhabela","Ilhabela • SP"],["assets/ilhabela-2.jpg","Praias e Mata Atlântica","Ilhabela • SP"],["assets/ilhabela-3.jpg","Litoral de Ilhabela","Litoral Norte • SP"],["assets/ilhabela-4.jpg","Mar e montanhas","Ilhabela • SP"]]
  }
};

packages.angra={
  title:"Angra dos Reis",location:"Costa Verde • RJ",price:450,priceContext:"Pacote de dois dias por pessoa",duration:"2 dias • sábado e domingo",transport:"Ônibus de excursão",returnTime:"Retorno no domingo • horário informado pela equipe",hotel:true,
  intro:"Dois dias na Costa Verde com hotel, café da manhã, passeio de lancha e mergulho acompanhado de instrutor na região de Angra e Ilha Grande.",
  includes:["Ônibus ida e volta","Hotel parceiro","Café da manhã","Coordenador da equipe","Passeio de lancha","Mergulho com instrutor"],
  days:["Sábado • Centro de Angra, mergulho acompanhado de instrutor, Praia do Anil e hotel","Domingo • Café da manhã e passeio de lancha pela região de Ilha Grande, com paradas autorizadas; retorno do grupo"],
  pickupGroups:structuredClone(packages.arraial.pickupGroups),
  photos:[["assets/angra.jpg","Angra dos Reis","Costa Verde • Rio de Janeiro"]]
};
packages.paraty={
  title:"Paraty",location:"Costa Verde • RJ",price:200,priceContext:"Bate-volta por pessoa",duration:"1 dia • bate-volta",transport:"Ônibus de excursão",returnTime:"Retorno ao fim do passeio • horário informado pela equipe",hotel:false,
  intro:"Bate-volta na Costa Verde com café da manhã, passeio de lancha, mergulho acompanhado e passagem pelo centro histórico. Sem hospedagem.",
  includes:["Ônibus ida e volta","Café da manhã","Coordenador da equipe","Passeio de lancha","Mergulho com instrutor","Centro histórico"],
  days:["Manhã • Café da manhã e mergulho acompanhado na baía de Paraty","Tarde • Passeio de lancha pelas ilhas e breve visita ao centro histórico e à Igreja de Santa Rita, conforme horários da operação; retorno do grupo"],
  pickupGroups:structuredClone(packages.buzios.pickupGroups),
  photos:[["assets/paraty.jpg","Centro Histórico de Paraty","Costa Verde • Rio de Janeiro"]]
};
packages.hopi={
  title:"Hopi Hari",location:"Vinhedo • SP",price:150,priceContext:"Excursão de 08/11 • confirme ingresso e condições com a equipe",duration:"1 dia • 08/11/2026",transport:"Ônibus de excursão",returnTime:"Retorno após a programação • horário informado no grupo",hotel:false,fixedDate:"2026-11-08",
  intro:"Saída especial em 8 de novembro para a Hora do Horror, no Hopi Hari. Consulte com a equipe a composição do pacote de R$ 150 e as condições do ingresso antes do pagamento.",
  includes:["Ônibus ida e volta","Café da manhã","Coordenador da equipe"],
  days:["Domingo, 08/11 • Embarques nos pontos organizados para o grupo","Parque • Atrações e Hora do Horror conforme o calendário e as regras do Hopi Hari","Retorno • Encontro com o coordenador no horário combinado"],
  pickupGroups:structuredClone(packages.campos.pickupGroups),
  photos:[["assets/hopi.jpg","Hopi Hari","Rodovia dos Bandeirantes, km 72 • Vinhedo, SP"]]
};
packages.copacabana={
  title:"Copacabana",location:"Rio de Janeiro • RJ",price:200,priceContext:"Bate-volta por pessoa",duration:"1 dia • bate-volta",transport:"Ônibus de excursão",returnTime:"Retorno ao fim do passeio • horário confirmado no grupo",hotel:false,
  intro:"Bate-volta com ônibus, café da manhã, coordenador, tempo na Praia de Copacabana e passeio de lancha pela orla do Rio. O embarque da lancha acontece em ponto náutico definido pela equipe, com traslado incluído. Sem hotel.",
  includes:["Ônibus ida e volta","Café da manhã","Coordenador da equipe","Passeio de lancha","Traslado ao embarque náutico","Praia e calçadão"],
  days:["Manhã • Café da manhã, chegada à Praia de Copacabana e orientações do coordenador","Tarde • Passeio de lancha pela orla, conforme condições de navegação, e tempo livre na praia e no calçadão","Retorno • Encontro do grupo no ponto e horário combinados"],
  pickupGroups:structuredClone(packages.buzios.pickupGroups),
  photos:[["assets/rio.jpg","Praia de Copacabana","Rio de Janeiro • RJ"]]
};
const sharedCapitalPickups=[
  "Capital • Centro • Terminal Parque Dom Pedro II — Av. do Exterior, s/n, Sé",
  "Capital • Centro-Oeste • Terminal Palmeiras–Barra Funda — Av. Auro Soares de Moura Andrade, 664, Barra Funda",
  "Capital • Zona Norte • Terminal Rodoviário Tietê — Av. Cruzeiro do Sul, 1.800, Santana",
  "Capital • Zona Noroeste • Terminal Pirituba — Av. Dr. Felipe Pinel, 60, Pirituba",
  "Capital • Zona Sul • Terminal Metropolitano Jabaquara — Rua Nelson Fernandes, s/n, Jabaquara",
  "Capital • Zona Sul • Terminal Santo Amaro — Av. Padre José Maria, 400, Santo Amaro",
  "Capital • Zona Leste • Terminal Corinthians–Itaquera — Av. Dr. Luís Aires, s/n, Itaquera",
  "Capital • Extremo Leste • Terminal Metropolitano São Mateus — Av. Adélia Chohfi, 100, Jardim Vera Cruz",
  "Capital • Zona Oeste • Terminal Lapa — Praça Miguel Dell’Erba, 50, Lapa",
  "Capital • Zona Oeste • Terminal Pinheiros — Rua Gilberto Sabino, 130, Pinheiros",
  "Capital • Zona Sudeste • Terminal Vila Prudente — Av. Prof. Luís Ignácio de Anhaia Mello, 1.359, Vila Prudente"
];
const sharedRegionalSaoPauloPickups=[
  "Diadema • Terminal Metropolitano Diadema — Av. Conceição, 7.000, Parque Mamede",
  "São Bernardo do Campo • Terminal Metropolitano Ferrazópolis — Rua Pedro Henry, 250, Vila Olga",
  "Guarulhos • Internacional Shopping — Rodovia Presidente Dutra, Saída 225, Itapegica",
  "Campinas • Terminal Multimodal Ramos de Azevedo — Rua Dr. Pereira Lima, s/n, Vila Industrial",
  "Piracicaba • Terminal Rodoviário Intermunicipal (TRI) — Av. Armando de Salles Oliveira, 2.344, Centro",
  "Americana • Terminal Rodoviário Francisco Luiz Bendilatti — Rua Ítalo Boscheiro, 220, Campo Limpo",
  "Limeira • Terminal Rodoviário Comendador Agostinho Prada — Rua Barão de Campinas, 50, Centro",
  "Rio Claro • Terminal Rodoviário de Rio Claro — Av. Presidente Tancredo de Almeida Neves, 700, Jardim Claret",
  "Valinhos • Terminal Rodoviário Mário Rolim Telles — Av. dos Esportes, s/n, Centro",
  "Serra Negra • Terminal Rodoviário de Serra Negra — Praça Sesquicentenário, s/n, Centro"
];
for(const pkg of Object.values(packages)){
  const sp=pkg.pickupGroups.find(group=>group.region==="São Paulo");
  if(!sp)continue;
  const baseTerminals=["Jabaquara","Barra Funda","Tietê"];
  const regionalCities=sharedRegionalSaoPauloPickups.map(point=>point.split(" • ")[0]);
  const packageSpecific=sp.points.filter(point=>!baseTerminals.some(terminal=>point.includes(terminal))&&!regionalCities.some(city=>point.includes(city)));
  sp.points=[...sharedCapitalPickups,...sharedRegionalSaoPauloPickups,...packageSpecific];
}
const travelSchedule=window.GESS_TRAVEL_SCHEDULE;
for(const [key,pkg] of Object.entries(packages))pkg.departures=travelSchedule.departures[key]||[];
const q = selector => document.querySelector(selector);
const destinationSelect=q("#destinationSelect"), travelerSelect=q("#travelerSelect"), childSelect=q("#childSelect"), pickupStateSelect=q("#pickupStateSelect"), departureSelect=q("#departureSelect"), dateSelect=q("#dateSelect"), dateHelp=q("#dateHelp"), termsDialog=q("#termsDialog"), acceptTerms=q("#acceptTerms"), continueWhatsapp=q("#continueWhatsapp");
const pickupAddress=departureSelect.parentElement.querySelector(".field-help");
pickupAddress.id="pickupAddress";pickupAddress.classList.add("pickup-address");pickupAddress.setAttribute("aria-live","polite");
departureSelect.parentElement.childNodes[0].textContent="Local de embarque";
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
  departureSelect.innerHTML=group.points.map(point=>{const [reference,address]=point.split(" — ");return `<option value="${group.region} • ${point}" data-address="${address||''}">${reference}</option>`}).join("");
  updatePickupAddress();
}

function updatePickupAddress(){
  const option=departureSelect.selectedOptions[0],address=q("#pickupAddress");
  if(!address||!option)return;
  address.textContent=option.dataset.address?`Endereço de referência: ${option.dataset.address}`:"O endereço e o horário desta referência serão confirmados pela equipe no grupo.";
}

function selectPackage(key,scroll=false){
  selectedKey=key;const pkg=packages[key];
  q("#galleryHeading").textContent=`Conheça o pacote para ${pkg.title}`;
  q("#routeTitle").textContent=pkg.title;q("#routeLocation").textContent=pkg.location;q("#routeIntro").textContent=pkg.intro;
  q("#routeMeta").innerHTML=`<b>${pkg.duration}</b><span>${pkg.transport}</span><span>${pkg.returnTime}</span>`;
  q("#routeList").innerHTML=pkg.days.map((day,index)=>`<li><span>${String(index+1).padStart(2,"0")}</span>${day}</li>`).join("");
  const pickupChips=points=>`<div class="pickup-chips">${points.map(point=>{const [reference,address]=point.split(" — ");return `<span class="pickup-chip"><b>${reference}</b>${address?`<small>${address}</small>`:''}</span>`}).join("")}</div>`;
  q("#pickupList").innerHTML=pkg.pickupGroups.map(group=>{
    if(group.region!=="São Paulo")return `<li class="pickup-group"><b>${group.region}</b>${pickupChips(group.points)}</li>`;
    const capital=group.points.filter(point=>point.startsWith("Capital • ")),regional=group.points.filter(point=>!point.startsWith("Capital • "));
    return `<li class="pickup-group pickup-group-sp"><b>São Paulo</b><div class="pickup-subgroups"><section class="pickup-subgroup"><div><strong>Capital</strong><small>Centro, Norte, Sul, Leste, Oeste e Sudeste</small></div>${pickupChips(capital)}</section>${regional.length?`<section class="pickup-subgroup"><div><strong>ABC, Guarulhos e interior</strong><small>Pontos já atendidos pela rota</small></div>${pickupChips(regional)}</section>`:""}</div></li>`;
  }).join("");
  q("#packageIncludes").innerHTML=`<div class="includes-heading"><span>Incluso no pacote</span><b>${pkg.hotel?"Fim de semana completo":"Bate-volta de um dia"}</b></div><div>${pkg.includes.map(item=>`<span>${item}</span>`).join("")}</div>`;
  q("#hotelLine").innerHTML=pkg.hotel?`<span>Hospedagem incluída</span><b>Hotel parceiro + café da manhã • nome e endereço a confirmar</b>`:`<span>Bate-volta de um dia</span><b>Café da manhã incluído • sem hotel ou pernoite</b>`;
  q("#routePrice").innerHTML=`${money(pkg.price)} por pessoa<small>${pkg.priceContext}</small>`;
  renderGallery(pkg);
  document.querySelectorAll("[data-destination],[data-choose]").forEach(button=>button.classList.toggle("is-active",(button.dataset.destination||button.dataset.choose)===key));
  destinationSelect.value=key;updateBooking();
  if(scroll)q("#destinos").scrollIntoView({behavior:"smooth",block:"start"});
}

function buildMessage(record){
  const pkg=packages[selectedKey],{adults,children,travelers}=party(),total=tripTotal(pkg);
  return [`📋 *FORMULÁRIO DE INTERESSE PREENCHIDO*`,`*Gess Turismo*`,'',`🎫 *Reserva:* ${record.code}`,'',`👤 *DADOS DO RESPONSÁVEL*`,`• Nome: ${customerName.value.trim()}`,`• WhatsApp: ${customerPhone.value.trim()}`,`• E-mail: ${customerEmail.value.trim()}`,'',`🚌 *DETALHES DA VIAGEM*`,`• Destino: ${pkg.title}`,`• Duração: ${pkg.duration}`,`• Data desejada: ${formatTripDate(dateSelect.value,pkg)}`,`• Embarque: ${departureSelect.value}`,`• Transporte: ${pkg.transport}`,'',`👥 *VIAJANTES*`,`• Adultos/maiores de 12 anos: ${adults}`,`• Crianças até 12 anos: ${children}`,`• Total: ${travelers}`,`• Demais viajantes: ${travelerNamesField.value.trim()||'Não se aplica'}`,'',`💳 *VALORES*`,`• Total do pacote: ${money(total)}`,`• Adulto: ${money(pkg.price)}`,`• Criança até 12 anos: ${money(pkg.price/2)}`,`• Sinal mínimo: ${money(Math.min(total,100*travelers))}`,'',pkg.hotel?'🏨 Hotel parceiro e café da manhã incluídos.':'☀️ Bate-volta com café da manhã, sem hospedagem.','🧭 Acompanhamento da equipe durante toda a excursão.',`✅ Incluso: ${pkg.includes.join(', ')}.`,'',`✅ Condições lidas e aceitas.`,`📅 Saldo integral até 7 dias antes da viagem.`,`📍 Pontos e horários finais serão informados no grupo.`,'',`*Aguardando confirmação de disponibilidade.* 🌴`].join("\n");
}

function openTerms(){
  if(!dateSelect.value){dateHelp.textContent="Não há uma saída ativa para este destino no momento.";return;}
  validateBookingFields();if(!q("#bookingForm").reportValidity())return;
  const pkg=packages[selectedKey],{adults,children}=party();
  q('.terms-legal').textContent='Este aceite registra seu pedido no painel e abre o atendimento no WhatsApp. Não gera cobrança nem garante a vaga antes da confirmação da equipe.';q('.terms-legal').style.color='';
  q("#termsSelection").innerHTML=`<span>Seu pedido</span><b>${pkg.title}</b><small>${formatTripDate(dateSelect.value,pkg)} • ${departureSelect.value} • ${adults} adulto${adults===1?"":"s"}${children?` + ${children} criança${children===1?"":"s"}`:""} • ${money(tripTotal(pkg))}</small>`;
  q("#dynamicStayTerm").textContent=selectedKey==='guaruja'?"Guarujá: embarque na sexta à noite, praia no sábado e domingo, uma noite de hotel de sábado para domingo e café da manhã incluídos. Retorno no domingo. Horários e hotel são confirmados pela equipe.":pkg.hotel?"O pacote inclui hotel parceiro e café da manhã. O nome e o endereço serão informados após a confirmação operacional.":`${pkg.title} é um passeio bate-volta com café da manhã incluído, sem hotel ou pernoite.`;
  q(".terms-content section:nth-child(8) p").textContent=`Incluído neste pacote: ${pkg.includes.join(", ")}. Atividades aquáticas dependem de condições seguras e liberação local. Mergulho exige avaliação, orientação e acompanhamento do instrutor; idade mínima e participação de crianças seguem as regras da operadora. Avistamento de animais e fotos com peixes não são garantidos. Almoço incluído somente em Guarujá e Bertioga; demais refeições e despesas pessoais não estão incluídas.`;
  acceptTerms.checked=false;continueWhatsapp.disabled=true;termsDialog.showModal();
}

const nextDepartureLabel=key=>{const next=travelSchedule.available(key)[0];return next?formatDeparture(next).replace(/ de /g," "):"Agenda encerrada"};
q(".package-choice-grid").innerHTML=packageKeys.map(key=>`<button class="choice-button" data-choose="${key}" type="button"><b>${packages[key].title}</b><small>${packages[key].hotel?"2 dias":"1 dia"} • ${money(packages[key].price)}</small><em>${nextDepartureLabel(key)}</em></button>`).join("");
q(".destination-tabs").innerHTML=packageKeys.map(key=>`<button class="destination-tab" data-destination="${key}" type="button">${packages[key].title}</button>`).join("");
q("#destinos .eyebrow").textContent="Doze destinos para escolher";
q("#destinos .section-heading>p:last-child").textContent="Agenda confirmada de outubro a dezembro de 2026 e para o verão de janeiro de 2027. As datas encerradas saem automaticamente do site.";
q(".pickup-box").id="pontos-do-pacote";
q('.quick-nav a[href="#embarques"]').href="#pontos-do-pacote";
q(".faq-list details:nth-child(4) p").textContent="Os pacotes de dois dias — Arraial do Cabo, Guarujá, Bertioga, Búzios, Cananéia, Capitólio e Angra dos Reis — incluem hotel parceiro e café da manhã. Campos do Jordão, Ilhabela, Paraty, Copacabana e Hopi Hari são passeios de um dia, com café da manhã e sem hotel.";
document.querySelectorAll("[data-destination]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.destination)));
document.querySelectorAll("[data-choose]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.choose,true)));
destinationSelect.addEventListener("change",()=>selectPackage(destinationSelect.value));
pickupStateSelect.addEventListener("change",updatePickupOptions);
departureSelect.addEventListener("change",updatePickupAddress);
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
