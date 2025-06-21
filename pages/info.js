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

const name_input = localStorage.getItem('name_input')

async function fetchDetails(){
    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name_input}`)
    const pokemon = await response1.json()

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name_input}`)
    const species = await response2.json()

    return {
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        base_exp: pokemon.base_experience,
        img: pokemon.sprites.other['official-artwork'].front_default,
        type: pokemon.types[0].type.name,
        name: pokemon.species.name,

        genus: species.genera.genus,
        egg_groups: species.egg_groups[0].name,
        color: species.color.name,
        base_happiness: species.base_happiness,
        capture_rate: species.capture_rate,        
        habitat: species.habitat?.name || 'Unknown',
        flavor_text: species.flavor_text_entries[0].flavor_text,

        // STATS
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        sp_attack: pokemon.stats[3].base_stat,
        sp_defense: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat

    }
}

async function renderPage(){

    document.title = name_input.toUpperCase()

    const pkmn = await fetchDetails()
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
    list.innerHTML = `<li id="about" class="nav">About</li>
    <li id="base_stats" class="nav">Stats</li>
    <li id="abilities" class="nav">Abilities</li>
    <li id="type" class="nav">Type</li>
    <li id="evolutions" class="nav">Evolutions</li>
    <li id="moves" class="nav">Moves</li>
    <li id="forms" class="nav">Forms</li>`
    navSections.append(list)
    
    const details_div = document.createElement('div')
    details_div.id = 'details_div'

    body.append(pkmn_name, img_div, navSections, details_div)


    const about = document.getElementById('about')
    about.addEventListener('click', () => {renderAboutSection(pkmn, details_div)})

    const base_stats = document.getElementById('base_stats')
    base_stats.addEventListener('click', () => {renderStatsSection(pkmn, details_div)})
}

function renderAboutSection(pkmn, div){

    div.innerHTML = ''

    const about_heading = document.createElement('h1')
    about_heading.textContent = 'Pokédex data'

    const pkmn_id = document.createElement('p')
    pkmn_id.innerHTML = `ID: <span style="font-weight: bold">#${pkmn.id}</span>`

    const pkmn_height = document.createElement('p')
    pkmn_height.textContent = `Height: ${pkmn.height}`

    const pkmn_weight = document.createElement('p')
    pkmn_weight.textContent = `Weight: ${pkmn.weight}`

    const pkmn_genus = document.createElement('p')
    pkmn_genus.textContent = `Genus: ${pkmn.weight}`

    const pkmn_egg_groups = document.createElement('p')
    pkmn_egg_groups.textContent = `Egg Groups: ${pkmn.weight}`

    const pkmn_color = document.createElement('p')
    pkmn_color.textContent = `Color: ${pkmn.weight}`

    const pkmn_habitat = document.createElement('p')
    pkmn_habitat.textContent = `Habitat: ${pkmn.habitat}`

    const pkmn_base_exp = document.createElement('p')
    pkmn_base_exp.textContent = `Base Experience: ${pkmn.base_exp}`

    const pkmn_base_happiness = document.createElement('p')
    pkmn_base_happiness.textContent = `Base Happiness: ${pkmn.base_happiness}`

    const pkmn_capture_rate = document.createElement('p')
    pkmn_capture_rate.textContent = `Capture Rate: ${pkmn.capture_rate}`

    const pkmn_flavor_text = document.createElement('p')
    pkmn_flavor_text.textContent = `Flavor Text: "${pkmn.flavor_text}"`

    div.append(about_heading, pkmn_id, pkmn_height, pkmn_weight, pkmn_genus, pkmn_egg_groups, pkmn_color, pkmn_habitat, pkmn_base_exp, pkmn_base_happiness, pkmn_capture_rate, pkmn_flavor_text)
}

function renderStatsSection(pkmn, div){
    div.innerHTML = ''

    const stats_heading = document.createElement('h1')
    stats_heading.textContent = 'Base Stats'

    const hp = document.createElement('p')
    hp.textContent = `HP: ${pkmn.hp}`

    const attack = document.createElement('p')
    attack.textContent = `HP: ${pkmn.attack}`

    const defense = document.createElement('p')
    defense.textContent = `HP: ${pkmn.defense}`

    const sp_attack = document.createElement('p')
    sp_attack.textContent = `HP: ${pkmn.sp_attack}`

    const sp_defense = document.createElement('p')
    sp_defense.textContent = `HP: ${pkmn.sp_defense}`

    const speed = document.createElement('p')
    speed.textContent = `HP: ${pkmn.speed}`

    const total = document.createElement('p')
    total.textContent = `Total: ${pkmn.hp+pkmn.attack+pkmn.defense+pkmn.sp_attack+pkmn.sp_defense+pkmn.speed}`

    div.append(hp, attack, defense, sp_attack, sp_defense, speed, total)
}

renderPage()