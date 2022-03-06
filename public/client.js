let store = Immutable.Map({
    question: '',
    activePage: 'home',
    reqQuestion: false
})

const root = document.getElementById('root')

const updateStore = (oldState, newState) => {
    store = oldState.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    const { activePage, reqQuestion } = state.toJS()
    if (reqQuestion === true) {
        getQuestion(state)
    }
    return `<div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">Întrebari</h1>
    ${(() => {
        switch (activePage) {
        case 'home':
            return `${homePage(state)}`
        case 'randomQuestion':
            return `${randomQuestions(state)}`
        default:
            return ``
        }
    })()}
    </div>`

}

/*

TEMPLATES

*/
const homePage = (state) => { return `
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">O aplicație pentru a ne cunoaște prin întrebări aleatorii.</p>
      <p class="lead mb-4"><b>Este o lucare în curs.</b></p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" onclick="updateStore(store, { activePage: 'randomQuestion' })" class="btn btn-primary btn-lg px-4 gap-3">Începe</button>
      </div>
    </div>
`}

const randomQuestions = (state) => {
    const { question } = state.toJS()
    return `
    <div class="card">
        <div class="card-body" id="randomQuestion">
            <p>${question}</p>
        </div>
        <button type="button" onclick="updateStore(store, { reqQuestion: true })" class="btn btn-primary">Generați o întrebare</button>
    </div>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

/*

  API CALLS

*/

const getQuestion = (state) => {
    fetch(`${window.location.origin}/question`)
        .then(res => res.json())
        .then(question => updateStore(state, { question: question.intrebare, reqQuestion: false }))
}