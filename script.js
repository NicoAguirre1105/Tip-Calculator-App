
function main() {

    function showTotal() {
        if (tipValue > 0 && billValue > 0 && peopleValue > 0) {
            
            const totalTipAmount = (billValue * tipValue / 100),
                tipPerPerson = (totalTipAmount / peopleValue).toFixed(2),
                billPerPerson = ((billValue + totalTipAmount) / peopleValue).toFixed(2)

            resetButton.style.opacity = 1
            resetButton.style.cursor = 'pointer'
            amouts[0].innerHTML = '$' + tipPerPerson.toString()
            amouts[1].innerHTML = '$' + billPerPerson.toString()
            return
        }
        resetButton.style.opacity = 0.2
        resetButton.style.cursor = 'default'
        amouts[0].innerHTML = '$0.00'
        amouts[1].innerHTML = '$0.00'
    }

    function tipEvent() {

        tipContainer.addEventListener('click', (e) => {
            const clicked = e.target.closest('button'),
                prevButton = document.getElementsByClassName('tip-selected')[0]

            if (!clicked) return
            if (clicked.className == 'tip-selected') return
            if (prevButton) {
                prevButton.classList = ''
            }

            inputs[1].value = ''
            clicked.classList = 'tip-selected'
            errorMessage[1].style.visibility = 'hidden'
            inputs[1].style.outline = 'none'
            tipValue = Number(clicked.getAttribute('id'))
            showTotal()
        })
        
    }

    function inputEvents() {
        function inputError(input) {
            const id = input.getAttribute('id')

            if (input.value == 0) {

                if (id == 'bill') {
                    errorMessage[0].style.visibility = 'visible'
                    input.style.outline = 'rgb(228, 5, 5) solid 1px'
                    return true
                }

                if (id == 'customValue') {
                    errorMessage[1].style.visibility = 'visible'
                    input.style.outline = 'rgb(228, 5, 5) solid 1px'
                    return true
                }
                errorMessage[2].style.visibility = 'visible'
                input.style.outline = 'rgb(228, 5, 5) solid 1px'
                return true
            }
            
            if (id == 'bill') {
                errorMessage[0].style.visibility = 'hidden'
                input.style.outline = 'none'
                return false
            }

            if (id == 'customValue') {
                errorMessage[1].style.visibility = 'hidden'
                input.style.outline = 'none'
                return false
            }

            errorMessage[2].style.visibility = 'hidden'
            input.style.outline = 'none'
            return false
        }

        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index]

            input.addEventListener('change', (e) => {
                const inputId = e.srcElement.getAttribute('id')
    
                if (inputId == 'bill') {
                    if (!inputError(e.srcElement)) {
                        billValue = Number(e.srcElement.value)
                        showTotal()
                        return
                    }
                    billValue = 0
                    showTotal()
                    return
                }
    
                if (inputId == 'customValue') {
                    const prevButton = document.getElementsByClassName('tip-selected')[0]
    
                    if (prevButton) {
                        prevButton.classList = ''
                    }

                    if (!inputError(e.srcElement)) {
                        tipValue = Number(e.srcElement.value)
                        showTotal()
                        return
                    }
                    tipValue = 0
                    showTotal()
                    return
                }
    
                if (!inputError(e.srcElement)) {
                    peopleValue = Number(e.srcElement.value)
                    showTotal()
                    return
                }
                peopleValue = 0
                showTotal()
            })
        }
    }

    function resetEvent() {
        resetButton.addEventListener('click', () => {
            const prevButton = document.getElementsByClassName('tip-selected')[0]
            if (tipValue > 0 && billValue > 0 && peopleValue > 0) {
                tipValue = 0
                billValue = 0
                peopleValue = 0
                if (prevButton) {
                    prevButton.classList = ''
                }

                for (let index = 0; index < inputs.length; index++) {
                    const input = inputs[index]
                    input.value = ''
                }
            }
        })
    }

    const tipContainer = document.getElementById('button-container'),
        inputs = document.getElementsByTagName('input'),
        amouts = document.getElementsByClassName('amount'),
        errorMessage = document.getElementsByClassName('error-message'),
        resetButton = document.getElementById('reset')


    let tipValue = 0, 
        billValue = 0, 
        peopleValue = 0

    tipEvent()
    inputEvents()
    resetEvent()
}

main()