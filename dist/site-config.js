(() => {
  const STORAGE_KEY = "gessTurismo.whatsapp";
  const DEFAULT_NUMBER = "5521989833495";
  let memoryNumber=DEFAULT_NUMBER;
  const normalize = value => {
    let digits=String(value||"").replace(/\D/g,"");
    if(digits.length===10||digits.length===11) digits=`55${digits}`;
    return digits;
  };
  const isValid = value => /^55\d{10,11}$/.test(normalize(value));
  const get = () => {
    let stored="";
    try{stored=window.localStorage?.getItem(STORAGE_KEY)||"";}catch(_error){stored="";}
    const saved=normalize(stored||memoryNumber);
    return isValid(saved)?saved:DEFAULT_NUMBER;
  };
  const format = value => {
    const national=normalize(value).replace(/^55/,"");
    return national.length===11?`(${national.slice(0,2)}) ${national.slice(2,7)}-${national.slice(7)}`:`(${national.slice(0,2)}) ${national.slice(2,6)}-${national.slice(6)}`;
  };
  const save = value => {
    const normalized=normalize(value);
    if(!isValid(normalized)) throw new Error("Informe um WhatsApp brasileiro válido com DDD.");
    memoryNumber=normalized;
    try{window.localStorage?.setItem(STORAGE_KEY,normalized);}catch(_error){/* Mantém a configuração nesta sessão. */}
    return normalized;
  };
  const apply = (root=document) => {
    const number=get();
    root.querySelectorAll("[data-gess-whatsapp]").forEach(link => {
      link.href=`https://wa.me/${number}`;
      if(link.dataset.gessWhatsapp==="label") link.textContent=`WhatsApp: ${format(number)}`;
      if(link.dataset.gessWhatsapp==="footer") link.textContent=`Atendimento: ${format(number)}`;
    });
  };
  window.GESS_CONFIG={getWhatsappNumber:get,formatWhatsapp:format,saveWhatsapp:save,isValidWhatsapp:isValid,applyWhatsapp:apply};
  apply();
  window.addEventListener("storage",event=>{if(event.key===STORAGE_KEY)apply();});
})();
