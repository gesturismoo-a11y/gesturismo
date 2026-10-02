const $=selector=>document.querySelector(selector);
const money=value=>Number(value||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fold=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const fmtDate=value=>value?new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR'):'—';
const paid=reservation=>(reservation.payments||[]).reduce((sum,item)=>sum+Number(item.amount||0),0);
const remaining=reservation=>Math.max(0,Math.round((Number(reservation.total)-paid(reservation))*100)/100);
const minimum=reservation=>Math.min(remaining(reservation),paid(reservation)>0?.01:100*Number(reservation.travelers||1));
let reservations=[];

async function request(url,options={}){
  const response=await fetch(url,{...options,headers:{'Content-Type':'application/json',...(options.headers||{})}});
  const data=await response.json().catch(()=>({}));
  if(response.status===401){showLogin();throw new Error(data.error||'Sessão expirada.');}
  if(!response.ok)throw new Error(data.error||'Não foi possível concluir a operação.');
  return data;
}

function showLogin(){document.body.classList.add('admin-locked');$('#adminLogin').hidden=false;$('#adminPassword').focus();}
function showPanel(){document.body.classList.remove('admin-locked');$('#adminLogin').hidden=true;}
function feedback(message,error=false){$('#adminFeedback').textContent=message;$('#adminFeedback').classList.toggle('error',error);}
function due(reservation){const date=new Date(`${reservation.date}T12:00:00`);date.setDate(date.getDate()-7);return date.toLocaleDateString('pt-BR');}
const field=(label,key,value,type='text')=>`<label>${label}<input name="${key}" type="${type}" value="${esc(value)}" ${['customer','phone'].includes(key)?'required':''}></label>`;

function card(reservation){
  const left=remaining(reservation),min=minimum(reservation),active=(reservation.charges||[]).find(item=>!item.confirmed&&!item.cancelled);
  const now=active?.now||min;
  return `<article class="reservation-card" data-id="${esc(reservation.id)}">
    <div class="reservation-head"><div><span class="booking-code">${esc(reservation.code)}</span><h3>${esc(reservation.customer)}</h3><p>${esc(reservation.phone)}</p></div><span class="status-pill">${left===0?'Quitado':paid(reservation)>0?'Pagamento parcial':active?'Cobrança pronta':'Aguardando cobrança'}</span></div>
    <dl class="reservation-data">${[['Destino',reservation.destination],['Data do passeio',fmtDate(reservation.date)],['Embarque',reservation.pickup],['Viajantes',`${reservation.adults} adulto(s) • ${reservation.children||0} criança(s)`],['E-mail',reservation.email||'Não informado'],['Outros viajantes',reservation.travelerNames||'Somente responsável']].map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>
    <div class="account-summary"><div><span>Total do pacote</span><b>${money(reservation.total)}</b></div><div><span>Pagamento confirmado</span><b>${money(paid(reservation))}</b></div><div><span>Falta pagar</span><b>${money(left)}</b></div></div>
    <details class="edit-details"><summary>Editar dados do pedido</summary><form class="edit-form"><div class="charge-grid">${field('Nome completo','customer',reservation.customer)}${field('WhatsApp','phone',reservation.phone,'tel')}${field('E-mail','email',reservation.email,'email')}${field('Embarque','pickup',reservation.pickup)}${field('Nomes dos outros viajantes','travelerNames',reservation.travelerNames)}</div><button type="submit">Salvar dados</button></form></details>
    ${left>0?`<form class="charge-form" data-left="${left}"><div class="charge-title"><div><span>Cobrança individual</span><b>Quanto o cliente vai pagar agora?</b></div><button class="full-payment" type="button">Cobrar saldo completo</button></div><div class="payment-workspace"><label class="amount-field">Valor do Pix<input class="amount-now" type="number" min="${min}" max="${left}" step="0.01" value="${now.toFixed(2)}" required><small>${paid(reservation)>0?'Novo pagamento do saldo restante.':`Sinal mínimo de ${money(min)} para esta reserva.`}</small></label><div class="balance-preview"><div><span>Falta pagar hoje</span><b>${money(left)}</b></div><div><span>Após este pagamento</span><strong class="projected-balance">${money(left-now)}</strong></div></div></div>
      <div class="qr-upload-grid"><label>Imagem do QR Code<input class="qr-file" type="file" accept="image/png,image/jpeg,image/webp" required><small>PNG, JPG ou WebP • até 1 MB.</small><img class="qr-preview" alt="Prévia do QR Code" hidden></label><label>Pix copia e cola<textarea class="pix-code" rows="5" required maxlength="4096" placeholder="Cole o código do mesmo QR Code"></textarea><small>O código e o QR devem corresponder ao valor informado.</small></label></div>
      <div class="charge-grid"><label>Observação para o cliente<input class="charge-note-input" maxlength="300" placeholder="Ex.: sinal da excursão"></label><div class="deadline"><span>Lembrete de quitação</span><b>${due(reservation)}</b><small>7 dias antes do passeio.</small></div></div><div class="card-actions"><button class="generate-link" type="submit">Salvar e gerar link individual</button></div><p class="card-feedback" role="status"></p></form>`:'<p class="settled-note">Reserva quitada. Não há saldo para uma nova cobrança.</p>'}
    <div class="charge-history">${(reservation.charges||[]).map(charge=>{const url=`${location.origin}/pagamento.html?token=${encodeURIComponent(charge.token)}`;return `<div class="charge-item"><div><b>${money(charge.now)}</b><span>${charge.confirmed?'Pagamento confirmado':charge.cancelled?'Cobrança substituída':'Aguardando conferência'} • ${fmtDate(charge.createdAt.slice(0,10))}</span></div><div class="charge-actions">${!charge.cancelled?`<a href="${esc(url)}" target="_blank" rel="noopener">Ver cobrança</a><button type="button" data-copy="${esc(url)}">Copiar link</button>${!charge.confirmed?`<button type="button" data-confirm="${charge.id}">Confirmar recebimento</button>`:''}`:''}</div></div>`}).join('')}</div>
    <div class="delete-row"><button class="delete-action" type="button">Apagar reserva</button></div>
  </article>`;
}

function render(){
  const term=fold($('#reservationSearch').value);
  const visible=reservations.filter(item=>fold([item.customer,item.code,item.phone,item.destination,item.date,item.travelerNames].join(' ')).includes(term));
  $('#reservationList').innerHTML=visible.map(card).join('');
  $('#emptyReservations').hidden=visible.length>0;
  $('#emptyReservations b').textContent=term?'Nenhuma reserva encontrada':'Nenhuma reserva por enquanto';
  $('#metricTotal').textContent=reservations.length;
  $('#metricWaiting').textContent=reservations.filter(item=>remaining(item)>0).length;
  $('#metricLinks').textContent=reservations.reduce((sum,item)=>sum+(item.charges||[]).filter(charge=>!charge.cancelled).length,0);
  $('#metricProofs').textContent=money(reservations.reduce((sum,item)=>sum+paid(item),0));
}

async function loadReservations(){
  feedback('Atualizando reservas...');
  try{reservations=await request('/api/reservations');render();feedback('Reservas atualizadas.');}
  catch(error){feedback(error.message,true);}
}

async function loadSettings(){
  try{
    const settings=await request('/api/settings');
    window.GESS_CONFIG.update(settings);
    $('#adminWhatsapp').value=window.GESS_CONFIG.formatWhatsapp(settings.whatsapp);
    $('#adminInstagram').value=settings.instagramHandle;
    $('#showInstagram').checked=settings.showInstagram;
  }catch(error){$('#whatsappSettingsFeedback').textContent=error.message;$('#whatsappSettingsFeedback').className='settings-feedback error';}
}

async function checkHealth(){
  const button=$('#siteHealth'),label=button.querySelector('span');button.classList.remove('is-online','is-offline');label.textContent='Verificando site...';
  try{const result=await request('/api/health');button.classList.add('is-online');label.textContent=`Site online • banco ${result.databaseMs} ms`;button.title=`Última verificação: ${new Date(result.checkedAt).toLocaleString('pt-BR')}`;}
  catch(error){button.classList.add('is-offline');label.textContent='Verificar conexão';button.title=error.message;}
}

$('#loginForm').addEventListener('submit',async event=>{
  event.preventDefault();const button=event.currentTarget.querySelector('button');button.disabled=true;$('#loginFeedback').textContent='Verificando...';
  try{await request('/api/admin-session',{method:'POST',body:JSON.stringify({password:$('#adminPassword').value})});$('#adminPassword').value='';$('#loginFeedback').textContent='';showPanel();await Promise.all([loadReservations(),loadSettings(),checkHealth()]);}
  catch(error){$('#loginFeedback').textContent=error.message;}
  finally{button.disabled=false;}
});

$('#logoutButton').addEventListener('click',async()=>{await fetch('/api/admin-session',{method:'DELETE'});showLogin();});
$('#siteHealth').addEventListener('click',checkHealth);
$('#refreshReservations').addEventListener('click',loadReservations);
$('#reservationSearch').addEventListener('input',render);

$('#reservationList').addEventListener('input',event=>{if(event.target.matches('.amount-now')){const form=event.target.closest('form'),amount=Number(event.target.value);form.querySelector('.projected-balance').textContent=money(Math.max(0,Number(form.dataset.left)-amount));}});
$('#reservationList').addEventListener('change',event=>{
  if(!event.target.matches('.qr-file'))return;
  const file=event.target.files[0],form=event.target.closest('form'),image=form.querySelector('.qr-preview');image.hidden=true;delete form.dataset.qr;
  if(!file)return;
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1024*1024){event.target.value='';form.querySelector('.card-feedback').textContent='Use PNG, JPG ou WebP de até 1 MB.';return;}
  const reader=new FileReader();reader.onload=()=>{form.dataset.qr=reader.result;image.src=reader.result;image.hidden=false;};reader.readAsDataURL(file);
});

$('#reservationList').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.target,reservation=reservations.find(item=>item.id===form.closest('article').dataset.id);if(!reservation)return;
  const message=form.querySelector('.card-feedback')||$('#adminFeedback');
  try{
    if(form.matches('.edit-form')){
      const body={id:reservation.id};for(const key of ['customer','phone','email','pickup','travelerNames'])body[key]=form.elements[key].value.trim();
      await request('/api/reservations',{method:'PATCH',body:JSON.stringify(body)});await loadReservations();return;
    }
    const amount=Number(form.querySelector('.amount-now').value),pix=form.querySelector('.pix-code').value.trim(),qrImage=form.dataset.qr;
    if(!form.reportValidity()||!qrImage)throw new Error('Confira o valor, envie o QR Code e preencha o Pix copia e cola.');
    const result=await request('/api/charges',{method:'POST',body:JSON.stringify({reservationId:reservation.id,amount,pix,qrImage,note:form.querySelector('.charge-note-input').value.trim()})});
    const url=`${location.origin}/pagamento.html?token=${encodeURIComponent(result.token)}`;await navigator.clipboard.writeText(url).catch(()=>{});await loadReservations();feedback('Cobrança criada. O link individual foi copiado.');
  }catch(error){message.textContent=error.message;message.classList.add('error');}
});

$('#reservationList').addEventListener('click',async event=>{
  const cardElement=event.target.closest('article');if(!cardElement)return;const reservation=reservations.find(item=>item.id===cardElement.dataset.id);if(!reservation)return;
  if(event.target.closest('.full-payment')){const input=cardElement.querySelector('.amount-now');input.value=remaining(reservation).toFixed(2);input.dispatchEvent(new Event('input',{bubbles:true}));return;}
  if(event.target.dataset.copy){await navigator.clipboard.writeText(event.target.dataset.copy).catch(()=>{});event.target.textContent='Copiado';return;}
  if(event.target.dataset.confirm){
    if(event.target.dataset.reviewed!=='yes'){event.target.dataset.reviewed='yes';event.target.textContent='Conferi no banco: confirmar';return;}
    event.target.disabled=true;try{await request('/api/charges',{method:'PATCH',body:JSON.stringify({id:event.target.dataset.confirm})});await loadReservations();feedback('Pagamento confirmado e saldo atualizado.');}catch(error){feedback(error.message,true);}return;
  }
  if(event.target.closest('.delete-action')){
    if(event.target.dataset.confirmDelete!=='yes'){event.target.dataset.confirmDelete='yes';event.target.textContent='Clique novamente para apagar';return;}
    event.target.disabled=true;try{await request(`/api/reservations?id=${encodeURIComponent(reservation.id)}`,{method:'DELETE'});await loadReservations();feedback(`Reserva ${reservation.code} apagada.`);}catch(error){feedback(error.message,true);}
  }
});

$('#whatsappSettings').addEventListener('submit',async event=>{
  event.preventDefault();const button=event.currentTarget.querySelector('button[type="submit"]'),feedbackElement=$('#whatsappSettingsFeedback');button.disabled=true;feedbackElement.textContent='Salvando para todo o site...';feedbackElement.className='settings-feedback';
  try{
    const settings=await request('/api/settings',{method:'PATCH',body:JSON.stringify({whatsapp:$('#adminWhatsapp').value,instagramHandle:$('#adminInstagram').value,showInstagram:$('#showInstagram').checked})});
    window.GESS_CONFIG.update(settings);$('#adminWhatsapp').value=window.GESS_CONFIG.formatWhatsapp(settings.whatsapp);$('#adminInstagram').value=settings.instagramHandle;feedbackElement.textContent='Configurações atualizadas para todos os visitantes.';feedbackElement.classList.add('success');
  }catch(error){feedbackElement.textContent=error.message;feedbackElement.classList.add('error');}
  finally{button.disabled=false;}
});

(async()=>{try{const status=await request('/api/admin-session');if(status.authenticated){showPanel();await Promise.all([loadReservations(),loadSettings(),checkHealth()]);}else showLogin();}catch{showLogin();}})();
