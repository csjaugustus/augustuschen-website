// for resume.html
document.addEventListener("DOMContentLoaded", function() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
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
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            });
        }

        document.getElementById('downloadEnglishPDF').addEventListener('click', function() {
            downloadPDF('english-resume', 'Augustus Chen Resume (English).pdf');
        });

        document.getElementById('downloadChinesePDF').addEventListener('click', function() {
            downloadPDF('chinese-resume', 'Augustus Chen Resume (Chinese).pdf');
        });
    }
});

// for portfolio page
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".project-banner a");
    const containers = document.querySelectorAll(".content-container");

    function showContainer(target) {
        containers.forEach(container => {
            if (container.id === target) {
                container.classList.add("active");
            } else {
                container.classList.remove("active");
            }
        });

        links.forEach(link => {
            if (link.getAttribute("data-target") === target) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = link.getAttribute("data-target");
            showContainer(target);
        });
    });

    // Show the "all" section by default
    showContainer("all");
});