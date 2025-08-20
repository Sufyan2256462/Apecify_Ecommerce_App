document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('loginBtn').onclick = async ()=>{
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const res = await API.post('/auth/login', { email, password });
    if(res.token){
      localStorage.setItem('token', res.token);
      location.href = '/';
    }else alert(res.message || 'Login failed');
  };
});
