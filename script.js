document.getElementById('languageToggle').addEventListener('change', function() {
    var englishResume = document.getElementById('english-resume');
    var chineseResume = document.getElementById('chinese-resume');

    if (this.checked) {
        englishResume.style.display = 'none';
        chineseResume.style.display = 'block';
    } else {
        englishResume.style.display = 'block';
        chineseResume.style.display = 'none';
    }
});