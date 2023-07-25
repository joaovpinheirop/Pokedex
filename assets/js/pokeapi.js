const pokeapi = {}

function convertionPokeApiDetails(pokedatail) {
  const pokemon = new Pokemon();
  pokemon.name = pokedatail.name;
  pokemon.number = pokedatail.order;

  const types = pokedatail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokedatail.sprites.other.dream_world.front_default

  return pokemon;
}

pokeapi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((convertionPokeApiDetails))

}

pokeapi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;



  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokeapi.getPokemonsDetail)))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
}

