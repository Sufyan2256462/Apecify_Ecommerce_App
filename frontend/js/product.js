function getId(){ return new URLSearchParams(location.search).get('id'); }
async function loadProduct(){
  const id = getId();
  const p = await API.get('/products/'+id);
  const el = document.getElementById('productDetail');
  el.innerHTML = `
    <div class="space-y-4">
      <img class="w-full rounded-2xl shadow-xl" src="${p.images?.[0]||'https://picsum.photos/1200/900'}" alt="${p.title}">
    </div>
    <div>
      <h2 class="text-4xl font-extrabold mb-2">${p.title}</h2>
      <div class="flex items-center gap-2 mb-2"><span class="text-yellow-500">${'★'.repeat(Math.round(p.averageRating||0))}</span><span class="opacity-70">(${p.reviewsCount||0} reviews)</span></div>
      <p class="opacity-80 mb-4">${p.description||''}</p>
      <div class="text-3xl font-bold mb-6">$${p.price.toFixed(2)}</div>
      <button id="addToCart" class="btn btn-primary">Add to Cart</button>
    </div>`;
  document.getElementById('addToCart').onclick = async ()=>{
    if(!API.token){ location.href='/frontend/pages/login.html'; return; }
    await API.post('/cart/add', { productId: p._id, qty: 1 });
    await refreshCartBadge();
  };
  const list = await (await fetch('/api/reviews/'+id)).json();
  document.getElementById('reviews').innerHTML = list.map(r=>`
    <div class="card bg-base-100 shadow p-3">
      <div class="font-semibold">${r.user?.name||'User'} — ${'★'.repeat(r.rating)}</div>
      <p>${r.comment||''}</p>
    </div>`).join('') || '<div class="alert">No reviews yet.</div>';
  if(API.token){
    document.getElementById('reviewForm').classList.remove('hidden');
    document.getElementById('submitReview').onclick = async ()=>{
      const rating = Number(document.getElementById('reviewRating').value||5);
      const comment = document.getElementById('reviewComment').value;
      await API.post('/reviews/'+id, { rating, comment });
      location.reload();
    };
  }
}
document.addEventListener('DOMContentLoaded', loadProduct);
