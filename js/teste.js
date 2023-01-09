async function pokeInfo(number){
  const id = Number(number.querySelector('td:nth-child(2)').innerText)
  const pokemon = await getPokemon(id)

  const container = document.querySelector('.container')
  const table = document.querySelector('.container .table')

  const poke_info = document.createElement('div')
  poke_info.setAttribute('class','poke-info')
  
  const $img = document.createElement('div')
  $img.setAttribute('class', 'img')
  $img.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png')`
  poke_info.appendChild($img)

  const $id = document.createElement('div')
  $id.innerText = pokemon.id
  poke_info.appendChild($id)

  const $name = document.createElement('div')
  $name.innerText = pokemon.name
  poke_info.appendChild($name)

  const $type = document.createElement('div')
  if(pokemon.types.length == 2){
    $type.innerHTML = `
      <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span> 
      <span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>       
      `
  }
  else if(pokemon.types.length == 1){
    $type.innerHTML = `
      <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span> 
      `
  }
  poke_info.appendChild($type)

  const $abilities = document.createElement('div')
  if(pokemon.abilities.length == 3){
    $abilities.innerHTML = `
      <span>${pokemon.abilities[0].ability.name}</span> 
      <span>${pokemon.abilities[1].ability.name}</span>       
      <span>${pokemon.abilities[2].ability.name}</span>       
    `
  }
  else if(pokemon.abilities.length == 2){
    $abilities.innerHTML = `
      <span>${pokemon.abilities[0].ability.name}</span> 
      <span>${pokemon.abilities[1].ability.name}</span>       
    `
  }
  else if(pokemon.abilities.length == 1){
    $abilities.innerHTML = `
      <span>${pokemon.abilities[0].ability.name}</span> 
    `
  }
  poke_info.appendChild($abilities)

  container.replaceChild(poke_info, table)
  console.log(pokemon)
}