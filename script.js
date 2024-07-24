document.getElementById('languageToggle').addEventListener('change', function() {
    var englishResume = document.getElementById('english-resume');
    var chineseResume = document.getElementById('chinese-resume');
    var downloadEnglishPDF = document.getElementById('downloadEnglishPDF');
    var downloadChinesePDF = document.getElementById('downloadChinesePDF');

    if (this.checked) {
        englishResume.style.display = 'none';
        chineseResume.style.display = 'block';
        downloadEnglishPDF.style.display = 'none';
        downloadChinesePDF.style.display = 'inline-block';
    } else {
        englishResume.style.display = 'block';
        chineseResume.style.display = 'none';
        downloadEnglishPDF.style.display = 'inline-block';
        downloadChinesePDF.style.display = 'none';
    }
});

function downloadPDF(elementId, filename) {
    var element = document.getElementById(elementId);

    html2pdf(element, {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

document.getElementById('downloadEnglishPDF').addEventListener('click', function() {
    downloadPDF('english-resume', 'Augustus Chen Resume (English).pdf');
});

document.getElementById('downloadChinesePDF').addEventListener('click', function() {
    downloadPDF('chinese-resume', 'Augustus Chen Resume (Chinese).pdf');
});