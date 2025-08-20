async function guard(){
  if(!API.token){ location.href='/frontend/pages/login.html'; return; }
  const payload = JSON.parse(atob(API.token.split('.')[1]));
  if(payload.role!=='admin'){ alert('Admins only'); location.href='/'; }
}
async function load(){
  await guard();
  const s = await API.get('/admin/stats');
  document.getElementById('u').textContent = s.users;
  document.getElementById('p').textContent = s.products;
  document.getElementById('o').textContent = s.orders;
  const list = await API.get('/admin/orders');
  const rows = list.map(o=>`
    <tr class="hover">
      <td class="px-3 py-2">${o._id}</td>
      <td class="px-3 py-2">$${o.total.toFixed(2)}</td>
      <td class="px-3 py-2">${o.status}</td>
      <td class="px-3 py-2">
        <select onchange="updateStatus('${o._id}', this.value)" class="select select-bordered select-sm">
          ${['pending','paid','shipped','delivered','cancelled'].map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </td>
    </tr>`).join('');
  document.getElementById('orders').innerHTML = `<table class="table">${rows}</table>`;
  document.getElementById('logout').onclick = ()=>{ localStorage.removeItem('token'); location.href='/'; };
}
async function updateStatus(id, status){
  await API.put('/admin/orders/'+id+'/status', { status });
  await load();
}
document.addEventListener('DOMContentLoaded', load);
