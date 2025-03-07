document.querySelector('.logoutButton').addEventListener('click', () => {
    if(confirm('Quer realmente sair?')){
      localStorage.removeItem("loggedUser");
    
      window.location.href = 'http://'+window.location.hostname + '/telemicro/telemicro/login';
    }
  })