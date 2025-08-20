document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('registerBtn').onclick = async ()=>{
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const res = await API.post('/auth/register', { name, email, password, role });
    if(res.token){
      localStorage.setItem('token', res.token);
      location.href = role==='vendor' ? '/frontend/pages/vendor.html' : '/';
    }else alert('Verify your email to login');
  };
});
