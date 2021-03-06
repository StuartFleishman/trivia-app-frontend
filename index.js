

const ul = document.getElementById('users')
const userForm = document.getElementById('user-form')
const dropdown = document.getElementById('user-dropdown')
const userInput = document.getElementById("user-name")


const que = document.getElementById('question-title')

const category = document.getElementById('category-title')

const ulComments = document.getElementById('comments')
const commentsForm = document.getElementById('comment-form')


let scoreCount = document.getElementById("score-count")
let scoreDiv = document.getElementById('score-div')

const save = document.getElementById('save') 

const pickNumber = document.getElementById('Pick a Number')

const reset = document.getElementById('reset')


const start_div = document.getElementById('start')


const numForm = document.getElementById('number')

let answerForm = document.getElementById('answer-form')

userForm.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(e) {
  e.preventDefault()
  if(User.all.find(u => u.name === e.target.user.value)) {
    window.alert("Name already exists, select from dropdown")
    removeHidden()
  }
  else if(e.target.user.value === "") {
    window.alert("name can't be blank")
  }
  else {
    UserApi.createUser(e)
  }
}

function removeHidden() {
  const commentForm = document.getElementById('comment-form')
  commentForm.classList.remove('hidden')
  commentForm.classList.add('visible')
  userForm.innerText = "thanks for playing"
}

commentsForm.addEventListener('submit', handleCommentSubmit)

function handleCommentSubmit(e) {
  e.preventDefault()
  ulComments.classList.remove('hidden')
  ulComments.classList.add('visible')
  CommentApi.createComment(e)

  }

save.addEventListener('click', handleSave)

function handleSave() {
  save.innerText = ""
 
  numForm.remove()
  que.remove()
  reset.remove()
  answerForm.remove()

  const catTitle = document.getElementById('category-title')
  catTitle.remove()
  const userDiv = document.getElementById('make-user')
  userDiv.classList.remove('hidden')
  userDiv.classList.add('visible')
}


reset.addEventListener('click', handleReset)

function handleReset() {
 
  reset.innerText = ""
  
  que.firstElementChild.remove()
  que.innerText = ""

  const rightAnswer = document.getElementById('right-answer')
  rightAnswer.id = ""
  rightAnswer.innerText = ""
  
}


start_div.addEventListener('click', () => {

  save.classList.remove('hidden')
  save.classList.add('visible')

  scoreDiv.classList.remove('hidden')
  scoreDiv.classList.add('item5')
  scoreDiv.classList.add('visible')

  
  numForm.classList.add('visible')
  numForm.classList.add('center')
  numForm.classList.add('item3')
 
  start_div.classList.add('hidden')

})


numForm.addEventListener('submit', e => {
  e.preventDefault()

  const catNum = (parseInt(e.target.children[1].value))
  
  TriviaApi.getCategories(catNum)

  que.classList.add('visible')
  answerForm.classList.remove('hidden')
  answerForm.classList.add('visible')
  answerForm.classList.add('item2')
  
  const cat = document.getElementById('category-title')
  cat.innerText = "TRIVIA!"
  const reset = document.getElementById('reset')
  reset.classList.add('visible')
  reset.innerText = "Reset"
  cat.classList.add('visible')
 
  numForm.classList.remove('visible')
  numForm.classList.add('hidden')
  numForm.reset()
})


answerForm.addEventListener('submit', e => {
  e.preventDefault()
  
  const rightAnswer = document.getElementById('right-answer')
  const rightAnswerCaps = rightAnswer.innerHTML.toUpperCase()
  const userValue = e.target.children[0].value
  const userValueUp = userValue.toUpperCase()
 
  if (rightAnswerCaps === userValueUp.trim()) {
    addScore()
    const dGrid = document.getElementById("div-grid")
    const div= document.createElement('div')
    div.classList.add('item3')
    div.innerText = "right answer! 1 point!"
    // window.alert("right answer 1 point!")
  
    setTimeout( () =>  div.remove() , 2000)
  
    dGrid.appendChild(div)
    answerForm.reset()
  }
  else {
    const right = document.getElementById('right-answer') 
    const answer = document.getElementById('answer')
    answer.classList.add('visible')
    right.classList.add('visible')
    right.parentElement.firstElementChild.remove()
    answerForm.reset()
  }
 
})

function addFreePoint() {
  const dGrid = document.getElementById("div-grid")
  const div= document.createElement('div')
  div.classList.add('item2')
  div.innerText = "1 Free Point!"
  div.id = "unlucky"

  setTimeout( () =>  div.remove() , 2000)

  dGrid.appendChild(div)


  addScore()
}

dropdown.addEventListener('change', e => {
  
  const liArray = document.querySelectorAll('li')
  liArray.forEach(li => {
    if(li.id !== dropdown.value) {
      li.style.display = 'none'
    }
    else if(li.id === dropdown.value){
      li.style.display = ""
    }
  })
})


function addScore() {
  let newestScore = scoreCount.innerText
  let currentScore = parseInt(newestScore)
  let finalScore = currentScore += 1
  return scoreCount.innerText = finalScore
}


UserApi.getUsers()
CommentApi.getComments()

