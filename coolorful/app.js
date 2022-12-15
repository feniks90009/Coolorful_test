const cols = document.querySelectorAll("div")

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomCol()
    }
})
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if(type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function setRandomCol(isInitial) {
    const colors = []
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const button = col.querySelector('button')
        const text = col.querySelector('h2')
        const color = chroma.random()

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        colors.push(color)

        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateLocation(colors)
}
function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}
function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}
function updateLocation(colors = []) {
    document.location.hash = colors.map((col) => {
        console.log(col)
        return col.toString().substring(1)
    }).join('-')
}

function getColorFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }
    return[]
}
setRandomCol(true)