const API = {
  get token(){ return localStorage.getItem('token') || ''; },
  headers(json=true){
    const h = {};
    if (this.token) h['Authorization'] = 'Bearer ' + this.token;
    if (json) h['Content-Type'] = 'application/json';
    return h;
  },
  async get(path){
    const res = await fetch('/api'+path, { headers: this.headers(false) });
    return res.json();
  },
  async post(path, body){
    const res = await fetch('/api'+path, { method:'POST', headers: this.headers(true), body: JSON.stringify(body) });
    return res.json();
  },
  async put(path, body){
    const res = await fetch('/api'+path, { method:'PUT', headers: this.headers(true), body: JSON.stringify(body) });
    return res.json();
  }
};
function setCartBadge(n){ const el = document.getElementById('cartCount'); if(el) el.textContent = n; }
async function refreshCartBadge(){
  try{
    if (!localStorage.getItem('token')) return;
    const cart = await API.get('/cart');
    setCartBadge((cart.items||[]).reduce((s,i)=>s+i.qty,0));
  }catch(e){}
}
document.addEventListener('DOMContentLoaded', refreshCartBadge);
