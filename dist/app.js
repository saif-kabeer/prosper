const buttons=[...document.querySelectorAll('[data-filter]')];
const courses=[...document.querySelectorAll('[data-board]')];
function filterClasses(board){buttons.forEach(button=>{const active=button.dataset.filter===board;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});courses.forEach(course=>{course.hidden=board!=='all'&&course.dataset.board!==board;});}
buttons.forEach(button=>button.addEventListener('click',()=>filterClasses(button.dataset.filter)));
document.querySelectorAll('[data-select]').forEach(link=>link.addEventListener('click',()=>filterClasses(link.dataset.select)));
