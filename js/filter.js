const btnSearch = document.querySelector('.filter  .input-search button')
const inputSearch = document.querySelector('.filter  .input-search input')
const filter_generation = document.querySelector('.filter-generation select')
const filter_type = document.querySelector('.filter-type select')

btnSearch.addEventListener('click', () => {
  container.innerHTML = tableStructure
  fetchPokemon(inputSearch.value, '')
})

filter_generation.addEventListener('change', () => {
  container.innerHTML = tableStructure
  fetchPokemon('', '', filter_generation.value)
})


filter_type.addEventListener('change', () => {
  container.innerHTML = tableStructure
  fetchPokemon('', filter_type.value, '')
})

fetchPokemon()