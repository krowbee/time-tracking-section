let state = {
    period:"weekly",
    data:[]
}

const setState = (newState)=>{
    Object.assign(state, newState)
    renderCards(state.period)
}

const defaultPeriod = "weekly"
const buttons = document.querySelectorAll(".cards__time-button")


const renderCards = (period) =>{

    const prevPeriodMessages = {
        "daily": "Last day - ",
        "weekly": "Last week - ",
        "monthly": "Last month - "
    }

    const cards = document.querySelectorAll(".cards__card[data-type='activity']")
    cards.forEach((card, index) => {
        const mainHours = card.querySelector(".cards__hours-main")
        const prevHours = card.querySelector(".cards__hours-previous")
        mainHours.textContent = state.data[index].timeframes[period].current + "hrs"
        prevHours.textContent = prevPeriodMessages[period] + state.data[index].timeframes[period].previous + "hrs"
    })
}

const timeSwitch = (button) =>{
    let activeButton = document.querySelector(".cards__time-button[active]")
    const period = button.dataset.period
    setState({ period })
    try{
        activeButton.toggleAttribute("active")
        button.toggleAttribute("active")
    }catch(error){
        console.log(error)
    }
}

const fetchData =  async () =>{
    try{
        const response = await fetch("./data.json");
        if (!response.ok){ throw new Error('Response status: ${response.status}') }
        
        data = await response.json()
        setState({ data })

    } catch (error){
        console.log(error.message)
    }
}

document.addEventListener("DOMContentLoaded", fetchData)

buttons.forEach((button)=>{
    button.addEventListener("click", () => timeSwitch(button))
})