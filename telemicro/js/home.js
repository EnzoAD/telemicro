document.querySelector('.accept').addEventListener('click', async (e) => {
    e.preventDefault();

    const userDataString = localStorage.getItem("loggedUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;
        

    let cliente = document.querySelector('.cliente').value;
    let os = document.querySelector('.os').value;
    const id_equipamento = document.querySelector('.equipamento').value;
    let marca = document.querySelector('.marca').value;
    let modelo = document.querySelector('.modelo').value;
    const id_defeito = document.querySelector('.defeito').value;
    const id_causa = document.querySelector('.causa').value;
    const id_solucao = document.querySelector('.solucao').value;
    let idcriador = userData.id;
    



    if(!cliente || !os || !id_equipamento || !marca || !modelo || !id_defeito || !idcriador){
      alert('Por favor, não envie campos com priodade em vazio.');
      return;
    }

    let now = new Date();
    let ano = now.getFullYear();
    let mes = String(now.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
    let dia = String(now.getDate()).padStart(2, '0');
    let hora = String(now.getHours()).padStart(2, '0');
    let minutos = String(now.getMinutes()).padStart(2, '0');
    let segundos = String(now.getSeconds()).padStart(2, '0');

    let dataEntrada = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    try {
      let res = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/paciente/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_cliente: cliente,
            os: os,
            id_equipamento: id_equipamento,
            marca: marca,
            modelo: modelo,
            id_defeito: id_defeito,
            id_causa: id_causa,
            id_solucao: id_solucao,
            data_entrada: dataEntrada,
            idcriador: idcriador
        })
      });
  
      if (!res.ok) {
        throw new Error('Erro ao criar novo paciente');
      }
     

      const data = await res.json();
      // Trate a resposta aqui


      if (data.result) {
        console.log('Create successful:', data);
        await alert('Triagem enviada com sucesso!');

        
        window.location.href = 'http://'+ window.location.hostname + '/telemicro/telemicro/home';
  
      } else {
        console.log(data);
        console.error('Create failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  })
  