document.addEventListener('DOMContentLoaded', () => {
    // Função para definir URLs das Olimpíadas
    const updateTimelineLinks = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const urls = {
            '2024 - Paris': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2024',
            '2020 - Tóquio': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2020',
            '2016 - Rio de Janeiro': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2016',
            '2012 - Londres': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2012',
            '2008 - Pequim': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2008',
            '2004 - Atenas': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2004',
            '2000 - Sydney': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_2000',
            '1996 - Atlanta': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_1996',
            '1992 - Barcelona': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_1992',
            '1988 - Seul': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_1988',
            '1984 - Los Angeles': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_1984',
            '1980 - Moscovo': 'https://pt.wikipedia.org/wiki/Jogos_Ol%C3%ADmpicos_de_Ver%C3%A3o_de_1980'
        };

        timelineItems.forEach(item => {
            const year = item.querySelector('h3').innerText;
            if (urls[year]) {
                const link = urls[year];
                item.querySelector('a').href = link;
                item.onclick = () => window.open(link, '_blank');
            }
        });
    };

    // Scroll Suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Desaparecimento do Cabeçalho
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            document.querySelector('header').style.top = '-100px';
        } else {
            document.querySelector('header').style.top = '0';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Destaque no Menu
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            anchor.classList.add('active');
        });
    });

    // Contador de Medalhas
    const medalCounts = {
        '2024 - Paris': { gold: 8, silver: 12, bronze: 20 },
        '2020 - Tóquio': { gold: 7, silver: 10, bronze: 15 },
        '2016 - Rio de Janeiro': { gold: 9, silver: 11, bronze: 17 },
        '2012 - Londres': { gold: 6, silver: 9, bronze: 13 },
        '2008 - Pequim': { gold: 10, silver: 7, bronze: 16 }
    };

    const updateMedalCounter = () => {
        const medalCounter = document.createElement('div');
        medalCounter.classList.add('medal-counter');

        let totalGold = 0;
        let totalSilver = 0;
        let totalBronze = 0;

        Object.values(medalCounts).forEach(counts => {
            totalGold += counts.gold;
            totalSilver += counts.silver;
            totalBronze += counts.bronze;
        });

        // Ajustar as quantidades para 40 ouro, 49 prata e 81 bronze
        totalGold = 40;
        totalSilver = 49;
        totalBronze = 81;

        medalCounter.innerHTML = `
            <h2>Contador de Medalhas</h2>
            <div class="medal-stats">
                <div class="medal-type gold">
                    <h3>Ouro</h3>
                    <p>${totalGold} medalhas</p>
                </div>
                <div class="medal-type silver">
                    <h3>Prata</h3>
                    <p>${totalSilver} medalhas</p>
                </div>
                <div class="medal-type bronze">
                    <h3>Bronze</h3>
                    <p>${totalBronze} medalhas</p>
                </div>
            </div>
            <div class="medal-progress">
                <div class="progress-bar gold" style="width: ${totalGold / (totalGold + totalSilver + totalBronze) * 100}%"></div>
                <div class="progress-bar silver" style="width: ${totalSilver / (totalGold + totalSilver + totalBronze) * 100}%"></div>
                <div class="progress-bar bronze" style="width: ${totalBronze / (totalGold + totalSilver + totalBronze) * 100}%"></div>
            </div>
            <p>Total de medalhas conquistadas em todas as edições: ${totalGold + totalSilver + totalBronze}</p>
        `;
        document.querySelector('main').appendChild(medalCounter);

        // Animação de Contador
        document.querySelectorAll('.medal-type p').forEach((elem) => {
            const value = parseInt(elem.innerText);
            elem.innerText = '0';
            let start = 0;
            const increment = Math.ceil(value / 100);

            const updateNumber = () => {
                if (start < value) {
                    start += increment;
                    elem.innerText = start;
                    setTimeout(updateNumber, 20);
                } else {
                    elem.innerText = value;
                }
            };

            updateNumber();
        });
    };

    updateMedalCounter();
    updateTimelineLinks();
});



// Seção de pesquisa de atletas
const inputAtleta = document.getElementById('inputAtleta');
const resultados = document.getElementById('resultados');
const detalhesAtleta = document.getElementById('detalhesAtleta');

const atletas = [
     { nome: 'Neymar Jr', historia: 'Neymar Jr. é um dos jogadores de futebol mais talentosos da sua geração. Com habilidades técnicas impressionantes e uma visão de jogo excepcional, ele se destacou em várias competições internacionais, levando sua equipe a conquistar títulos e marcar seu nome na história do esporte.' },
    { nome: 'Rebeca Andrade', historia: 'Atleta de ginástica artística, Rebeca Andrade brilhou nas Olimpíadas de 2024 ao conquistar medalhas de ouro na trave e no solo. Ela também ganhou a medalha de prata no individual geral, destacando-se pela sua habilidade e técnica refinada.' },
    { nome: 'Alison dos Santos', historia: 'Alison dos Santos é um dos grandes nomes do atletismo brasileiro, conquistando a medalha de ouro nos 400m com barreiras. Seu desempenho foi notável, e ele se tornou o recordista mundial na distância, solidificando seu lugar na história do esporte.' },
    { nome: 'Ítalo Ferreira', historia: 'Ítalo Ferreira, o talentoso surfista brasileiro, conquistou a medalha de ouro em 2024. Com uma performance impressionante, ele reafirmou sua posição como um dos melhores surfistas do mundo, trazendo orgulho para o Brasil.' },
    { nome: 'Ana Marcela Cunha', historia: 'Ana Marcela Cunha brilhou nas provas de maratonas aquáticas, conquistando duas medalhas de ouro nas distâncias de 10km e 5km. Sua resistência e técnica na água foram decisivas para seu sucesso em Paris.' },
    { nome: 'Bruno Fratus', historia: 'Bruno Fratus, especialista em natação no estilo livre, conquistou a medalha de prata nos 50m livre. Sua performance foi marcante, e ele quebrou o recorde olímpico, mostrando sua habilidade e determinação.' },
    { nome: 'Martine Grael', historia: 'Martine Grael e sua parceira conquistaram a medalha de ouro na classe 49er FX da vela. Seu domínio em condições desafiadoras e sua estratégia impecável garantiram o topo do pódio.' },
    { nome: 'Duda Lisboa', historia: 'Duda Lisboa, ao lado de Ana Patrícia, conquistou a medalha de prata no vôlei de praia. Com uma combinação de habilidades técnicas e espírito competitivo, elas mostraram sua força em cada partida.' },
    { nome: 'Thiago Braz', historia: 'Thiago Braz brilhou no salto com vara, conquistando a medalha de ouro e estabelecendo um novo recorde olímpico. Sua habilidade e técnica no salto foram impecáveis.' },
    { nome: 'Tatiane da Silva', historia: 'Tatiane da Silva fez parte do time brasileiro de atletismo que conquistou a medalha de prata no revezamento 4x400m. Sua contribuição crucial ajudou a equipe a alcançar uma posição de destaque.' },
    { nome: 'Lucas de Paula', historia: 'Lucas de Paula conquistou a medalha de ouro nos 200m medley de natação com uma performance impressionante e tempos recordes. Seu esforço e técnica foram evidentes durante toda a competição.' },
    { nome: 'Mariana Silva', historia: 'Mariana Silva conquistou a medalha de ouro na categoria até 49kg no taekwondo. Sua combinação de técnica e agilidade a ajudou a dominar seus adversários e levar o ouro para casa.' },
    { nome: 'Eduardo Lima', historia: 'Eduardo Lima e sua equipe de handebol conquistaram a medalha de ouro. Sua habilidade em campo e trabalho em equipe foram fundamentais para a vitória.' },
    { nome: 'Gabriela Silva', historia: 'Gabriela Silva conquistou a medalha de prata na categoria até 75kg no levantamento de peso. Sua força e técnica foram impressionantes, garantindo-lhe um lugar no pódio.' },
    { nome: 'Felipe Neto', historia: 'Felipe Neto ganhou a medalha de bronze no pentatlo moderno. Sua versatilidade e habilidades em múltiplos esportes foram evidentes ao longo da competição.' },
    { nome: 'Beatriz Ferreira', historia: 'Beatriz Ferreira conquistou a medalha de bronze no jiu-jitsu na categoria leve. Seu desempenho no tatame mostrou sua técnica refinada e determinação.' },
    { nome: 'Gustavo Santos', historia: 'Gustavo Santos conquistou a medalha de prata no BMX com uma corrida eletrizante e habilidades excepcionais em sua modalidade.' },
    { nome: 'Claudia Leite', historia: 'Claudia Leite conquistou a medalha de ouro no tiro esportivo na prova de rifle de 10m. Sua precisão e calma sob pressão foram fundamentais para seu sucesso.' },
    { nome: 'Ricardo Costa', historia: 'Ricardo Costa conquistou a medalha de prata na competição de esgrima por equipes. Sua habilidade com o sabre e trabalho em equipe foram cruciais para a conquista.' },
    { nome: 'Flávia Saraiva', historia: 'Flávia Saraiva conquistou a medalha de prata na trave e no solo na ginástica artística. Seu desempenho consistente e técnica refinada foram impressionantes.' },
    { nome: 'Gabriel Medina', historia: 'Gabriel Medina conquistou a medalha de prata na competição de surf. Sua habilidade e estilo inovador no surfe mostraram porque ele é um dos melhores do mundo.' },
    { nome: 'Isaquias Queiroz', historia: 'Isaquias Queiroz conquistou duas medalhas de prata em canoagem de velocidade, destacando-se em provas individuais e de dupla com grande técnica e resistência.' },
    { nome: 'Willian Lima', historia: 'Willian Lima conquistou a medalha de bronze na categoria meio-pesado no judô, mostrando técnica e estratégia em cada combate.' },
    { nome: 'Caio Bonfim', historia: 'Caio Bonfim conquistou a medalha de prata na marcha atlética de 20km, demonstrando resistência e técnica superiores durante a prova.' },
    { nome: 'Tatiana Weston-Webb', historia: 'Tatiana Weston-Webb conquistou a medalha de bronze no surf. Sua habilidade e estratégia nas ondas foram impressionantes durante a competição.' },
    { nome: 'Edival Pontes', historia: 'Edival Pontes conquistou a medalha de ouro no decatlo, destacando-se em uma das competições mais exigentes do atletismo.' },
    { nome: 'Larissa Pimenta', historia: 'Larissa Pimenta conquistou a medalha de prata no judô na categoria até 57kg, mostrando habilidades técnicas e resistência excepcionais.' },
    { nome: 'Ana Patrícia', historia: 'Ana Patrícia conquistou a medalha de prata no vôlei de praia ao lado de Duda Lisboa, mostrando uma combinação impressionante de habilidade e trabalho em equipe.' },
    { nome: 'Felipe Andrade', historia: 'Felipe Andrade conquistou a medalha de ouro no boxe na categoria até 69kg, com um desempenho excepcional no ringue.' },
    { nome: 'Sabrina e Luana', historia: 'Sabrina e Luana conquistaram a medalha de bronze na canoagem em prova dupla, destacando-se com técnica e coordenação impecáveis.' },
    { nome: 'Roberta Rodrigues', historia: 'Roberta Rodrigues conquistou a medalha de prata na competição de florete no esgrima, com uma performance elegante e técnica refinada.' },
    { nome: 'Felipe Arcanjo', historia: 'Felipe Arcanjo conquistou a medalha de ouro na classe Laser da vela, com uma estratégia impecável e habilidades de navegação excepcionais.' },
    { nome: 'Marcos Lins', historia: 'Marcos Lins conquistou a medalha de bronze na luta livre na categoria até 74kg, mostrando força e técnica no tatame.' },
    { nome: 'Lúcia Silva', historia: 'Lúcia Silva conquistou a medalha de prata nos 400m livre na natação, com uma performance impressionante e técnica apurada.' },
    { nome: 'Patrícia Silva', historia: 'Patrícia Silva conquistou a medalha de bronze nas fitas na ginástica rítmica, com uma apresentação graciosa e técnica.' },
    { nome: 'Tiago Santos', historia: 'Tiago Santos conquistou a medalha de prata no triatlo individual, com uma performance impressionante nas três disciplinas do esporte.' },
    { nome: 'Aline Carvalho', historia: 'Aline Carvalho conquistou a medalha de ouro no skiff na remo, destacando-se pela sua técnica e resistência.' },
    { nome: 'Pedro Henrique', historia: 'Pedro Henrique conquistou a medalha de bronze nos 100m costas na natação, com um desempenho forte e técnica refinada.' },
    { nome: 'Júlia Oliveira', historia: 'Júlia Oliveira conquistou a medalha de prata na competição de street no skate, com manobras impressionantes e estilo único.' },
    { nome: 'Marcelo Silva', historia: 'Marcelo Silva conquistou a medalha de bronze na competição de espada no esgrima, com um desempenho técnico e preciso.' },
    { nome: 'Gisele Santos', historia: 'Gisele Santos conquistou a medalha de ouro no salto triplo, com uma performance impressionante e técnica refinada.' },
    { nome: 'Fernando Costa', historia: 'Fernando Costa conquistou a medalha de prata na prova de 10km de marcha atlética, mostrando uma técnica impecável e resistência excepcional.' },
    { nome: 'Aline Ferreira', historia: 'Aline Ferreira conquistou a medalha de bronze no levantamento de peso, com uma performance técnica e forte na competição.' },
    { nome: 'Luana Almeida', historia: 'Luana Almeida conquistou a medalha de ouro no revezamento 4x100m na natação, com um trabalho em equipe impecável e velocidade impressionante.' },
    { nome: 'Gabriela Oliveira', historia: 'Gabriela Oliveira conquistou a medalha de prata na categoria até 63kg no judô, demonstrando habilidade técnica e estratégia refinada.' },
    { nome: 'Bruno Souza', historia: 'Bruno Souza conquistou a medalha de bronze no levantamento de peso na categoria até 85kg, com um desempenho notável.' },
    { nome: 'Raíssa Leal', historia: 'Raíssa Leal, conhecida como "Fadinha", conquistou a medalha de ouro no skate street. Seu estilo e criatividade no skate a destacaram entre as melhores do mundo.' },
    { nome: 'Laura Pereira', historia: 'Laura Pereira conquistou a medalha de prata no arremesso de peso, com uma performance técnica e força impressionante.' },
    { nome: 'Victor Hugo', historia: 'Victor Hugo conquistou a medalha de bronze no BMX, com uma corrida emocionante e técnica refinada.' },
    { nome: 'Juliana Costa', historia: 'Juliana Costa conquistou a medalha de ouro no hipismo, destacando-se em provas de salto com uma performance impecável.' },
    { nome: 'Pedro Luiz', historia: 'Pedro Luiz conquistou a medalha de prata no tiro com arco, mostrando precisão e habilidade sob pressão.' },
    { nome: 'Mariana Alves', historia: 'Mariana Alves conquistou a medalha de bronze na competição de esgrima com um desempenho técnico e elegante.' },
    { nome: 'Daniela Santos', historia: 'Daniela Santos conquistou a medalha de ouro na competição de taekwondo na categoria até 57kg, com uma performance dinâmica e técnica.' },
    { nome: 'José Luis', historia: 'José Luis conquistou a medalha de prata na competição de remo, com uma técnica apurada e resistência excepcional.' }
];

function filtrarAtletas(nome) {
    return atletas.filter(atleta => atleta.nome.toLowerCase().includes(nome.toLowerCase()));
}

function mostrarResultados(atletasEncontrados) {
    resultados.innerHTML = atletasEncontrados.length > 0
        ? atletasEncontrados.map(atleta => `
        <div class="item-resultado">
            <h2>${atleta.nome}</h2>
            <a href="#" data-nome="${atleta.nome}" class="link-detalhes">Ver detalhes</a>
        </div>
    `).join('')
        : '<p>Nenhum atleta encontrado.</p>';

    document.querySelectorAll('.link-detalhes').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            mostrarDetalhes(event.target.getAttribute('data-nome'));
        });
    });
}

function mostrarDetalhes(nome) {
    const atleta = atletas.find(a => a.nome === nome);
    detalhesAtleta.innerHTML = atleta
        ? `<h2>${atleta.nome}</h2><p><strong>História:</strong> ${atleta.historia}</p>`
        : '<p>Detalhes não encontrados.</p>';
}

inputAtleta.addEventListener('input', () => {
    const nome = inputAtleta.value.trim();
    mostrarResultados(nome ? filtrarAtletas(nome) : []);
});
