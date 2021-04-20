class Comment {

  static all = []

  constructor({text, user_id}) {
    this.text = text 
    this.userId = user_id 
    this.element = document.createElement('li')
    Comment.all.push(this)
  }

  render() {
    this.element.innerHTML = `
      <div> 
      <strong class="name">${this.text}</strong>
      </div> 
    `

    return this.element
  }

  addToDom() {
    ulComments.appendChild(this.render())
  }


}