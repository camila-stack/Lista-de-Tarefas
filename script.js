// salvar tarefas
function salvarTarefas() {
    const lista = document.getElementById("lista").innerHTML
    localStorage.setItem("tarefas", lista)
}

// recarregar a pagina
window.onload = function () {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        document.getElementById("lista").innerHTML = tarefasSalvas

        document.querySelectorAll('.acoes button:nth-child(1)').forEach(botaoEditar => {
            botaoEditar.onclick = function () {
                const spanTexto = this.parentElement.previousElementSibling;
                const novoTexto = prompt("Editar tarefa: ", spanTexto.textContent)
                if (novoTexto !== null && novoTexto.trim() !== "") {
                    spanTexto.textContent = novoTexto.trim()
                    salvarTarefas()
                }
            }
        })

        document.querySelectorAll('.acoes button:nth-child(2)').forEach(botaoRemover => {
            botaoRemover.onclick = function () {
                this.closest('li').remove()
                salvarTarefas()
            }
        })
    }
}

// adicionar tarefa
function adicionartarefa() {
    const input = document.getElementById('inputadicionar')
    const lista = document.getElementById('lista')
    const texto = input.value.trim()

    try {
        if (texto === "") return

        const li = document.createElement('li')
        li.classList.add("tarefa-item")

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('checkbox-tarefa')

        const spanTexto = document.createElement('span')
        spanTexto.textContent = texto

        // botoes 

        const botaoEditar = document.createElement('button')
        botaoEditar.textContent = "✏️"
        botaoEditar.classList.add('botao-hover');
        botaoEditar.onclick = function () {
            const novoTexto = prompt("Editar tarefa: ", spanTexto.textContent)
            if (novoTexto !== null && novoTexto.trim() !== "") {
                spanTexto.textContent = novoTexto.trim()
                salvarTarefas()
            }
        };

        const botaoRemover = document.createElement('button')
        botaoRemover.textContent = "🗑️"
        botaoRemover.classList.add('botao-hover')
        botaoRemover.onclick = function () {
            li.remove()
            salvarTarefas()
        };

        li.appendChild(checkbox)
        li.appendChild(spanTexto)

        const containerBotoes = document.createElement('div')
        containerBotoes.classList.add('acoes')
        containerBotoes.appendChild(botaoEditar)
        containerBotoes.appendChild(botaoRemover)

        li.appendChild(containerBotoes)

        lista.appendChild(li)

        input.value = ""

        salvarTarefas()
    } catch (erro) {
        console.log("Erro ao adicionar tarefa:", erro.message)
    }
}

// limpar lista inteira
function limpar() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";
    salvarTarefas();
}

// limpar ultima tarefa adicionada
function desfazer() {
    const lista = document.getElementById('lista');
    if (lista.lastChild) {
        lista.removeChild(lista.lastChild);
        salvarTarefas();
    }
}
