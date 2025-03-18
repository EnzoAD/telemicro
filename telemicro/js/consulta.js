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

async function excluir(id) {
    if(confirm("Tem certeza que deseja excluir?")){
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/paciente/delete.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
            
        });
        alert("Item excluido com sucesso!");
        location.reload();
    }
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
                

                document.querySelector(".result").innerHTML += itemr.id + ", " + itemr.nome_cliente + ", " + itemr.nome_equipamento + ", " + converterData(itemr.data_entrada) + ` - <a href="relatorio?id=${itemr.id}">Relatório</a>` + ` - <a href="editar?id=${itemr.id}">Editar</a>` + ` - <a href="#" onclick="excluir(${itemr.id})">Excluir</a>` + "<br><br>";
                

                
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});