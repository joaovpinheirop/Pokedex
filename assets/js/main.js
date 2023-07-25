const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonitem = document.querySelectorAll(".pokemon");
const detail = document.querySelector(".content-detail");
const content = document.querySelector(".content");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}" onclick="Detail(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
function loadPokemonD(id) {
    pokeApi.getPokemonD(id).then((pokemons) => {

        detail.innerHTML = `<div class="pokemon-detail  ${pokemons.type}">
        <ol class="hub">
            <li id="back" >
                <img  onclick=""src="https://cdn.icon-icons.com/icons2/2385/PNG/512/arrow_left_icon_144544.png">
            </li>
            <li id="favorit">
                <img src="https://cdn-icons-png.flaticon.com/512/1330/1330225.png" alt="voltar">
            </li>
        </ol>

        <span class="nome" id="namePokemon">${pokemons.name}</span>
        <span class="number" id="numberPokemon">${pokemons.number}</span>

        <div class="detail">
            <ol class="types" id="typesPokemons">
            ${pokemons.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
               
            </ol>
            <img id="img-pokemon" src="${pokemons.photo}"
                alt="pokemon">

        </div>



    </div>
    <div class="espesification">
        <span class="details"> Aboult</span>

        <ol class="listDetails">
            <li>Height <span>${pokemons.height}</span></li>
            <li>Weight <span>${pokemons.weight}</span></li>
            <li>Abilities <span> ${pokemons.abillities.map((abillities) => `${abillities}`).join(', ')}
        </span></li>
        </ol>

    </div>`;
        const back = document.getElementById('back');
        back.addEventListener('click', () => {
            detail.style.display = "none"
        })
    });
}
loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function Detail(element) {
    var dataId = element.getAttribute("data-id");
    detail.style.display = "block"



    loadPokemonD(dataId);

}