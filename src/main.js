import api from './api';


class App { // Classe que vai guardar a nossa aplicação
    constructor(){
        this.repositories = [];

        this.form = window.document.getElementById('repo-form');
        this.inputElement = window.document.querySelector('input[name=repository]')
        this.listElement = window.document.getElementById('repo-list')

        this.registerHandlers();
    }

    registerHandlers(){ // Método que vai ouvir os eventos DOM da nossa aplicação
        this.form.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let carregando = document.createElement('span');
            carregando.appendChild(document.createTextNode('Carregando...'));
            carregando.setAttribute('id', 'loading');

            this.form.appendChild(carregando);
        } else {
            document.getElementById('loading').remove();
        }
    }

    errorReq(valor){
        this.listElement.innerHTML = '';

        let errorMsg = document.createElement('h1');
        errorMsg.appendChild(document.createTextNode(`Error 404. ${valor} inexistente!`));
        errorMsg.style.color = "#f00";

        this.listElement.appendChild(errorMsg);
        this.inputElement.value = '';
    }

    async addRepository(event){
        event.preventDefault(); // Não vai deixar o formulário ter aquele comportamento padrão de recarregar a página.

        const input = this.inputElement.value;

        if(input.length === 0) // Não precisamos colocar as chaves se for só um valor
            return; // Esse return vai fazer com que o metódo pare por aqui.

        this.setLoading();

        try{
            const response = await api.get(`/repos/${input}`)
            
            const { name, description, owner: { avatar_url }, html_url } = response.data;


            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            })

            this.inputElement.value = '';
            
            this.render();
        } catch(err){
           this.errorReq(input)
        }

        this.setLoading(false);
    }

    render(){
        this.listElement.innerHTML = '';
        this.repositories.forEach(repo => { //Diferentes das outras operações de arrays, o forEach() não muda nada no nosso vetor, ele apenas percorre.

            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repo.avatar_url);

            let strongElement = document.createElement('strong');
            strongElement.appendChild(document.createTextNode(repo.name));

            let paragraphElement = document.createElement('p');
            paragraphElement.appendChild(document.createTextNode(repo.description));

            let ancoraElement = document.createElement('a');
            ancoraElement.setAttribute('target', '_blank');
            ancoraElement.setAttribute('href', repo.html_url);
            ancoraElement.appendChild(document.createTextNode('Acessar'));

            let elementList = document.createElement('li');
            elementList.appendChild(imgElement);
            elementList.appendChild(strongElement);
            elementList.appendChild(paragraphElement);
            elementList.appendChild(ancoraElement);

            this.listElement.appendChild(elementList);
        }) 
     
        }
        

    }


new App(); // Podemos fazer assim, sem atribuir a nenhuma variável já que não vamos utlizar depois.
