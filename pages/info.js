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

function c(word){
    return word[0].toUpperCase() + word.slice(1)
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
        ev_yield: pokemon.stats[0].effort,

        species: species.genera[7].genus,
        genus: species.genera.genus,
        egg_groups: species.egg_groups[0].name,
        color: species.color.name,
        base_happiness: species.base_happiness,
        capture_rate: species.capture_rate,        
        habitat: species.habitat?.name || 'Unknown',
        flavor_text: species.flavor_text_entries[0].flavor_text,
        growth_rate: species.growth_rate.name,
        egg_cycles: species.hatch_counter,
        gender_rate: species.gender_rate,

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
    body.setAttribute('style', `background-color: ${typeColor[pkmn.type]}`)

    const name_id = document.createElement('div')
    name_id.id = 'name_id'
    const pkmn_id = document.createElement('h2')
    pkmn_id.id = "pkmn_id"
    pkmn_id.textContent = `#${pkmn.id}`
    const pkmn_name = document.createElement('h1')
    pkmn_name.id = 'pkmn_name'
    pkmn_name.textContent = name_input.toUpperCase()
    name_id.append(pkmn_id, pkmn_name)


    const first_row = document.createElement('div')
    first_row.id = 'first-row'

    // HEIGHT WEIGHT
    const height_weight = document.createElement('div')
    height_weight.id = 'height_weight'
    const height = document.createElement('p')
    height.id = 'height'
    height.textContent = `Height: ${pkmn.height}`
    const weight = document.createElement('p')
    weight.id = 'weight'
    weight.textContent = `Weight: ${pkmn.weight}`

    height_weight.append(height, weight)

    // POKEMON IMAGE

    const pkmn_img_div = document.createElement('div')
    pkmn_img_div.id = 'image'
    const pkmn_img = document.createElement('img')
    pkmn_img.src = pkmn.img

    pkmn_img_div.append(pkmn_img)


    // POKEDEX DATA
    const pokedex_data = document.createElement('div')
    pokedex_data.id = 'pokedex_data'

    const data_heading = document.createElement('h1')
    data_heading.textContent = 'Pokédex data'

    const data_grid = document.createElement('div')
    data_grid.classList.add('grid')
    data_grid.id = 'data_grid'
    const data_array = [['Type', c(pkmn.type)], ['Species', pkmn.species], ['Egg Groups', c(pkmn.egg_groups)], ['Color', c(pkmn.color)], ['Habitat', c(pkmn.habitat)]]

    data_grid.innerHTML = `
        ${data_array.map(x => 
            `
                <p style="text-align: right">${x[0]}</p>
                <p>${x[1]}</p>
            `
        ).join('')}
    `

    pokedex_data.append(data_heading, data_grid)

    first_row.append(height_weight, pkmn_img_div, pokedex_data)

    //BASE STATS

    const second_row = document.createElement('div')
    second_row.id = 'second_row'

    // BASE STATS

    const base_stats = document.createElement('div')
    const stats_heading = document.createElement('h1')
    stats_heading.innerHTML = 'Base Stats'

    const stats_grid = document.createElement('div')
    stats_grid.classList.add('grid')
    stats_grid.id = 'stats_grid'

    const min_hp = (2*pkmn.hp)+110, max_hp = (2*pkmn.hp)+204

    const stats_array = [['Attack', pkmn.attack, 190, 229], ['Defense', pkmn.defense, 230, 196], ['Sp. Atk', pkmn.sp_attack, 194, 251], ['Sp. Def', pkmn.sp_defense, 230, 218], ['Speed', pkmn.speed, 180, 350]]
    stats_grid.innerHTML = `
        <p>HP</p> <p>${pkmn.hp}</p> 
        <div id="bar_container" style="width:35vmin;display:flex;">
            <div id="bar" style="background-color: #a0e515;height: 2vmin; border-radius: 7px;width:${100*(pkmn.hp/max_hp)}%; border: 1px solid #87c211"></div>
        </div>
        <p>${min_hp}</p> <p>${max_hp}</p>
        
        ${stats_array.map(x => 
            `
            <p>${x[0]}</p>
            <p>${x[1]}</p>
            <div id="bar_container" style="width:35vmin;display:flex;">
                <div id="bar" style="background-color: #a0e515;height: 2vmin;width:${100*(x[1]/(Math.round((2 * x[1] + 99)*1.1)-1))}%; border-radius: 7px; border: 1px solid #87c211"></div>
            </div>
            <p>${Math.round((2 * x[1] + 5)*0.9)-1}</p>
            <p>${Math.round((2 * x[1] + 99)*1.1)-1}</p>
            `
        ).join('')}
    
        <p>Total</p> <p>${pkmn.hp+pkmn.attack+pkmn.defense+pkmn.sp_attack+pkmn.sp_defense+pkmn.speed}</p> <p></p> <p>Min</p> <p>Max</p>
        `

    base_stats.append(stats_heading, stats_grid)

    // TRAINING

    const training = document.createElement('div')
    const training_heading = document.createElement('h1')
    training_heading.textContent = 'Training'

    const training_grid = document.createElement('div')
    training_grid.classList.add('grid')
    training_grid.id = 'training_grid'

    const training_array = [['EV Yield', pkmn.ev_yield], ['Catch rate', pkmn.capture_rate], ['Base Friendship', pkmn.base_happiness], ['Base Exp.', pkmn.base_exp], ['Growth Rate', c(pkmn.growth_rate)]]
    training_grid.innerHTML = `
        ${
            training_array.map(x => 
// DOUBT: WHY NOT WORKING WHEN WRAPPED IN {}
                `
                    <p>${x[0]}</p> <p>${x[1]}</p> 
                `
            ).join('')}
        `

    training.append(training_heading, training_grid)

    // BREEDING
    const breeding = document.createElement('div')
    const breeding_heading = document.createElement('h1')
    breeding_heading.textContent = 'Breeding'

    const breeding_grid = document.createElement('div')
    breeding_grid.classList.add('grid')
    breeding_grid.id = 'breeding_grid'

    const breeding_array = [['Egg Groups', c(pkmn.egg_groups)],['Gender', `${100-(pkmn.gender_rate*12.5)}% male, ${pkmn.gender_rate*12.5}% female`], ['Egg Cycles', pkmn.egg_cycles]]
    breeding_grid.innerHTML = `
        ${
            breeding_array.map(x => 
// DOUBT: WHY NOT WORKING WHEN WRAPPED IN {}
                `
                    <p>${x[0]}</p> <p>${x[1]}</p> 
                `
            ).join('')}
        `
    
    breeding.append(breeding_heading, breeding_grid)

    second_row.append(base_stats, training, breeding)

    body.append(name_id, first_row, second_row)
}

renderPage()