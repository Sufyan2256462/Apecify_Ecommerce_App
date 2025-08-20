async function loadCart(){
  if(!API.token){ location.href='/frontend/pages/login.html'; return; }
  const cart = await API.get('/cart');
  const items = cart.items||[];
  document.getElementById('cartItems').innerHTML = items.map(i=>`
    <div class="card bg-base-100 shadow p-4 flex items-center justify-between">
      <div>
        <div class="font-semibold">${i.product?.title||'Item'}</div>
        <div class="opacity-70">$${i.price.toFixed(2)} × ${i.qty}</div>
      </div>
      <button class="btn" onclick="removeItem('${i.product?._id||i.product}')">Remove</button>
    </div>`).join('') || '<div class="alert">Your cart is empty.</div>';
  const total = items.reduce((s,i)=> s + i.qty*i.price, 0);
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
async function removeItem(id){
  await API.post('/cart/remove', { productId: id });
  await loadCart(); await refreshCartBadge();
}
document.addEventListener('DOMContentLoaded', loadCart);
