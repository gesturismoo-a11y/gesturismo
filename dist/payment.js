const params = new URLSearchParams(window.location.search);
const code = params.get("reserva");
const rawAmount = params.get("valor");
const amount = rawAmount && /^\d+(?:[.,]\d{1,2})?$/.test(rawAmount) ? Number(rawAmount.replace(",", ".")) : null;
if (code && /^[A-Za-z0-9-]{4,24}$/.test(code)) document.querySelector("#bookingCode").textContent = code.toUpperCase();
if (amount && amount > 0) document.querySelector("#paymentAmount").textContent = amount.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
const panels = {
  pix: '<div class="qr-placeholder" aria-hidden="true"><span>QR</span></div><div><b>QR Code gerado pelo Mercado Pago</b><p>Depois da integração, o código Pix e o prazo para pagamento aparecerão aqui.</p></div>',
  card: '<div class="qr-placeholder" aria-hidden="true"><span>10×</span></div><div><b>Pagamento protegido com cartão</b><p>Depois da integração, o Mercado Pago exibirá os campos seguros e as parcelas disponíveis.</p></div>'
};
document.querySelectorAll(".payment-method").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".payment-method").forEach(item => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-selected", String(active)); });
  document.querySelector("#methodPanel").innerHTML = panels[button.dataset.method];
}));
