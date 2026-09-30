const getWhatsappNumber = () => window.GESS_CONFIG?.getWhatsappNumber() || "5521989833495";
const money = value => new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL"}).format(value);

const packages = {
  arraial: {
    title:"Arraial do Cabo", location:"Região dos Lagos • RJ", price:500, duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Arraial no domingo, às 20h", hotel:true,
    intro:"Fim de semana de mar cristalino com hotel, café da manhã, mergulho, passeio de buggy e experiências anunciadas no roteiro.",
    days:["Sábado • Praia do Forno, Prainhas do Pontal do Atalaia, mergulho e check-in no hotel","Domingo • Passeio de barco com Praia do Farol e Gruta Azul, passeio panorâmico de buggy e saída às 20h"],
    pickups:["São Paulo: Jabaquara, Barra Funda e Tietê — conexão conforme a formação do grupo","Minas Gerais: Belo Horizonte, Barbacena e Juiz de Fora — pontos centrais a confirmar","Rio de Janeiro: Petrópolis, Rodoviária Novo Rio, Niterói e São Gonçalo — conforme a rota final"],
    photos:[["assets/arraial.jpg","Prainhas do Pontal do Atalaia","Arraial do Cabo • RJ"],["assets/arraial-forno.jpg","Praia do Forno","Arraial do Cabo • RJ"],["assets/arraial-farol.jpg","Praia do Farol","Acesso por barco"],["assets/arraial-praia-grande.jpg","Praia Grande","Arraial do Cabo • RJ"]]
  },
  campos: {
    title:"Campos do Jordão", location:"Serra da Mantiqueira • SP", price:150, duration:"1 dia • bate-volta", transport:"Ônibus de excursão", returnTime:"Saída de Campos no fim do dia, prevista para 20h", hotel:false,
    intro:"Um dia inteiro na serra, sem hospedagem, com aproximadamente 3 horas de estrada a partir da capital paulista, além do tempo dos embarques.",
    days:["Manhã • Portal, Ducha de Prata e Morro do Elefante","Tarde • Vila Capivari, Boulevard Geneve e tempo livre para conhecer a gastronomia local","Noite • Encontro do grupo e saída prevista de Campos do Jordão às 20h"],
    pickups:["São Paulo: Jabaquara — ponto exato e horário confirmados pela equipe","Centro/Barra Funda — ponto autorizado a confirmar","Terminal Tietê — último embarque previsto antes da Rodovia Ayrton Senna"],
    photos:[["https://commons.wikimedia.org/wiki/Special:Redirect/file/Montagem%20Campos%20do%20Jord%C3%A3o.jpg","Vila Capivari e paisagens da serra","Campos do Jordão • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Boulevard%20Geneve%2C%20Campos%20do%20Jord%C3%A3o.jpg","Boulevard Geneve","Campos do Jordão • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/P%C3%B3rtico%20de%20Campos%20do%20Jord%C3%A3o.jpg","Portal de Campos do Jordão","Serra da Mantiqueira • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Rua%20Djalma%20Forjaz%2C%20Campos%20do%20Jord%C3%A3o%2C%20SP.jpg","Centro turístico","Campos do Jordão • SP"]]
  },
  guaruja: {
    title:"Guarujá", location:"Baixada Santista • SP", price:150, duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída do Guarujá no domingo, às 20h", hotel:true,
    intro:"Dois dias nas praias mais conhecidas da Ilha de Santo Amaro, com hotel parceiro e café da manhã incluídos.",
    days:["Sábado • Praia da Enseada, Mirante da Campina e check-in no hotel","Domingo • Pitangueiras, Astúrias e Praia do Tombo, com saída às 20h"],
    pickups:["Jabaquara — embarque principal para a Baixada Santista","Centro de São Paulo — ponto autorizado a confirmar","Barra Funda, Tietê e São Bernardo do Campo — conforme a quantidade de viajantes"],
    photos:[["https://commons.wikimedia.org/wiki/Special:Redirect/file/IMG%208291%20Praia%20da%20Enseada%2C%20Guaruj%C3%A1.jpg","Praia da Enseada","Guarujá • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Enseada%20beach%20guaruja.jpg","Enseada","Guarujá • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Guaruj%C3%A1%20Praia%20da%20Enseada-20080502-RM-101255.jpg","Orla do Guarujá","Baixada Santista • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/IMG%208298%20Praia%20da%20Enseada%2C%20Guaruj%C3%A1.jpg","Litoral do Guarujá","São Paulo"]]
  },
  bertioga: {
    title:"Bertioga", location:"Litoral paulista • SP", price:150, duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Bertioga no domingo, às 20h", hotel:true,
    intro:"Fim de semana entre praias, Mata Atlântica e história, com hotel parceiro e café da manhã incluídos.",
    days:["Sábado • Praia da Enseada, Riviera de São Lourenço e check-in no hotel","Domingo • Forte São João pela manhã e tarde de praia em Itaguaré, com saída às 20h"],
    pickups:["Terminal Tietê e Barra Funda — horários conforme a rota","Jabaquara — conexão definida pela equipe","Guarulhos e Mogi das Cruzes — pontos centrais conforme a formação do grupo"],
    photos:[["https://commons.wikimedia.org/wiki/Special:Redirect/file/Praia%20em%20Bertioga.jpg","Praia em Bertioga","Bertioga • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Bertioga%20praia.jpg","Litoral de Bertioga","Bertioga • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Forte%20S%C3%A3o%20Jo%C3%A3o%20-%20BERTIOGA%20SP.jpg","Forte São João","Bertioga • SP"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Praia%20em%20Bertioga.jpg","Praias e Mata Atlântica","Bertioga • SP"]]
  },
  buzios: {
    title:"Búzios", location:"Região dos Lagos • RJ", price:500, duration:"2 dias • sábado e domingo", transport:"Ônibus de excursão", returnTime:"Saída de Búzios no domingo, às 20h", hotel:true,
    intro:"Fim de semana em praias famosas e na orla mais charmosa da Região dos Lagos, com hotel parceiro e café da manhã.",
    days:["Sábado • Praia de Geribá, Orla Bardot, Rua das Pedras e check-in no hotel","Domingo • João Fernandes, Azeda e Azedinha, com saída às 20h"],
    pickups:["São Paulo: Jabaquara, Barra Funda e Tietê — conexão conforme o grupo","Rio de Janeiro: Rodoviária Novo Rio, Niterói e São Gonçalo","Outros pontos no caminho poderão ser confirmados pela equipe até 7 dias antes"],
    photos:[["https://commons.wikimedia.org/wiki/Special:Redirect/file/Arma%C3%A7%C3%A3o%20dos%20B%C3%BAzios%2C%20Brazil%20%28164718149%29.jpg","Armação dos Búzios","Região dos Lagos • RJ"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Arma%C3%A7%C3%A3o%20de%20B%C3%BAzios-RJ.jpg","Praia da Armação","Búzios • RJ"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Vista%20da%20Praia%20de%20Jo%C3%A3o%20Fernandes%2C%20Arma%C3%A7%C3%A3o%20de%20B%C3%BAzios%2C%20RJ%2C%20Brasil.jpg","Praia de João Fernandes","Búzios • RJ"],["https://commons.wikimedia.org/wiki/Special:Redirect/file/Praia%20de%20Jo%C3%A3o%20Fernandes%2001.jpg","João Fernandes","Búzios • RJ"]]
  }
};

const q = selector => document.querySelector(selector);
const destinationSelect=q("#destinationSelect"), travelerSelect=q("#travelerSelect"), departureSelect=q("#departureSelect"), dateSelect=q("#dateSelect"), termsDialog=q("#termsDialog"), acceptTerms=q("#acceptTerms"), continueWhatsapp=q("#continueWhatsapp");
const packageKeys=Object.keys(packages);
let selectedKey="arraial";

function renderGallery(pkg){
  const setMain=photo=>{q("#galleryMainImage").src=photo[0];q("#galleryMainImage").alt=`${photo[1]}, ${photo[2]}`;q("#galleryMainTitle").textContent=photo[1];q("#galleryMainCaption").textContent=photo[2]};
  setMain(pkg.photos[0]);
  q("#galleryThumbs").innerHTML=pkg.photos.map((photo,index)=>`<button class="gallery-thumb ${index===0?"is-active":""}" type="button" data-photo="${index}"><img src="${photo[0]}" alt="${photo[1]}" loading="lazy"><span>${photo[1]}</span></button>`).join("");
  document.querySelectorAll(".gallery-thumb").forEach(button=>button.addEventListener("click",()=>{setMain(pkg.photos[Number(button.dataset.photo)]);document.querySelectorAll(".gallery-thumb").forEach(item=>item.classList.toggle("is-active",item===button))}));
}

function buildDates(pkg){
  const dates=[];const cursor=new Date();cursor.setHours(12,0,0,0);
  for(let offset=1;offset<=240&&dates.length<18;offset++){
    const date=new Date(cursor);date.setDate(cursor.getDate()+offset);
    const valid=pkg.hotel?date.getDay()===6:[0,6].includes(date.getDay());
    if(valid) dates.push(date);
  }
  dateSelect.innerHTML=dates.map(date=>`<option value="${date.toISOString().slice(0,10)}">${date.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})}</option>`).join("");
}

function updateBooking(resetOptions=true){
  const pkg=packages[selectedKey];
  if(resetOptions){
    departureSelect.innerHTML=pkg.pickups.map(item=>`<option value="${item.split(" — ")[0]}">${item.split(" — ")[0]}</option>`).join("");
    buildDates(pkg);
  }
  const travelers=Number(travelerSelect.value||1),total=pkg.price*travelers;
  q("#summaryLabel").textContent=`${pkg.duration} • ${travelers} ${travelers===1?"viajante":"viajantes"}`;
  q("#totalPrice").textContent=money(total);
  q("#installmentPrice").textContent=`${money(pkg.price)} por pessoa • cobrança personalizada após o atendimento`;
}

function selectPackage(key,scroll=false){
  selectedKey=key;const pkg=packages[key];
  q("#galleryHeading").textContent=`Conheça o pacote para ${pkg.title}`;
  q("#routeTitle").textContent=pkg.title;q("#routeLocation").textContent=pkg.location;q("#routeIntro").textContent=pkg.intro;
  q("#routeMeta").innerHTML=`<b>${pkg.duration}</b><span>${pkg.transport}</span><span>${pkg.returnTime}</span>`;
  q("#routeList").innerHTML=pkg.days.map((day,index)=>`<li><span>${String(index+1).padStart(2,"0")}</span>${day}</li>`).join("");
  q("#pickupList").innerHTML=pkg.pickups.map(point=>`<li>${point}</li>`).join("");
  q("#hotelLine").innerHTML=pkg.hotel?`<span>Hospedagem incluída</span><b>Hotel parceiro + café da manhã • nome e endereço a confirmar</b>`:`<span>Bate-volta de um dia</span><b>Este pacote não inclui hotel nem pernoite</b>`;
  q("#routePrice").textContent=`${money(pkg.price)} por pessoa`;
  renderGallery(pkg);
  document.querySelectorAll("[data-destination],[data-choose]").forEach(button=>button.classList.toggle("is-active",(button.dataset.destination||button.dataset.choose)===key));
  destinationSelect.value=key;updateBooking();
  if(scroll)q("#destinos").scrollIntoView({behavior:"smooth",block:"start"});
}

function buildMessage(){
  const pkg=packages[selectedKey],travelers=Number(travelerSelect.value),total=pkg.price*travelers;
  return ["Olá, tudo bem? Tenho interesse em um pacote da Gess Turismo.",`Nome: ${q("#customerName").value.trim()}`,`WhatsApp: ${q("#customerPhone").value.trim()}`,`Pacote: ${pkg.title} — ${pkg.duration}`,`Data desejada: ${new Date(`${dateSelect.value}T12:00:00`).toLocaleDateString("pt-BR")}`,`Ponto de embarque preferido: ${departureSelect.value}`,`Viajantes: ${travelers}`,`Valor estimado: ${money(total)} (${money(pkg.price)} por pessoa)`,`Transporte: ${pkg.transport}`,pkg.hotel?"Hospedagem: hotel parceiro com café da manhã incluído":"Hospedagem: não incluída; pacote bate-volta","Estou ciente de que o ponto e o horário exatos serão confirmados até 7 dias antes.","Quero confirmar disponibilidade e receber as próximas orientações."].join("\n");
}

function openTerms(){
  if(!q("#bookingForm").reportValidity())return;
  const pkg=packages[selectedKey],travelers=Number(travelerSelect.value);
  q("#termsSelection").innerHTML=`<span>Seu pedido</span><b>${pkg.title}</b><small>${pkg.duration} • ${departureSelect.value} • ${travelers} ${travelers===1?"viajante":"viajantes"} • ${money(pkg.price*travelers)}</small>`;
  q("#dynamicStayTerm").textContent=pkg.hotel?"O pacote inclui hotel parceiro e café da manhã. O nome e o endereço serão informados após a confirmação operacional.":"Campos do Jordão é um passeio bate-volta de um dia e não inclui hotel ou pernoite.";
  acceptTerms.checked=false;continueWhatsapp.disabled=true;termsDialog.showModal();
}

document.querySelectorAll("[data-destination]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.destination)));
document.querySelectorAll("[data-choose]").forEach(button=>button.addEventListener("click",()=>selectPackage(button.dataset.choose,true)));
destinationSelect.addEventListener("change",()=>selectPackage(destinationSelect.value));
travelerSelect.addEventListener("change",()=>updateBooking(false));
q("#whatsappButton").addEventListener("click",openTerms);
q("#bookingForm").addEventListener("submit",event=>{event.preventDefault();openTerms()});
acceptTerms.addEventListener("change",()=>continueWhatsapp.disabled=!acceptTerms.checked);
q("#termsClose").addEventListener("click",()=>termsDialog.close());q("#cancelTerms").addEventListener("click",()=>termsDialog.close());
continueWhatsapp.addEventListener("click",()=>{window.open(`https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(buildMessage())}`,"_blank","noopener");termsDialog.close()});
destinationSelect.innerHTML=packageKeys.map(key=>`<option value="${key}">${packages[key].title} • ${money(packages[key].price)}</option>`).join("");
selectPackage("arraial");
