async function guard(){
  if(!API.token){ location.href='/frontend/pages/login.html'; return; }
  const payload = JSON.parse(atob(API.token.split('.')[1]));
  if(payload.role!=='vendor' && payload.role!=='admin'){ alert('Vendors only'); location.href='/'; }
}
async function load(){
  await guard();
  document.getElementById('createForm').onsubmit = async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const body = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      images: [data.image].filter(Boolean),
      tags: ['new']
    };
    await API.post('/products', body);
    e.target.reset();
    renderMine();
  };
  renderMine();
  document.getElementById('logout').onclick = ()=>{ localStorage.removeItem('token'); location.href='/'; };
}
async function renderMine(){
  const all = await API.get('/products');
  const payload = JSON.parse(atob(API.token.split('.')[1]));
  const mine = all.filter(p=> (p.vendor?._id||p.vendor)===payload.id);
  const wrap = document.getElementById('myProducts');
  wrap.innerHTML = mine.map(p=>`
    <div class="flex items-center justify-between p-3 rounded-xl bg-base-100 shadow">
      <div>
        <div class="font-semibold">${p.title}</div>
        <div class="opacity-60">$${p.price.toFixed(2)}</div>
      </div>
      <div class="flex gap-2">
        <a class="btn btn-sm" href="/frontend/pages/product.html?id=${p._id}">View</a>
        <button class="btn btn-sm btn-error" onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    </div>`).join('') || '<div class="alert">No products yet.</div>';
}

async function deleteProduct(productId) {
  const confirmed = confirm('Are you sure you want to delete this product? This action cannot be undone.');
  
  if (confirmed) {
    try {
      await API.delete(`/vendors/products/${productId}`);
      alert('Product deleted successfully!');
      renderMine(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  }
}

// No vendor account deletion - only product deletion
document.addEventListener('DOMContentLoaded', load);
