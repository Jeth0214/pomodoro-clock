const buttons = document.querySelectorAll('button');
let breakLengthDisplay =  document.querySelector('#break-length');

buttons.forEach( button => {
    button.addEventListener('click', ()=>{
        const action = button.dataset.action; 
        if(action === "up"){
            let displpayedNum = button.previousElementSibling.textContent;

            button.previousElementSibling.textContent = parseFloat(displpayedNum) + 1;
        }
        if(action === "down"){
            let displpayedNum = button.nextElementSibling.textContent;

            button.nextElementSibling.textContent = parseFloat(displpayedNum) - 1;
        }
    })
})