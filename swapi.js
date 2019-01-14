// Write your swapi code in this file!
const getStarwars = function (request, num) {
  return fetch(`https://swapi.co/api/${request}/${num}/`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Not found")
      }
    })
}

const getCrawl = function() {
  getStarwars('films', 1)
    .then(e => {
      let crawlDiv = document.getElementById("crawlDiv");
      crawlDiv.innerText = e.opening_crawl
    })
}

const getPlanet = function(num) {
  num.preventDefault()
  if (validatePlanet) {
    let planetDat = document.getElementById("planetData")
    getStarwars('planets', num.target[0].value)
    .then(e => {
      planetDat.innerText = `${e.name} - ${e.climate}`
    })
  } else {
    planetDat.innerText = "BOOO"
  }
}

function validatePlanet(x) {
  if (Number(x) < 1 && Number(x) > 61) {
    alert("Planet number must be between 1 and 61");
    return false;
  } else {
    return true;
  }
}

const getDroids = function() {
  console.log('in get droids')
  getStarwars('people', 2)
    .then(e => {
      let droid2 = document.querySelector('#droid-2')
      droid2.setAttribute('data-id', 2)
      droid2.innerText = `${e.name}, height: ${e.height}, mass: ${e.mass}`
      btnMake(droid2, 'droid-2-btn')
    })
  getStarwars('people', 3)
    .then(e => {
      let droid3 = document.querySelector('#droid-3')
      droid3.setAttribute('data-id', 3)
      droid3.innerText = `${e.name}, height: ${e.height}, mass: ${e.mass}`
      btnMake(droid3, 'droid-3-btn')
    })
}

const btnMake = function(element, iden) {
  let btn = document.createElement("button")
  btn.setAttribute('id', iden)
  btn.className = "find-home-button"
  btn.innerText = "Get Home Planet"
  element.append(btn)
}

const getHomePlanet = function() {

}

const delegateFunc = function(e) {
  if (e.target.className === "find-home-button") {
    console.log("in find-home")
    getStarwars('people', e.target.parentElement.dataset.id)
      .then(i => {
        console.log(i)
        fetch(i.homeworld)
          .then(res => {
            console.log(res)
            if (res.ok) {
              return res.json()
              console.log('OK!!')
            } else {
              throw new Error("Planet not found")
            }
          })
          .then(j => {
            // console.log(j)
            let li = document.createElement('li')
            li.innerText = j.name
            e.target.parentElement.append(li)
          })
      })
  }
}

getDroids()

document.addEventListener("DOMContentLoaded", () => {
  const crawlBtn = document.getElementById("crawlBtn");
  const planetForm = document.getElementById("planetForm")
  const starDiv = document.querySelector(".grid > div")
  console.log(starDiv)

  crawlBtn.addEventListener('click', getCrawl)
  planetForm.addEventListener('submit', getPlanet)
  starDiv.addEventListener('click', delegateFunc)
})
