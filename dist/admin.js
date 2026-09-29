const whatsappInput=document.querySelector("#adminWhatsapp");
const whatsappFeedback=document.querySelector("#whatsappSettingsFeedback");
const currentWhatsapp=window.GESS_CONFIG.getWhatsappNumber();
whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(currentWhatsapp);
document.querySelector("#whatsappSettings").addEventListener("submit",event=>{
  event.preventDefault();
  try{
    const saved=window.GESS_CONFIG.saveWhatsapp(whatsappInput.value);
    whatsappInput.value=window.GESS_CONFIG.formatWhatsapp(saved);
    whatsappInput.setAttribute("aria-invalid","false");
    whatsappFeedback.className="settings-feedback success";
    whatsappFeedback.textContent="WhatsApp salvo neste navegador. As páginas abertas usarão o novo número ao serem recarregadas.";
  }catch(error){
    whatsappInput.setAttribute("aria-invalid","true");
    whatsappFeedback.className="settings-feedback error";
    whatsappFeedback.textContent=error.message;
  }
});
