document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("loggedUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    document.querySelector(".user").innerText = userData.name;
});

function converterData(dataHora) {
    let [data, hora] = dataHora.split(" ");
    let [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano} , ${hora}`;
}

document.querySelector('.busca').addEventListener('click', async (e) => {
    e.preventDefault();

    let valor = document.querySelector('.valor').value;
    
    document.querySelector(".result").innerText="";

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/paciente/get.php?valor=${valor}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res.error);

        const datar = await res.json();
        if (datar.result) {

            for (const itemr of datar.result) {
                

                document.querySelector(".result").innerHTML += itemr.id + ", " + itemr.nome_cliente + ", " + itemr.nome_equipamento + ", " + converterData(itemr.data_entrada) + ` - <a href="relatorio?id=${itemr.id}">Relatório</a>` + "<br><br>";
                

                
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});