addEventListener('load', function (){
    carregarNome();
    carregarItens();
    atualizarData();
});

function atualizarData(){
    const dataAtual = new Date
    let dia = dataAtual.getDay()

    switch(dia){
        case 0:
            dia = "Domingo"
        break

        case 1:
            dia = "Segunda"
        break

        case 2:
            dia = "Terça"
        break
        
        case 3:
            dia = "Quarta"
        break
        
        case 4:
            dia = "Quinta"
        break

        case 5:
            dia = "Sexta"
        break
        
        case 6:
            dia = "Sábado"
        break

        default:
            dia = "Erro"
        break
    }
    
    document.getElementsByClassName('dia-de-hoje')[0].innerText = `Dia de hoje: ${dia}`
}

function carregarNome(){
    let nome = localStorage.getItem('nome-usuario') || "";

    if(nome){
        let loginButton = document.getElementById('login-logo');

        document.getElementsByClassName('nome-perfil')[0].innerHTML = nome

        let primeirasLetras = nome.slice(0, 2).toUpperCase()
        
        if(loginButton && loginButton.style.visibility !== "hidden"){
            loginButton.style.visibility = "hidden"
        }
        document.getElementsByClassName('logo-perfil')[0].innerText = primeirasLetras

        document.getElementsByClassName('popup-login')[0].style.visibility = "hidden"
    }
}


function abrirNome(){
    document.getElementsByClassName('popup-login')[0].style.visibility = "visible"
}

function salvarNome(){
    let nome = document.getElementsByClassName('input-nome')[0].value;
    
    if(nome.length >= 2){
        let loginButton = document.getElementById('login-logo');

        document.getElementsByClassName('nome-perfil')[0].innerHTML = nome

        let primeirasLetras = nome.slice(0, 2).toUpperCase()
        
        if(loginButton && loginButton.style.visibility !== "hidden"){
            loginButton.style.visibility = "hidden"
        }
        document.getElementsByClassName('logo-perfil')[0].innerText = primeirasLetras

        localStorage.setItem('nome-usuario', nome)

        document.getElementsByClassName('popup-login')[0].style.visibility = "hidden"

    }else{
        notificacao('Seu texto precisa de 2 ou mais caracteres.')
    }
}

function notificacao(texto){
    let popupNotificacaoElement = document.getElementsByClassName('popup-notificacao')[0]
    let notificacaoTexto = document.getElementsByClassName('notificacao')[0]


    popupNotificacaoElement.style.visibility = "visible"

    notificacaoTexto.innerText = texto

    setTimeout(() =>{
        popupNotificacaoElement.style.visibility = "hidden"
    }, 3000); 
}

function removerNotificacao(){
    let popupNotificacaoElement = document.getElementsByClassName('popup-notificacao')[0]
    popupNotificacaoElement.style.visibility = "hidden"
}

const ul = document.querySelector('ul')

var tasksArray = []

const inputTarefa = document.getElementById('input-criar-tarefa') 
inputTarefa.addEventListener('keydown', campo => {
    if(campo.key === 'Enter'){
        criarTarefa()
    }
})
function criarTarefa(){
    if(inputTarefa.value != ''){

        tasksArray.push({
            'item': inputTarefa.value, 
            'status': ''
        })

        atualizarItens()
        
    }else{
        notificacao('Não é possível criar tarefas sem nome.')
    }
}

function atualizarItens(){
    localStorage.setItem('todoList', JSON.stringify(tasksArray))
    carregarItens()
}

function carregarItens(){
    ul.innerHTML = "";
    tasksArray = JSON.parse(localStorage.getItem('todoList')) || [];
    tasksArray.forEach((item, i) => {
        insetItemTela(item.item, item.status, i)
    })
}

function insetItemTela(text, status, i){
    const li = document.createElement('li')

    li.innerHTML = `
        <div class="divLi">
            <input id="checkbox" type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
            <span id="tasks-salvas" data-si=${i}>${text}</span>
            <button id="remove-lixo" onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'><img src="assets/img/x.png" alt=""></i></button>
        </div>
    `

    ul.appendChild(li)
    

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
      } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
      }
    
      inputTarefa.value = ''

      atualizarDados();
}

function done(chk, i) {

    if (chk.checked) {
        tasksArray[i].status = 'checked' 
    } else {
        tasksArray[i].status = '' 
    }
  
    atualizarItens()
}


function removeItem(i) {
tasksArray.splice(i, 1);
atualizarItens();
atualizarDados();
}

function atualizarDados(){
    // Resultado Geral
    document.getElementById('resultado-total').innerText = tasksArray.length;

    // Resultado marcado
    const totalCheck = tasksArray.filter(item => item.status === "checked").length;
    document.getElementById('realizadas').innerText = totalCheck

    // Resultado não marcado
    const naoCheck = tasksArray.filter(item => item.status === "").length;
    document.getElementById('nao-realizadas').innerText = naoCheck
}