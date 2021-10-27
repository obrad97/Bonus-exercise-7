const selections = document.querySelectorAll('.selection-item');
const selector = document.querySelector('.selector');

selections.forEach((selection, index) =>{
    selection.addEventListener('click', (e)=> {
        const activeSelection = document.querySelector('.selection-item.selection-active')
        if (activeSelection && activeSelection != selection) {
            activeSelection.classList.remove('selection-active')
        }
        selection.classList.add('selection-active');
        selector.style.transform = `translateX(${-145+(index*95)}%)`
    })
})