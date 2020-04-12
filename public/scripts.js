const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

const urlAPI = "http://localhost:3332/"

async function loadUrls() {
    const res = await fetch(urlAPI).then(data => data.json())
    res.urls.map(({ name, url }) => addElement({ name, url }))
}

function createUrl(params) {
    fetch(`${urlAPI}?name=${params.name}&url=${params.url}`)
}

function deleteUrl(params) {
    fetch(`${urlAPI}?name=${params.name}&url=${params.url}&del=1`)
}

loadUrls()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')) {
        let url = el.parentElement.firstChild.href
        url = url.slice(0,url.length-1)
        let name = el.parentElement.innerText.replace("x", "")
        deleteUrl({ name, url })
        el.parentNode.remove()
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url)
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url))
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    createUrl({ name, url })

    input.value = ""
})
