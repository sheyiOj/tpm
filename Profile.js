document.querySelectorAll('.social-icon').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.color = '#f39c12';
    });
    item.addEventListener('mouseout', () => {
        item.style.color = '#3498db';
    });
});
