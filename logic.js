'use strict';

const todos_status = {'inicialização':0, 'jogando':1, 'venceu':2, 'perdeu':3};

let numero_correto;
let tentativa = 0;
let status = todos_status['inicialização'];


const max_num_tentativas = 10;

const btn_testar     = document.querySelector('.testar');
const inp_tentativa  = document.querySelector('.tentativa');
const lst_tentativas = document.querySelector('.tentativas');
const num_tentativas = document.querySelector('.num_tentativas')
const dica           = document.querySelector('.dica');


const inicializar = function(){
    numero_correto = Math.max(Math.ceil(Math.random()*100), 1);
    tentativa = 0;

    btn_testar.firstChild.data = 'Jogar'; // texto do button
    status = todos_status['jogando'];     // altera o status do jogo
    inp_tentativa.value = '';             // reseta o número de tentativas
    lst_tentativas.innerHTML = '';        // list a lista de tentativas
    dica.innerHTML = '';                  // limpa a dica
};


const jogar = function(){
    const mensagens = ['Quase lá...', 'Quente', 'Está se aproximando',
                       'Morno', 'Esforçe-se mais...', 'Frio', 'Pra lá de Saturno...',
                       'Use outra estratégia.. kkk'];

    const map = (x, x0, xf, y0, yf) => {
        return ((yf - y0)*x)/(xf - x0) + y0;
    };

    try {
        tentativa++;
        const numero = Number(inp_tentativa.value);
        if (isNaN(numero)) throw 'Bad Number';

        // Venceu o jogo
        if (numero === numero_correto){
            alert('Você venceu :D');
            status = todos_status['venceu'];            
        }
        // Perdeu o jogo
        else if (tentativa === max_num_tentativas){
            alert('Número máximo de tentativas atingidas. Você perdeu :/');
            status = todos_status['perdeu'];
        }

        /*
        if (status === todos_status['venceu'] || status === todos_status['perdeu']){
            // Simplificar? Pode prejudicar a legibilidade
            let jogar_novamente = confirm('Deseja jogar novamente?'); 
            if (jogar_novamente)
                inicializar();
        }
        */
        const erro = Math.abs(numero - numero_correto);
        console.log('erro: ' + erro + ', position: ' + map(erro, 0, 100, 0, mensagens.length - 1));
        dica.innerHTML = mensagens[Math.round(map(erro, 0, 100, 0, mensagens.length - 1))]; // Retorna um número entre:
                                                          //    0: ceil(( 0.. 33) / 34) = 0
                                                          //    2: ceil((68..101) / 34) = 2
        
        num_tentativas.innerHTML = tentativa;     // Exibe quantas tentativas já ocorreram
        lst_tentativas.innerHTML += numero + ' '; // Mostra todos os números já testados        
    }
    catch(e){
        alert('Número mal formatado. Insira outro, por favor!');
        inp_tentativa.value = '';
    }
};

const testar_numero = function(){
    if (status ===  todos_status['inicialização'])
        inicializar();
    if (status === todos_status['jogando'])
        jogar();
    
    if (status === todos_status['venceu'] || status === todos_status['perdeu']){
            // Simplificar? Pode prejudicar a legibilidade
        let jogar_novamente = confirm('Deseja jogar novamente?'); 
        if (jogar_novamente)
        inicializar();
    }    
};

btn_testar.addEventListener('click', testar_numero);
inp_tentativa.addEventListener('onkeypress', function(characterCode){
    if (characterCode == 31)
        testar_numero();
});