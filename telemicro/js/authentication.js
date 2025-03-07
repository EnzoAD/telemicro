document.querySelector('.loginButton').addEventListener('click', async (e) => {
    e.preventDefault();
  
    let nome = document.querySelector('.nomeInput').value;
    let pass = document.querySelector('.passInput').value;
  
    if(!nome || !pass){
      alert('Por favor, não envie campos vazios.');
      return;
    }
  
    try {
      let res = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/user/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome,
          password: pass
        })
      });
  
      if (!res.ok) {
        throw new Error('Erro ao autenticar');
      }
  
      let data = await res.json();
      // Trate a resposta aqui
     
      if (data.result.error !== "") {
        console.log('Login successful:', data);
  
        // Pega os dados do cara logado
        getUserData(data.result.user);
  
        // Redirecione o usuário ou salve o token
        window.location.href ='http://'+ window.location.hostname + '/telemicro/telemicro/home';
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Usuário ou senha incorretos!');
    }
    
  })
  
  
  const getUserData = (userData) => {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };