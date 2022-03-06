let store = Immutable.Map({
    questions: Immutable.List([]),
    activePage: 'home',
    getQuestion: false
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
    const { activePage } = state.toJS()
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
    return `
    <div class="card">
        <div class="card-body" id="randomQuestion">
            <br>
        </div>
        <button type="button" onclick="updateStore(store, { getQuestion: true })" class="btn btn-primary">Generați o întrebare</button>
    </div>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})