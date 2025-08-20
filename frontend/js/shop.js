async function loadProducts(){
  const q = document.getElementById('search')?.value || '';
  const tag = document.getElementById('tag')?.value || '';
  const list = await API.get('/products' + (q||tag?`?${new URLSearchParams({q, tag}).toString()}`:''));
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map(p=>`
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
    <figure class="aspect-[4/3] overflow-hidden"><img class="object-cover w-full h-full" src="${p.images?.[0]||'https://picsum.photos/800/600'}" alt="${p.title}"/></figure>
    <div class="card-body">
      <h2 class="card-title">${p.title}<div class="badge badge-secondary">${(p.averageRating||0).toFixed(1)}★</div></h2>
      <p class="line-clamp-2">${p.description||''}</p>
      <div class="flex items-center justify-between pt-2">
        <div class="text-xl font-bold">$${p.price.toFixed(2)}</div>
        <a class="btn btn-primary" href="/frontend/pages/product.html?id=${p._id}">View</a>
      </div>
    </div>
  </div>`).join('');
}
document.addEventListener('DOMContentLoaded', ()=>{
  loadProducts();
  const s = document.getElementById('search');
  const t = document.getElementById('tag');
  if(s) s.addEventListener('input', ()=>loadProducts());
  if(t) t.addEventListener('change', ()=>loadProducts());
});
