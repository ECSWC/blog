(function () {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '5px';
    progressBar.style.backgroundColor = '#3498db';
    progressBar.style.width = '0';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.25s ease-out';

    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollPosition = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercentage = (scrollPosition / windowHeight) * 100;

        progressBar.style.width = `${progressPercentage}%`;
    }

    window.addEventListener('scroll', updateProgress);
})();
