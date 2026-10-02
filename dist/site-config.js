(() => {
  const defaults={whatsapp:'5511987785390',instagramHandle:'gess_turismo',showInstagram:true};
  let settings={...defaults};
  const normalize=value=>{let digits=String(value||'').replace(/\D/g,'');if(digits.length===10||digits.length===11)digits=`55${digits}`;return digits};
  const isValidWhatsapp=value=>/^55\d{10,11}$/.test(normalize(value));
  const format=value=>{const national=normalize(value).replace(/^55/,'');return national.length===11?`(${national.slice(0,2)}) ${national.slice(2,7)}-${national.slice(7)}`:`(${national.slice(0,2)}) ${national.slice(2,6)}-${national.slice(6)}`};
  const apply=(root=document)=>{
    const number=isValidWhatsapp(settings.whatsapp)?normalize(settings.whatsapp):defaults.whatsapp;
    root.querySelectorAll('[data-gess-whatsapp]').forEach(link=>{
      const message=link.dataset.gessWhatsapp==='quick'?'Olá! Tenho uma dúvida sobre os pacotes da Gess Turismo.':'';
      link.href=`https://wa.me/${number}${message?`?text=${encodeURIComponent(message)}`:''}`;
      if(link.dataset.gessWhatsapp==='label')link.textContent=`WhatsApp: ${format(number)}`;
      if(link.dataset.gessWhatsapp==='footer')link.textContent=`Atendimento: ${format(number)}`;
    });
    root.querySelectorAll('a[href*="instagram.com"],[data-gess-instagram]').forEach(link=>{
      link.href=`https://www.instagram.com/${settings.instagramHandle}/`;
      link.textContent=`Instagram: @${settings.instagramHandle}`;
      link.hidden=!settings.showInstagram;
      link.setAttribute('aria-hidden',String(!settings.showInstagram));
    });
  };
  const update=value=>{settings={...settings,...value};apply();return{...settings}};
  const ready=fetch('/api/settings',{cache:'no-store'}).then(response=>response.ok?response.json():Promise.reject()).then(update).catch(()=>{apply();return{...settings}});
  window.GESS_CONFIG={
    ready,
    getWhatsappNumber:()=>isValidWhatsapp(settings.whatsapp)?normalize(settings.whatsapp):defaults.whatsapp,
    getWhatsappDisplay:()=>format(settings.whatsapp),
    getSettings:()=>({...settings}),
    update,
    formatWhatsapp:format,
    isValidWhatsapp
  };
  apply();
})();
