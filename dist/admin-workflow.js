const KEY='gessTurismo.reservas', CHARGES='gessTurismo.cobrancas';
const $=s=>document.querySelector(s);
const money=n=>Number(n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
const save=(key,data)=>localStorage.setItem(key,JSON.stringify(data));
const paid=r=>(r.payments||[]).reduce((sum,p)=>sum+Math.round(p.amount*100),0)/100;
const remaining=r=>Math.max(0,Math.round((r.total-paid(r))*100)/100);
const minimum=r=>Math.min(remaining(r),paid(r)>0?0.01:100*Number(r.travelers||1));
const fmtDate=d=>d?new Date(d+'T12:00:00').toLocaleDateString('pt-BR'):'—';
const fold=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const due=r=>{const d=new Date(r.date+'T12:00:00');d.setDate(d.getDate()-7);return d.toLocaleDateString('pt-BR')};
let deleted=null;
document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="admin-enhanced.css?v=1"><link rel="stylesheet" href="admin-workflow.css?v=24">');
$('.queue-heading').insertAdjacentHTML('afterend',`<div class="reservation-tools"><label for="reservationSearch">Buscar reserva<input id="reservationSearch" type="search" placeholder="Nome, código, destino ou WhatsApp"></label><button type="button" id="sampleReservation">Criar exemplo local</button></div><p id="adminFeedback" role="status"></p><button id="undoDelete" type="button" hidden>Desfazer exclusão</button>`);
$('.local-badge').textContent='Prévia local';
$('.queue-heading p').textContent='Confira os dados preenchidos pelo cliente, prepare o Pix e acompanhe o saldo.';
$('.privacy p').textContent='Esta prévia funciona somente neste navegador. Receber reservas de outros aparelhos exige armazenamento online e login administrativo antes da publicação. O Pix é conferido pela equipe; selecionar um comprovante não confirma pagamento.';
$('#emptyReservations span').textContent='Preencha um pedido na prévia do site ou crie um exemplo local para experimentar.';
const field=(label,key,value,type='text')=>`<label>${label}<input name="${key}" type="${type}" value="${esc(value)}" ${['customer','phone'].includes(key)?'required':''}></label>`;
function card(r){
 const left=remaining(r),min=minimum(r),charges=read(CHARGES).filter(c=>c.reservationId===r.id),active=charges.find(c=>!c.confirmed&&!c.cancelled),now=active?.now||min;
 return `<article class="reservation-card" data-id="${esc(r.id)}"><div class="reservation-head"><div><span class="booking-code">${esc(r.code)}${r.isTest?' • EXEMPLO LOCAL':''}</span><h3>${esc(r.customer)}</h3><p>${esc(r.phone)}</p></div><span class="status-pill">${left===0?'Quitado':paid(r)>0?'Pagamento parcial':esc(r.status||'Aguardando cobrança')}</span></div>
 <dl class="reservation-data">${[['Destino',r.destination],['Data do passeio',fmtDate(r.date)],['Embarque',r.pickup],['Viajantes',`${r.adults??r.travelers} adulto(s) • ${r.children||0} criança(s)`],['E-mail',r.email||'Não informado'],['Outros viajantes',r.travelerNames||'Somente responsável']].map(([a,b])=>`<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
 <div class="account-summary"><div><span>Total do pacote</span><b>${money(r.total)}</b></div><div><span>Pagamento confirmado</span><b>${money(paid(r))}</b></div><div><span>Falta pagar</span><b>${money(left)}</b></div></div>
 <details class="edit-details"><summary>Editar dados do pedido</summary><form class="edit-form"><div class="charge-grid">${field('Nome completo','customer',r.customer)}${field('WhatsApp','phone',r.phone,'tel')}${field('E-mail','email',r.email,'email')}${field('Embarque','pickup',r.pickup)}${field('Nomes dos outros viajantes','travelerNames',r.travelerNames)}</div><button type="submit">Salvar dados</button><small>Destino, data e preço são os escolhidos no pedido. Links já gerados preservam os dados da cobrança.</small></form></details>
 ${left>0?`<form class="charge-form" data-left="${left}"><div class="charge-title"><div><span>Cobrança individual</span><b>Quanto o cliente vai pagar agora?</b></div><button class="full-payment" type="button">Cobrar saldo completo</button></div><div class="payment-workspace"><label class="amount-field">Valor do Pix<input class="amount-now" type="number" min="${min}" max="${left}" step="0.01" value="${now.toFixed(2)}" required><small>${paid(r)>0?'Pagamento do saldo restante.':`Sinal mínimo de ${money(min)} para esta reserva (R$ 100 por pessoa, limitado ao total).`}</small></label><div class="balance-preview"><div><span>Falta pagar hoje</span><b>${money(left)}</b></div><div><span>Após este pagamento</span><strong class="projected-balance">${money(left-now)}</strong></div></div></div>
 <div class="qr-upload-grid"><label>Imagem do QR Code<input class="qr-file" type="file" accept="image/png,image/jpeg,image/webp" required><small>PNG, JPG ou WebP • até 1 MB. Envie o QR do valor acima.</small><img class="qr-preview" alt="Prévia do QR enviado" hidden></label><label>Pix copia e cola<textarea class="pix-code" rows="5" required maxlength="4096" placeholder="Cole o código do mesmo QR Code"></textarea><small>Confira no banco se o QR e o código correspondem ao valor desta cobrança.</small></label></div>
 <div class="charge-grid"><label>Observação para o cliente<input class="charge-note-input" maxlength="300" placeholder="Ex.: sinal da excursão"></label><div class="deadline"><span>Lembrete de quitação</span><b>${due(r)}</b><small>7 dias antes do passeio. Confira o embarque combinado.</small></div></div><div class="card-actions"><button class="generate-link" type="submit">Salvar e gerar link individual</button></div><p class="card-feedback" role="status"></p></form>`:'<p class="settled-note">Reserva quitada. Não há saldo para uma nova cobrança.</p>'}
 <div class="charge-history">${charges.map(c=>{const url=new URL('pagamento.html',location.href);url.hash='local='+c.id;return `<div class="charge-item"><div><b>${money(c.now)}</b><span>${c.confirmed?'Pagamento confirmado':c.cancelled?'Cobrança substituída':'Aguardando conferência'} • ${fmtDate(c.createdAt.slice(0,10))}</span></div><div class="charge-actions">${!c.cancelled?`<a href="${esc(url.href)}" target="_blank" rel="noopener">Ver cobrança</a><button type="button" data-copy="${esc(url.href)}">Copiar link</button>${!c.confirmed?`<button type="button" data-confirm="${c.id}">Confirmar recebimento</button>`:''}`:''}</div></div>`}).join('')}</div><div class="delete-row"><button class="delete-action" type="button">Apagar reserva</button></div></article>`;
}
function render(){
 const items=read(KEY),term=fold($('#reservationSearch').value),visible=items.filter(r=>fold([r.customer,r.code,r.phone,r.destination,r.date,r.travelerNames].join(' ')).includes(term));
 $('#reservationList').innerHTML=visible.map(card).join('');$('#emptyReservations').hidden=visible.length>0;
 $('#emptyReservations b').textContent=term?'Nenhuma reserva encontrada':'Nenhuma reserva por enquanto';
 $('#metricTotal').textContent=items.length;$('#metricWaiting').textContent=items.filter(r=>remaining(r)>0).length;$('#metricLinks').textContent=read(CHARGES).filter(c=>!c.cancelled&&items.some(r=>r.id===c.reservationId)).length;$('#metricProofs').textContent=money(items.reduce((s,r)=>s+paid(r),0));
 $('#metricWaiting').previousElementSibling.textContent='Com saldo pendente';$('#metricProofs').previousElementSibling.textContent='Recebimentos confirmados';
}
$('#reservationSearch').addEventListener('input',render);
$('#reservationList').addEventListener('input',e=>{if(e.target.matches('.amount-now')){const f=e.target.closest('form'),n=Number(e.target.value);f.querySelector('.projected-balance').textContent=money(Math.max(0,Number(f.dataset.left)-n));f.querySelector('.generate-link').disabled=!e.target.validity.valid;}});
$('#reservationList').addEventListener('change',e=>{
 if(!e.target.matches('.qr-file'))return;const file=e.target.files[0],form=e.target.closest('form'),img=form.querySelector('.qr-preview');img.hidden=true;delete form.dataset.qr;
 if(!file)return;
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1024*1024){e.target.value='';form.querySelector('.card-feedback').textContent='Use uma imagem PNG, JPG ou WebP de até 1 MB.';return;}
 const reader=new FileReader();reader.onload=()=>{img.onload=()=>{form.dataset.qr=reader.result;img.hidden=false;form.querySelector('.card-feedback').textContent='Imagem carregada. Confira o valor e o Pix antes de gerar o link.'};img.onerror=()=>{e.target.value='';form.querySelector('.card-feedback').textContent='Não foi possível ler essa imagem.'};img.src=reader.result};reader.readAsDataURL(file);
});
$('#reservationList').addEventListener('submit',e=>{
 e.preventDefault();const form=e.target,items=read(KEY),r=items.find(i=>i.id===form.closest('article').dataset.id);if(!r)return;
 try{
 if(form.matches('.edit-form')){for(const key of ['customer','phone','email','pickup','travelerNames'])r[key]=form.elements[key].value.trim();save(KEY,items);render();return;}
 const now=Number(form.querySelector('.amount-now').value),pix=form.querySelector('.pix-code').value.trim(),qrImage=form.dataset.qr;
 if(!Number.isFinite(now)||now<minimum(r)||now>remaining(r)||!qrImage||!pix)throw Error('Confira o valor, envie a imagem do QR e preencha o Pix copia e cola.');
 const charges=read(CHARGES);charges.filter(c=>c.reservationId===r.id&&!c.confirmed).forEach(c=>c.cancelled=true);
 const c={v:2,id:crypto.randomUUID(),reservationId:r.id,code:r.code,customer:r.customer,phone:r.phone,email:r.email,travelerNames:r.travelerNames,adults:r.adults??r.travelers,children:r.children||0,destination:r.destination,date:r.date,pickup:r.pickup,travelers:r.travelers,total:Number(r.total),paidBefore:paid(r),now,balance:Math.round((remaining(r)-now)*100)/100,pix,qrImage,note:form.querySelector('.charge-note-input').value.trim(),sellerWhatsapp:window.GESS_CONFIG.getWhatsappNumber(),createdAt:new Date().toISOString(),confirmed:false,cancelled:false};
 charges.unshift(c);save(CHARGES,charges);r.status='Cobrança gerada';save(KEY,items);render();$('#adminFeedback').textContent='Cobrança criada. Nesta prévia, o link abre somente neste navegador. A cobrança anterior não confirmada foi substituída.';
 }catch(error){const feedback=form.querySelector('.card-feedback')||$('#adminFeedback');feedback.textContent=error.name==='QuotaExceededError'?'Armazenamento local cheio. Use uma imagem menor ou remova testes antigos.':error.message;}
});
$('#reservationList').addEventListener('click',async e=>{
 const cardEl=e.target.closest('article');if(!cardEl)return;const items=read(KEY),r=items.find(i=>i.id===cardEl.dataset.id);if(!r)return;
 if(e.target.closest('.full-payment')){const input=cardEl.querySelector('.amount-now');input.value=remaining(r).toFixed(2);input.dispatchEvent(new Event('input',{bubbles:true}));}
 if(e.target.closest('.delete-action')){const charges=read(CHARGES);deleted={reservation:r,charges:charges.filter(c=>c.reservationId===r.id)};save(KEY,items.filter(i=>i.id!==r.id));save(CHARGES,charges.filter(c=>c.reservationId!==r.id));$('#undoDelete').hidden=false;$('#adminFeedback').textContent=`Reserva ${r.code} e suas cobranças removidas. Você pode desfazer nesta sessão.`;render();}
 if(e.target.dataset.copy){try{await navigator.clipboard.writeText(e.target.dataset.copy);e.target.textContent='Copiado'}catch{$('#adminFeedback').textContent='Não foi possível copiar. Abra a cobrança e copie o endereço.'}}
 if(e.target.dataset.confirm){const charges=read(CHARGES),c=charges.find(c=>c.id===e.target.dataset.confirm);if(!c||c.cancelled||c.confirmed||(r.payments||[]).some(p=>p.id===c.id))return;if(e.target.dataset.reviewed!=='yes'){e.target.dataset.reviewed='yes';e.target.textContent=`Conferi no banco: receber ${money(c.now)}`;return;}if(c.now>remaining(r)){$('#adminFeedback').textContent='A cobrança excede o saldo atual. Gere uma nova cobrança.';return;}r.payments=[...(r.payments||[]),{id:c.id,amount:c.now,confirmedAt:new Date().toISOString()}];r.balance=remaining(r);r.status=r.balance===0?'Quitado':'Pagamento parcial';save(KEY,items);c.confirmed=true;save(CHARGES,charges);render();}
});
$('#undoDelete').addEventListener('click',()=>{if(deleted){const items=read(KEY);if(!items.some(r=>r.id===deleted.reservation.id))items.unshift(deleted.reservation);save(KEY,items);save(CHARGES,[...deleted.charges,...read(CHARGES)]);deleted=null;render();}$('#undoDelete').hidden=true;$('#adminFeedback').textContent='Exclusão desfeita.'});
$('#sampleReservation').addEventListener('click',()=>{const items=read(KEY);if(items.some(r=>r.code==='GESS-EXEMPLO')){$('#reservationSearch').value='GESS-EXEMPLO';render();return;}items.unshift({id:crypto.randomUUID(),code:'GESS-EXEMPLO',isTest:true,customer:'Cliente Exemplo',phone:'(11) 90000-0000',email:'exemplo@example.com',destination:'Arraial do Cabo',destinationKey:'arraial',date:'2026-11-14',pickup:'São Paulo • Terminal Rodoviário Jabaquara',adults:2,children:0,travelers:2,total:1000,travelerNames:'Acompanhante Exemplo',status:'Aguardando cobrança',createdAt:new Date().toISOString()});save(KEY,items);$('#reservationSearch').value='GESS-EXEMPLO';render();});
$('#adminWhatsapp').value=window.GESS_CONFIG.formatWhatsapp(window.GESS_CONFIG.getWhatsappNumber());
$('#whatsappSettings').addEventListener('submit',e=>{e.preventDefault();try{window.GESS_CONFIG.saveWhatsapp($('#adminWhatsapp').value);$('#whatsappSettingsFeedback').textContent='Número salvo neste navegador.'}catch(error){$('#whatsappSettingsFeedback').textContent=error.message}});
window.addEventListener('storage',render);render();
