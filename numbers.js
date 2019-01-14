// // Write your numbers code in this file!
//
// const getNumDat = function(number) {
//   return fetch(`http://numbersapi.com/${number}/trivia`)
//     .then(res => {
//       if (res.ok) {
//         return res.text()
//       } else {
//         throw new Error ("ERROR! Number not found")
//       }
//     })
//     .then(e => String(e))
// }
//
// const oneFact = function() {
//   let factSpace = document.querySelector('#one-facts')
//   if (factSpace.firstChild) {
//     factSpace.removeChild(factSpace.firstChild)
//   }
//
//   getNumDat(1)
//     .then(e => {
//       let li = document.createElement('li')
//       li.innerText = e
//       factSpace.append(li)
//     })
// }
//
// const pickNum = function(e) {
//   let factSpace = document.querySelector('#random-math-fact')
//   let li = document.createElement('li')
//   // clear facts
//   while (factSpace.firstChild) {
//     factSpace.removeChild(factSpace.firstChild);
//   }
//   console.log(isNaN(Number(e.target.value)))
//   if (isNaN(Number(e.target.value))) {
//     console.log('number is NaN')
//     li.innerText = "please enter a valid number"
//     li.style.display = 'inline'
//     factSpace.append(li)
//   } else {
//     console.log("number is not NaN")
//     getNumDat(e.target.value)
//     .then(e => {
//       li.innerText = e
//       factSpace.append(li)
//     })
//   }
// }
//
// const renderFacts = function() {
//   let historyDiv = document.querySelector('#year-history')
//   let li = document.querySelector("li")
//
//   if (historyDiv.firstChild) {
//     historyDiv.removeChild(historyDiv.firstChild)
//   }
//   // create yearlist
//   let years = yearList()
//
//   getNumDat(years[Math.floor(Math.random() * years.length)])
//     .then( e=> {
//       li.innerText = e
//       historyDiv.append(li)
//     })
// }
//
// const render100 = function() {
//   let allDiv = document.querySelector('#all-the-numbers')
//   let li;
//   // while (allDiv.firstChild) {
//   //   allDiv.removeChild(allDiv.firstChild)
//   // }
//
//   let years = yearList()
//
//   yearsToFact = []
//
//   while (yearsToFact.length < 101) {
//     let y = years[Math.floor(Math.random() * years.length)]
//     if (yearsToFact.includes(y)) {
//       console.log('already in facts')
//     } else {
//       yearsToFact.push(y);
//       getNumDat(y)
//         .then( e=> {
//           li = document.createElement('li')
//           li.innerText = e
//           allDiv.append(li)
//         })
//     }
//   }
//
// }
//
// function yearList() {
//   let years = []
//   for (let i = 0; i < 2018; i++) {
//     years.push(i)
//   }
//   return years
// }
//
// document.addEventListener("DOMContentLoaded", () => {
//
//   const factsButton = document.querySelector('#number-one')
//   const inputNum = document.querySelector('#pick-a-number')
//   const allButton = document.querySelector('#all-numbers-button')
//
//   factsButton.addEventListener('click', oneFact)
//   inputNum.addEventListener('change', pickNum) //or input
//   allButton.addEventListener('click', render100)
//
//
//   setInterval(renderFacts, 5000)
//
// })

//////////////// Solution

function fetchTrivia(num) {
  return fetch(`http://numbersapi.com/${num}/trivia`).then(res => res.text())
}

function showOneTrivia() {
  const div = document.querySelector('#one-facts')
  div.innerHTML = ''
  fetchTrivia(1).then(trivia => {
    div.innerHTML = trivia
  })
}

function showTrivia(e) {
  e.preventDefault()
  console.log("here");
  const div = document.querySelector('#random-math-fact')
  div.innerHTML = ''
  const num = document.querySelector('#pick-a-number').value

  if (isNaN(num)) {
    div.innerHTML = 'please enter a valid number'
  } else {
    fetchTrivia(num).then(trivia => {
      div.innerHTML = trivia
    })
  }
}

function fetchYearFact(year) {
  return fetch(`http://numbersapi.com/${year}/year`).then(res => res.text())
}

function showYearFact(year) {
  const div = document.querySelector('#year-history')
  div.innerHTML = ''
  fetchYearFact(year).then(fact => {
    div.innerHTML = fact
  })
}

function setYearFactInterval() {
  let year = new Date().getFullYear()
  showYearFact(year)
  setInterval(() => {
    year--
    showYearFact(year)
  }, 5000)
}

function getAllTheNumbers() {
  return fetch('http://numbersapi.com/1..100').then(res => res.json())
}

function showAllTheNumbers() {
  const div = document.querySelector('#all-the-numbers')
  div.innerHTML = ''
  getAllTheNumbers().then(numbers => {
    let html = '<ul>'
    for (key in numbers) {
      html += `<li>${numbers[key]}</li>`
    }
    html += '</ul>'
    div.innerHTML = html
  })
}

document.addEventListener('DOMContentLoaded', function() {
  let oneButton = document.querySelector('#number-one')
  oneButton.addEventListener('click', showOneTrivia)
  let triviaInput = document.querySelector('#pick-a-number')
  triviaInput.addEventListener('change', showTrivia)
  setYearFactInterval()
  let allNumbersButton = document.querySelector('#all-numbers-button')
  allNumbersButton.addEventListener('click', showAllTheNumbers)
})
