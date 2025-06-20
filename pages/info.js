const typeColor = {
    normal: '#aba796',
    fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD'
}

async function fetchDetails(){
    const name_input = localStorage.getItem('name_input')
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name_input}`)
    const data = await response.json()

    return {
        img: data.sprites.other['official-artwork'].front_default,
        type: data.types[0].type.name,
        name: data.species.name
    }
}

async function renderPage(){
    const pkmn = await fetchDetails()
    console.log(pkmn)
    const body = document.querySelector('body')
    body.innerHTML = ''

    // POKEMON NAME
    const pkmn_name = document.createElement('h1')
    pkmn_name.id = 'pkmn_name'
    pkmn_name.classList.add('details')
    pkmn_name.textContent = pkmn.name.toUpperCase()

    // POKEMON IMAGE
    const img_div = document.createElement('div')
    img_div.id = 'img_div'
    
    const pkmn_type = pkmn.type
    img_div.setAttribute('style', `background-color: ${typeColor[pkmn_type]}`) //ERROR WHY

    const img = document.createElement('img')
    img.id = 'pkmn_img'
    img.src = pkmn.img
    img_div.append(img)

    const navSections = document.createElement('nav')
    const list = document.createElement('ul')
    list.id = 'nav-list'
    list.innerHTML = `<li>About</li>
    <li>Base Stats</li>
    <li>Abilities</li>
    <li>Type</li>
    <li>Evolutions</li>
    <li>Moves</li>
    <li>Forms</li>`
    navSections.append(list)
    body.append(pkmn_name, img_div, navSections)
}

renderPage()