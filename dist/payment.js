const money=value=>Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
let charge=null;

function invalid(message='Peça um novo link diretamente no WhatsApp oficial da Gess Turismo.'){
  document.querySelector('#invalidCharge').hidden=false;document.querySelector('#invalidCharge p').textContent=message;document.querySelector('#chargeContent').hidden=true;
}

function render(data){
  charge=data;const date=value=>new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR');
  document.querySelector('#bookingCode').textContent=data.code;
  document.querySelector('#chargeCustomer').textContent=data.customer||'Não informado';
  document.querySelector('#chargePhone').textContent=data.phone||'Não informado';
  document.querySelector('#chargeEmail').textContent=data.email||'Não informado';
  document.querySelector('#tripDestination').textContent=data.destination;
  document.querySelector('#tripDate').textContent=date(data.date);
  document.querySelector('#tripPickup').textContent=data.pickup;
  document.querySelector('#tripTravelers').textContent=`${data.adults} adulto${Number(data.adults)===1?'':'s'}${Number(data.children||0)?` + ${data.children} criança${Number(data.children)===1?'':'s'}`:''}`;
  document.querySelector('#tripTravelerNames').textContent=data.travelerNames||'Somente o responsável';
  document.querySelector('#packageAmount').textContent=money(data.total);
  document.querySelector('#remainingAmount').textContent=data.balance>0?money(data.balance):'Nada a pagar';
  document.querySelector('#paymentAmount').textContent=money(data.now);
  document.querySelector('#pixCode').value=data.pix;
  const qr=document.querySelector('#pixQr');
  if(/^data:image\/(png|jpeg|webp);base64,/.test(data.qrImage||''))qr.src=data.qrImage;else qr.parentElement.hidden=true;
  if(data.confirmed){document.querySelector('#chargeStatus').textContent='Pagamento confirmado';document.querySelector('.pix-payment').hidden=true;document.querySelector('#proofForm').hidden=true;}
  if(data.note){document.querySelector('#chargeNote').hidden=false;document.querySelector('#chargeNote').textContent=data.note;}
}

async function load(){
  const token=new URLSearchParams(location.search).get('token');
  if(!token)return invalid();
  try{const response=await fetch(`/api/charges?token=${encodeURIComponent(token)}`,{cache:'no-store'});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error);render(data);}
  catch(error){invalid(error.message||'Cobrança não encontrada.');}
}

document.querySelector('#copyPix').addEventListener('click',async()=>{const code=document.querySelector('#pixCode');try{await navigator.clipboard.writeText(code.value)}catch{code.select();document.execCommand('copy')}document.querySelector('#copyPix').textContent='Código copiado';});
document.querySelector('#proofFile').addEventListener('change',event=>{const file=event.target.files[0];document.querySelector('#proofName').textContent=file?file.name:'Selecione uma imagem, print ou PDF';});
document.querySelector('#proofForm').addEventListener('submit',event=>{
  event.preventDefault();if(!charge||!event.currentTarget.reportValidity())return;
  const file=document.querySelector('#proofFile').files[0];
  const message=['Olá, tudo bem? Realizei o pagamento da minha excursão e vou anexar o comprovante nesta conversa.',`Reserva: ${charge.code}`,`Nome: ${charge.customer||'Não informado'}`,`WhatsApp: ${charge.phone||'Não informado'}`,`E-mail: ${charge.email||'Não informado'}`,`Destino: ${charge.destination}`,`Data: ${new Date(`${charge.date}T12:00:00`).toLocaleDateString('pt-BR')}`,`Embarque: ${charge.pickup}`,`Adultos/maiores de 12 anos: ${charge.adults}`,`Crianças até 12 anos: ${charge.children||0}`,`Nomes informados: ${charge.travelerNames||'Somente o responsável'}`,`Valor pago: ${money(charge.now)}`,`Saldo restante: ${money(charge.balance)}`,'Prazo do saldo: quitação até 7 dias antes da viagem',`Arquivo selecionado: ${file.name}`,'IMPORTANTE: vou anexar o comprovante manualmente antes de enviar esta mensagem.','Aguardo a confirmação da reserva.'].join('\n');
  document.querySelector('#paymentFeedback').textContent='O WhatsApp será aberto. Anexe o arquivo selecionado antes de enviar a mensagem.';
  window.open(`https://wa.me/${window.GESS_CONFIG.getWhatsappNumber()}?text=${encodeURIComponent(message)}`,'_blank','noopener');
});

load();
