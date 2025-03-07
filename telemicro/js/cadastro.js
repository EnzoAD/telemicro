document.querySelector('.createButton').addEventListener('click', async (e) => {
    e.preventDefault();

    let name = document.querySelector('.nameInput').value;
    let email = document.querySelector('.emailInput').value;
    let pass = document.querySelector('.passInput').value;
    let confirmPass = document.querySelector('.confirmPassInput').value;

    if(!email || !pass || !name){
      alert('Por favor, não envie campos vazios.');
      return;
    }

    if(pass != confirmPass){
        alert('Confirmação de senha divergente.');
        return;
    }

    function validarEmail(email) {
        // Expressão regular para validar o formato de um email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Exemplo de uso
    
    if (!validarEmail(email)) {
        alert('O email não está no formato correto ("exemplo@dominio.com").');
        return;
    } 
    
  
    try {
      let res = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/user/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass
        })
      });
  
      if (!res.ok) {
        throw new Error('Erro ao criar novo usuário');
      }console.log("teste");
  
      let data = await res.json();

      // Trate a resposta aqui
     
      if (data.success) {
        console.log('Create successful:', data);
  
  
        // Redirecione o usuário ou salve o token
        window.location.href = 'http://'+ window.location.hostname + '/telemicro/telemicro/';
      } else {
        console.error('Create failed:', data.message);
      }
    } catch (error) {
        
      console.error('Error:', error);
    }
    
  })
  