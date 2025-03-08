document.querySelector('.equi').addEventListener('click', async (e) => {
    e.preventDefault();
    

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

    document.querySelector(".causa").innerHTML = "";

    select = document.querySelector(".causa");
    let opcoes2 = [];
    opcoes2.push({ valor: -1, texto: "" });
    opcoes2.forEach(opcao2 => {
        let option2 = document.createElement("option");
        option2.value = opcao2.valor;
        option2.textContent = opcao2.texto;
        select.appendChild(option2);
    });

    document.querySelector(".solucao").innerHTML = "";

    select = document.querySelector(".solucao");
    let opcoes3 = [];
    opcoes3.push({ valor: -1, texto: "" });
    opcoes3.forEach(opcao3 => {
        let option3 = document.createElement("option");
        option3.value = opcao3.valor;
        option3.textContent = opcao3.texto;
        select.appendChild(option3);
    });        
        
    
  })
  
document.querySelector('.def').addEventListener('click', async (e) => {
    e.preventDefault();

    if(document.querySelector('.defeito').value == -1 ){

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
    document.querySelector(".causa").innerHTML = "";

    select = document.querySelector(".causa");
    let opcoes2 = [];
    opcoes2.push({ valor: -1, texto: "" });
    opcoes2.forEach(opcao2 => {
        let option2 = document.createElement("option");
        option2.value = opcao2.valor;
        option2.textContent = opcao2.texto;
        select.appendChild(option2);
    });

    document.querySelector(".solucao").innerHTML = "";

    select = document.querySelector(".solucao");
    let opcoes3 = [];
    opcoes3.push({ valor: -1, texto: "" });
    opcoes3.forEach(opcao3 => {
        let option3 = document.createElement("option");
        option3.value = opcao3.valor;
        option3.textContent = opcao3.texto;
        select.appendChild(option3);
    });
  })
  
  document.querySelector('.cau').addEventListener('click', async (e) => {
    e.preventDefault();

    if(document.querySelector('.causa').value == -1 ){

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
    document.querySelector(".solucao").innerHTML = "";

    select = document.querySelector(".solucao");
    let opcoes3 = [];
    opcoes3.push({ valor: -1, texto: "" });
    opcoes3.forEach(opcao3 => {
        let option3 = document.createElement("option");
        option3.value = opcao3.valor;
        option3.textContent = opcao3.texto;
        select.appendChild(option3);
    });
  })
  
  document.querySelector('.sol').addEventListener('click', async (e) => {
    e.preventDefault();

    if(document.querySelector('.solucao').value == -1 ){

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
    
  })

  function cadastrarEquipamento() {
    Swal.fire({
        title: "Cadastrar Equipamento",
        input: "text",
        inputPlaceholder: "Digite o nome do equipamento",
        showCancelButton: true,
        confirmButtonText: "Salvar",
        cancelButtonText: "Cancelar",
        preConfirm: (nome) => {
            if (!nome) {
                Swal.showValidationMessage("O nome não pode estar vazio!");
                return false;
            }
            return nome;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            enviarParaBanco(result.value);
        }
    });
}

async function enviarParaBanco(nome) {
    try {
        let response = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/equipamento/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome })
        });

        let data = await response.json();
        Swal.fire("Sucesso!", data.message, "success");

        document.querySelector(".equipamento").innerHTML = "";

        select = document.querySelector(".equipamento");
        let opcoes = [];
        opcoes.push({ valor: -1, texto: "" });
        opcoes.forEach(opcao => {
            let option = document.createElement("option");
            option.value = opcao.valor;
            option.textContent = opcao.texto;
            select.appendChild(option);
        });

        try {
            let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/equipamento/getAll.php`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
    
            const datar = await res.json();
            if (datar.result) {
                let select = document.querySelector(".equipamento");
                let opcoes = [];
    
                for (const itemr of datar.result) {
                    
    
                    opcoes.push({ valor: itemr.id, texto: itemr.nome });
                    
    
                    
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
    } catch (error) {
        Swal.fire("Erro!", "Erro ao cadastrar. Tente novamente!", "error");
    }
}

function cadastrarDefeito() {
    if(document.querySelector('.equipamento').value != -1 ){

        
        Swal.fire({
            title: "Cadastrar Defeito",
            input: "text",
            inputPlaceholder: "Digite o defeito",
            showCancelButton: true,
            confirmButtonText: "Salvar",
            cancelButtonText: "Cancelar",
            preConfirm: (nome) => {
                if (!nome) {
                    Swal.showValidationMessage("O defeito não pode estar vazio!");
                    return false;
                }
                return nome;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                enviarParaBanco2(result.value);
            }
        });
    } else {
        Swal.fire("Atenção!", "Selecione um equipamento antes de cadastrar um novo defeito.", "warning");
    }
}

async function enviarParaBanco2(nome) {
    try {
        let response = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/defeito/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao: nome,
                id_equipamento: document.querySelector('.equipamento').value
            })
        });

        let data = await response.json();
        Swal.fire("Sucesso!", data.message, "success");

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
    } catch (error) {
        Swal.fire("Erro!", "Erro ao cadastrar. Tente novamente!", "error");
    }
}

function cadastrarCausa() {
    if(document.querySelector('.defeito').value != -1 ){

        
        Swal.fire({
            title: "Cadastrar Causa",
            input: "text",
            inputPlaceholder: "Digite a causa",
            showCancelButton: true,
            confirmButtonText: "Salvar",
            cancelButtonText: "Cancelar",
            preConfirm: (nome) => {
                if (!nome) {
                    Swal.showValidationMessage("A causa não pode estar vazio!");
                    return false;
                }
                return nome;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                enviarParaBanco3(result.value);
            }
        });
    } else {
        Swal.fire("Atenção!", "Selecione um defeito antes de cadastrar uma nova causa.", "warning");
    }
}

async function enviarParaBanco3(nome) {
    try {
        let response = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/causa/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao: nome,
                id_defeito: document.querySelector('.defeito').value
            })
        });

        let data = await response.json();
        Swal.fire("Sucesso!", data.message, "success");

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


        let equip = document.querySelector('.causa').value;

        try {
            let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/causa/get2.php?id_defeito=${equip}`, {
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
    } catch (error) {
        Swal.fire("Erro!", "Erro ao cadastrar. Tente novamente!", "error");
    }
}

function cadastrarSolucao() {
    if(document.querySelector('.causa').value != -1 ){

        
        Swal.fire({
            title: "Cadastrar Solução",
            input: "text",
            inputPlaceholder: "Digite a solucao",
            showCancelButton: true,
            confirmButtonText: "Salvar",
            cancelButtonText: "Cancelar",
            preConfirm: (nome) => {
                if (!nome) {
                    Swal.showValidationMessage("A solucao não pode estar vazia!");
                    return false;
                }
                return nome;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                enviarParaBanco4(result.value);
            }
        });
    } else {
        Swal.fire("Atenção!", "Selecione um causa antes de cadastrar uma nova solução.", "warning");
    }
}

async function enviarParaBanco4(nome) {
    try {
        let response = await fetch('http://'+ window.location.hostname + '/telemicro/api-telemicro/solucao/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao: nome,
                id_causa: document.querySelector('.causa').value
            })
        });

        let data = await response.json();
        Swal.fire("Sucesso!", data.message, "success");

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


        let equip = document.querySelector('.solucao').value;

        try {
            let res = await fetch('http://'+ window.location.hostname + `/telemicro/api-telemicro/solucao/get2.php?id_defeito=${equip}`, {
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
    } catch (error) {
        Swal.fire("Erro!", "Erro ao cadastrar. Tente novamente!", "error");
    }
}
