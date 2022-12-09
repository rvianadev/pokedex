const pokemonsList = document.getElementById("pokemonList");
const loadMorePokemonsButton = document.getElementById("loadMorePokemonsButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToItemList(pokemon) {
  return `
    
  `;
}

function loadPokemonItems(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `).join('')

    pokemonsList.innerHTML += newHTML;
  })
}

loadPokemonItems(offset, limit);

loadMorePokemonsButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMorePokemonsButton.parentElement.removeChild(loadMorePokemonsButton);
  } else {
    loadPokemonItems(offset, limit);
  }

})
