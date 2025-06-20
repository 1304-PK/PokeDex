const searchBtn = document.getElementById('search-button')

searchBtn.addEventListener('click', () => {
    const name_input = document.getElementById('name-input').value
    localStorage.setItem('name_input', name_input)
    window.location.href = 'pages/info.html'

})

