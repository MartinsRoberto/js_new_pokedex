const tableBody = document.querySelector('.table tbody')

const fetchPokemon = async () => {
  for (let i = 1; i < 151; i++) {
    const pokemon = await getPokedex(i)
    createCard(pokemon)
  }
}

fetchPokemon()

async function getPokedex(id) {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  const data = await res.json()
  return data
}

function createCard(pokemon){
  const name = pokemon.name
  const id = pokemon.id.toString().padStart(3, '0')

  const $pokemon = document.createElement('tr')

  const $img = document.createElement('td')
  $img.setAttribute('class', 'img')
  $img.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png')`
  $pokemon.appendChild($img)

  const $id = document.createElement('td')
  $id.innerText = id
  $pokemon.appendChild($id)

  const $name = document.createElement('td')
  $name.innerText = name
  $pokemon.appendChild($name)


  const $total = document.createElement('td')
  $total.innerText = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat
  $pokemon.appendChild($total)
  

  const $type = document.createElement('td')
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
  $pokemon.appendChild($type)

  const $hp = document.createElement('td')
  $hp.innerText = pokemon.stats[0].base_stat
  $pokemon.appendChild($hp)
  
  const $atk = document.createElement('td')
  $atk.innerText = pokemon.stats[1].base_stat
  $pokemon.appendChild($atk)
  
  const $def = document.createElement('td')
  $def.innerText = pokemon.stats[2].base_stat
  $pokemon.appendChild($def)
  
  const $spa = document.createElement('td')
  $spa.innerText = pokemon.stats[3].base_stat
  $pokemon.appendChild($spa)

  const $spd = document.createElement('td')
  $spd.innerText = pokemon.stats[4].base_stat
  $pokemon.appendChild($spd)
  
  const $speed = document.createElement('td')
  $speed.innerText = pokemon.stats[5].base_stat
  $pokemon.appendChild($speed)

  tableBody.appendChild($pokemon)

}