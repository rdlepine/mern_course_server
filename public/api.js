const getButton = document.getElementById('user_form')

getButton.addEventListener('submit', getRequest)

function getRequest(event) {
    event.preventDefault()
    fetch('/api/movies').then( (response) => {
        return response.json()
    }).then( (data) => {
        //console.log(JSON.stringify(data))
        for(let i in data) {
            document.getElementById('results').innerHTML += data[i].movieTitle + '<br />'

        }
    })
}