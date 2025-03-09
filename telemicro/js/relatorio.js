function converterData(dataHora) {
    let [data, hora] = dataHora.split(" ");
    let [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano} , ${hora}`;
}
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("loggedUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    document.querySelector(".user").innerText = userData.name;
    const urlParams = new URLSearchParams(window.location.search)

    let valor = urlParams.get('id') ;
    
    document.querySelector(".result").innerText="";

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/paciente/get.php?valor=${valor}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datar = await res.json();
        if (datar.result) {

            for (const itemr of datar.result) {
                

                document.querySelector(".result").innerText +="Id: " + itemr.id + "\n\n" + "Cliente: " + itemr.nome_cliente + "\n\n" + "CPF: " + itemr.cpf + 
                "\n\n" + "Equipamento: " + itemr.nome_equipamento + "\n\n" + "Marca: " + itemr.marca + "\n\n" + "Modelo: " + itemr.modelo +
                "\n\n" + "Data e Hora: " + converterData(itemr.data_entrada) + "\n\n"+ "Defeito: " + itemr.nome_defeito + "\n\n";
                if(itemr.id_causa != -1 && itemr.id_solucao != -1){
                    document.querySelector(".result").innerText += "Causa: " + itemr.nome_causa + "\n\n" + "Solução: " + itemr.nome_solucao;
                }else if(itemr.id_causa == -1){
                    document.querySelector(".result").innerText +=  "Possíveis causas:" ;
                    try {
                        let res2 = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/causa/get2.php?id_defeito=${itemr.id_defeito}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        });
                        console.log(res2.error);
                
                        const datar2 = await res2.json();
                        if (datar2.result) {
                            let cont =0;
                
                            for (const itemr2 of datar2.result) {
                                if(cont>0){
                                    
                                    document.querySelector(".result").innerText +=  "," ;
                                }
                                cont++;
                
                                document.querySelector(".result").innerText += " " + itemr2.descricao ;
                                
                
                                
                            }
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    document.querySelector(".result").innerText +=  "\n\n" + "Solução: -" ;
                }else if(itemr.id_solucao == -1){
                    document.querySelector(".result").innerText +=  "Causa: " + itemr.nome_causa + "\n\n" + "Possíveis soluções:" ;
                    try {
                        let res2 = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/solucao/get2.php?id_causa=${itemr.id_causa}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        });
                
                        const datar2 = await res2.json();
                        if (datar2.result) {
                            let cont =0;
                
                            for (const itemr2 of datar2.result) {
                                if(cont>0){
                                    
                                    document.querySelector(".result").innerText +=  "," ;
                                }
                                cont++;
                
                                document.querySelector(".result").innerText += " " + itemr2.descricao ;
                                
                
                                
                            }
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                document.querySelector(".result").innerText +=  "\n\n" + "Responsável: " + itemr.nome_responsavel  ;

                
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('whatsappBtn').addEventListener('click', function() {
    const texto = encodeURIComponent( document.querySelector(".result").innerText );
    const url = `https://api.whatsapp.com/send?text=${texto}`;

    if (navigator.userAgent.match(/web.whatsapp.com/)) {
        window.open(url, '_blank'); // Abre no WhatsApp Web
      } else {
        window.open(url, '_blank'); // Abre no WhatsApp App ou WhatsApp Web
      }
  });