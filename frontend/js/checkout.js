document.addEventListener('DOMContentLoaded', ()=>{
  if(!API.token){ location.href='/frontend/pages/login.html'; return; }
  document.getElementById('placeOrder').onclick = async ()=>{
    const address = document.getElementById('address').value.trim();
    const res = await API.post('/orders/checkout', { address });
    const box = document.getElementById('result');
    box.classList.remove('hidden');
    box.classList.add('alert-success');
    box.textContent = 'Order placed! ID: ' + res._id + ' — Status: ' + res.status;
  };
});
