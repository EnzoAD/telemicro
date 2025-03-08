document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    const userDataString = localStorage.getItem("loggedUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    document.querySelector(".user").innerText = userData.name;


    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/paciente/getAll.php`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) throw new Error('Erro ao localizar os horários');
       
        const datar = await res.json();

        let cont =0;
        let newId = 0;
        
        if (datar.result) {
            
            
            for (const itemr of datar.result) {
                if(cont==0){
                    newId = itemr.id;
                    cont++;
                }else if(newId < itemr.id){
                    newId = itemr.id;
                }
            }
            
        }document.querySelector(".id").innerText = newId + 1;
    } catch (error) {
        console.error('Error:', error);
    }
    
    try {
        let res2 = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/equipamento/getAll.php`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datar2 = await res2.json();
        if (datar2.result) {
            let select2 = document.querySelector(".equipamento");
            let opcoes2 = [];

            for (const itemr2 of datar2.result) {
                

                opcoes2.push({ valor: itemr2.id, texto: itemr2.nome });
                

                
            }
            opcoes2.forEach(opcao2 => {
                let option2 = document.createElement("option");
                option2.value = opcao2.valor;
                option2.textContent = opcao2.texto;
                select2.appendChild(option2);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }


});