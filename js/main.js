
const fetchPokemon = async () => {
  for (let i = 1; i < 152; i++) {
    const pokemon = await getPokemon(i)
    createCard(pokemon)
  }
}

fetchPokemon()

const brand = document.querySelector('.brand')
brand.addEventListener('click', () => {
  const container = document.querySelector('.container')
  container.innerHTML = `
  <table class="table sortable">
    <thead>
      <tr>
        <th>IMG</th>
        <th>ID</th>
        <th>Name</th>
        <th>Types</th>
        <th>Total</th>
        <th>HP</th>
        <th>Attack</th>
        <th>Defense</th>
        <th>Sp. Atk</th>
        <th>Sp. Def</th>
        <th>Speed</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  `
  fetchPokemon()
})


async function getPokemon(id) {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  const data = await res.json()
  return data
}

function createCard(pokemon) {
  const tableBody = document.querySelector('.table tbody')
  const name = pokemon.name
  const id = pokemon.id.toString().padStart(3, '0')

  const $pokemon = document.createElement('tr')
  $pokemon.setAttribute('onclick', 'pokeInfo(this)')

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

  const $type = document.createElement('td')
  if (pokemon.types.length == 2) {
    $type.innerHTML = `
      <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span> 
      <span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>       
      `
  }
  else if (pokemon.types.length == 1) {
    $type.innerHTML = `
      <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span> 
      `
  }
  $pokemon.appendChild($type)


  const $total = document.createElement('td')
  $total.innerText = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat
  $pokemon.appendChild($total)

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


async function pokeInfo(number) {
  const id = Number(number.querySelector('td:nth-child(2)').innerText)
  const pokemon = await getPokemon(id)

  const poke_info = document.createElement('div')
  poke_info.setAttribute('class', 'poke-info')

  poke_info.innerHTML += `
    <div class="img">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png"/>
    </div>
  `
  const base_info = baseInfo(pokemon)
  poke_info.innerHTML += base_info

  const more_info = moreInfo(pokemon)
  poke_info.innerHTML += more_info

  const poke_stats = pokeStats(pokemon)
  poke_info.innerHTML += poke_stats

  const container = document.querySelector('.container')
  container.innerHTML = ""
  container.appendChild(poke_info)
}


function paint(a) {
  if (a >= 150) {
    return '#00c2b8'
  }
  else if (a >= 130) {
    return '#23cd5e'
  }
  else if (a >= 90) {
    return '#a0e515'
  }
  else if (a >= 60) {
    return '#ffdd57'
  }
  else if (a >= 30) {
    return '#ff7f0f'
  }
  else {
    return '#f34444'
  }

}

function baseInfo(pokemon){
  if(pokemon.types.length == 2){
    return `
      <div class="base-info">
        <h3>Base Info</h3>
        <p class="id">National Nº: #${pokemon.id}</p>
        <p class="name">Name: ${pokemon.name}</p>
        <p class="types">
          Types: 
          <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>
          <span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>
        </p>
      </div>
    `
  }
  else{
    return `
      <div class="base-info">
      <h3>Base Info</h3>
      <p class="id">National Nº: #${pokemon.id}</p>
      <p class="name">Name: ${pokemon.name}</p>
        <p class="types">
          <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>
        </p>
      </div>
    `
  }
}

function moreInfo(pokemon){
  if(pokemon.abilities.length == 3){
    return `
    <div class="more-info">
      <h3>More Info</h3>
      <p>Abilities: ${pokemon.abilities[0].ability.name} / ${pokemon.abilities[1].ability.name} / ${pokemon.abilities[2].ability.name}</p>
      <p>Height: ${pokemon.height/10} m</p>
      <p>Weight: ${pokemon.weight/10} kg</p>
      <p>Experience: ${pokemon.base_experience} xp</p>
    </div>
    `
  }
  else if(pokemon.abilities.length == 2){
    return `
    <div class="more-info">
      <h3>More Info</h3>
      <p>Abilities: ${pokemon.abilities[0].ability.name} / ${pokemon.abilities[1].ability.name}</p>
      <p>Height: ${pokemon.height/10} m</p>
      <p>Weight: ${pokemon.weight/10} kg</p>
      <p>Experience: ${pokemon.base_experience} xp</p>
    </div>
    `
  }
  else{
    return `
    <div class="more-info">
      <h3>More Info</h3>
      <p>Abilities: ${pokemon.abilities[0].ability.name}</p>
      <p>Height: ${pokemon.height/10} m</p>
      <p>Weight: ${pokemon.weight/10} kg</p>
      <p>Experience: ${pokemon.base_experience} xp</p>
    </div>
    `
  }
  
}

function pokeStats(pokemon) {
  const totalStats = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat
  return `
  <div class="poke-stats">
    <h2>Base Stats</h2>
    <div class="row">
      <div class="stats-name">Total</div>
      <div class="stats-base">${totalStats}</div>
      <div class="bar"></div>
      <div class="stats-min">Min</div>
      <div class="stats-max">Max</div>
    </div>
    <div class="row">
      <div class="stats-name">HP</div>
      <div class="stats-base">${pokemon.stats[0].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[0].base_stat)}; width: ${Math.floor((pokemon.stats[0].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[0].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-max">${Math.floor((pokemon.stats[0].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
    <div class="row">
      <div class="stats-name">Attack</div>
      <div class="stats-base">${pokemon.stats[1].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[1].base_stat)}; width: ${Math.floor((pokemon.stats[1].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[1].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-max">${Math.floor((pokemon.stats[1].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
    <div class="row">
      <div class="stats-name">Defense</div>
      <div class="stats-base">${pokemon.stats[2].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[2].base_stat)}; width: ${Math.floor((pokemon.stats[2].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[2].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-min">${Math.floor((pokemon.stats[2].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
    <div class="row">
      <div class="stats-name">Sp. Attack</div>
      <div class="stats-base">${pokemon.stats[3].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[3].base_stat)}; width: ${Math.floor((pokemon.stats[3].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[3].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-max">${Math.floor((pokemon.stats[3].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
    <div class="row">
      <div class="stats-name">Sp. Defense</div>
      <div class="stats-base">${pokemon.stats[4].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[4].base_stat)}; width: ${Math.floor((pokemon.stats[4].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[4].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-max">${Math.floor((pokemon.stats[4].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
    <div class="row">
      <div class="stats-name">Speed</div>
      <div class="stats-base">${pokemon.stats[5].base_stat}</div>
      <div class="bar">
        <span class="stats-color" style="background-color: ${paint(pokemon.stats[5].base_stat)}; width: ${Math.floor((pokemon.stats[5].base_stat * 2 + 36 + 63) * 1.1) / 6}%;"></span>
      </div>
      <div class="stats-min">${Math.floor((pokemon.stats[5].base_stat * 2 + 5) * 0.9)}</div>
      <div class="stats-max">${Math.floor((pokemon.stats[5].base_stat * 2 + 36 + 63) * 1.1)}</div>
    </div>
  </div>`
}