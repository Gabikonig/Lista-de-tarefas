const inputElement = document.querySelector(".entradadetarefas");
const addTaskButton = document.querySelector(".botaoadicionar");
const tasksContainer = document.querySelector(".tasks-container");
const localStorageKey = 'listadetarefas'

//Validação do texto
const validarinput = () => 
    {
    if( inputElement.value.trim().length>0){
        return true;
    }
    else {
        return false;
    }
};

//Adicionar tarefa
const adicionartarefa = () => {
    const textovalido = validarinput(); 

    if(!textovalido){
        return inputElement.classList.add("erro");
    }

    //Adicionando no local storage
    let valor=JSON.parse(localStorage.getItem('listadetarefas')||"[]")
    valor.push({
        name: inputElement.value,
        complete: false
        
    })
    localStorage.setItem(localStorageKey,JSON.stringify(valor))
       
    const check = document.createElement('div'); //Colocando o check para marcar como feito
    check.classList.add('form-check');
    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.setAttribute('type', 'checkbox');

    const novoitem = document.createElement('div'); //Criando uma div nova no html
    novoitem.classList.add('item-tarefa'); //Colocando a class da div

    const texto = document.createElement('p'); //Criando o parágrafo que vai aparecer a lista de tarefas
    texto.innerText=inputElement.value;

    const deleteitem = document.createElement('i');
    deleteitem.classList.add("fa-solid"); //Adicionando ícone da lixeira - não da pra adicionar mais de uma class junto
    deleteitem.classList.add("fa-trash");
    
    //Atribuindo as divs, p e i para uma unica div
    novoitem.appendChild(check);
    check.appendChild(checkbox);
    novoitem.appendChild(check);
    novoitem.appendChild(texto);
    novoitem.appendChild(deleteitem);
    check.appendChild(texto);

    tasksContainer.appendChild(novoitem);

    inputElement.value="" //Limpar barra depois de clicar em adicionar
    
    //Deletar tarefa
    deleteitem.addEventListener('click', () => apagar(novoitem));
    
    checkbox.addEventListener('click', () =>concluido(check)); 
};

//Escrendo após o erro
const escreveposerro = () => {
    const textovalido=validarinput();

    if(textovalido){
        return inputElement.classList.remove("erro");
    }
};

//FALTA CONSEGUIR MANTER A LISTA NA TELA DPS DE ATUALIZAR

//Marcar tarefa como concluída - falta atualizar no local storage
const concluido = (check) =>{
    let valor=JSON.parse(localStorage.getItem('listadetarefas')||"[]")
    const texto= check.querySelector('p');
    texto.classList.toggle("completed");
    localStorage.setItem(localStorageKey,JSON.stringify(valor))   
};

//Deletar tarefa 
const apagar = (novoitem) => {
    let valor=JSON.parse(localStorage.getItem('listadetarefas')||"[]")
    let index = valor.findIndex(x=>x.name == novoitem)
    valor.splice(index,1)  
    localStorage.setItem(localStorageKey,JSON.stringify(valor))
    novoitem.remove()    
};

addTaskButton.addEventListener("click", () => adicionartarefa());

inputElement.addEventListener("change", () => escreveposerro());