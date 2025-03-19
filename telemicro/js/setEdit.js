async function editSalvar() {

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
    let idcriador = userData?.id;
    let id_paciente = document.querySelector('.id').innerText; // Supondo que haja um campo para o ID

    if (!cliente || !os || !id_equipamento || !marca || !modelo || !id_defeito || !idcriador || !id_paciente) {
        alert('Por favor, não envie campos obrigatórios vazios.');
        return;
    }


    try {
        let res = await fetch('http://' + window.location.hostname + '/telemicro/api-telemicro/paciente/update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id_paciente,
                nome_cliente: cliente,
                os: os,
                id_equipamento: id_equipamento,
                marca: marca,
                modelo: modelo,
                id_defeito: id_defeito,
                id_causa: id_causa,
                id_solucao: id_solucao,
                idcriador: idcriador
            })
        });

        if (!res.ok) {
            throw new Error('Erro ao atualizar paciente');
        }

        const data = await res.json();

        if (data.result) {
            alert('Triagem atualizada com sucesso!');
            window.location.href = 'http://' + window.location.hostname + '/telemicro/telemicro/home';
        } else {
            console.error('Update failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setEquipamento(){
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
}
async function setDefeito(){
    document.querySelector(".defeito").innerHTML = "";

    select = document.querySelector(".defeito");
            let opcoes = [];
            opcoes.push({ valor: -1, texto: "" });
            opcoes.forEach(opcao => {
            let option = document.createElement("option");
            option.value = opcao.valor;
            option.textContent = opcao.texto;
            select.appendChild(option);
        });
    
    let equip = document.querySelector('.equipamento').value;

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/defeito/get2.php?id_equipamento=${equip}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datar = await res.json();
        if (datar.result) {
            
            let select = document.querySelector(".defeito");
            let opcoes = [];

            for (const itemr of datar.result) {
                

                opcoes.push({ valor: itemr.id, texto: itemr.descricao });
                

                
            }
            opcoes.forEach(opcao => {
                let option = document.createElement("option");
                option.value = opcao.valor;
                option.textContent = opcao.texto;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setCausa(){
    document.querySelector(".causa").innerHTML = "";

    select = document.querySelector(".causa");
            let opcoes = [];
            opcoes.push({ valor: -1, texto: "" });
            opcoes.forEach(opcao => {
            let option = document.createElement("option");
            option.value = opcao.valor;
            option.textContent = opcao.texto;
            select.appendChild(option);
        });
    
    let def = document.querySelector('.defeito').value;

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/causa/get2.php?id_defeito=${def}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datar = await res.json();
        if (datar.result) {
            
            let select = document.querySelector(".causa");
            let opcoes = [];

            for (const itemr of datar.result) {
                

                opcoes.push({ valor: itemr.id, texto: itemr.descricao });
                

                
            }
            opcoes.forEach(opcao => {
                let option = document.createElement("option");
                option.value = opcao.valor;
                option.textContent = opcao.texto;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setSolucao(){
    document.querySelector(".solucao").innerHTML = "";

    select = document.querySelector(".solucao");
            let opcoes = [];
            opcoes.push({ valor: -1, texto: "" });
            opcoes.forEach(opcao => {
            let option = document.createElement("option");
            option.value = opcao.valor;
            option.textContent = opcao.texto;
            select.appendChild(option);
        });
    
    let cau = document.querySelector('.causa').value;

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/solucao/get2.php?id_causa=${cau}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datar = await res.json();
        if (datar.result) {
            
            let select = document.querySelector(".solucao");
            let opcoes = [];

            for (const itemr of datar.result) {
                

                opcoes.push({ valor: itemr.id, texto: itemr.descricao });
                

                
            }
            opcoes.forEach(opcao => {
                let option = document.createElement("option");
                option.value = opcao.valor;
                option.textContent = opcao.texto;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setDadosIniciais() {

    document.querySelector('.id').innerText = new URLSearchParams(window.location.search).get('id');
    let id_paciente = new URLSearchParams(window.location.search).get('id');

    if (!id_paciente) return;

    try {
        let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/paciente/getId.php?valor=`+ id_paciente , {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
            throw new Error('Erro ao buscar dados do paciente');
        }

        const data = await res.json();
        console.log(data);
        if (data) {
            document.querySelector('.cliente').value = data.result[0].nome_cliente;
            document.querySelector('.os').value = data.result[0].os;
            await setEquipamento();
            document.querySelector('.equipamento').value = data.result[0].id_equipamento;
            document.querySelector('.marca').value = data.result[0].marca;
            document.querySelector('.modelo').value = data.result[0].modelo;
            await setDefeito();
            document.querySelector('.defeito').value = data.result[0].id_defeito;
            await setCausa();
            document.querySelector('.causa').value = data.result[0].id_causa;
            await setSolucao();
            document.querySelector('.solucao').value = data.result[0].id_solucao;
        }
    } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
    }
}

document.addEventListener('DOMContentLoaded', setDadosIniciais);
