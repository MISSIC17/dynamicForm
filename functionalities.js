let passwordVisibility = document.querySelector('span.password-visibility i');
passwordVisibility.parentNode.addEventListener('click', () => {
    if (passwordVisibility.classList.contains('fa-eye-slash')) {
        passwordVisibility.classList.remove('fa-eye-slash');
        passwordVisibility.classList.add('fa-eye');
        document.querySelector(`input[name="password"]`).setAttribute('type', 'text');        
    } else {
        passwordVisibility.classList.remove('fa-eye');
        passwordVisibility.classList.add('fa-eye-slash');
        document.querySelector(`input[name="password"]`).setAttribute('type', 'password');        
    }
})