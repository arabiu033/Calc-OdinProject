const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        console.log(e);
    })
})