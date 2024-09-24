const TOTAL_POKEMONS = 200;
const TOTAL_PAGES = 200;

(async()=>{
  const fs = require('fs');

  const pokemonsIds = Array.from({length:TOTAL_POKEMONS},(_,i)=>i+1);
  const pokemonsPages = Array.from({length:TOTAL_PAGES},(_,i)=>i+1);

  let fileContentIds = pokemonsIds.map(
    id=>`/pokemons/${id}`
  ).join('\n');

  let fileContentPage = pokemonsPages.map(
    id=>`/pokemons/page/${id}`
  ).join('\n');

  let fileContent = fileContentIds.concat('\n').concat(fileContentPage);


  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res=>res.json());

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon=>`/pokemons/page/${pokemon.name}`
  ).join('\n');

  fs.writeFileSync('routes.txt',fileContent);

  console.log('Routes.txt Generated')
})();
