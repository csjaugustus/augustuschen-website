// for resume.html
document.addEventListener("DOMContentLoaded", function() {
    const cvSelector = document.getElementById('cv-selector');
    const languageToggle = document.getElementById('languageToggle');
    if (cvSelector && languageToggle) {
        const cvSections = {
            'full-en': document.getElementById('full-en-resume'),
            'full-zh': document.getElementById('full-zh-resume'), // Fixed from 'full-cn'
            'ee-en': document.getElementById('ee-en-resume')
        };
        const downloadEnglishPDF = document.getElementById('downloadEnglishPDF');
        const downloadChinesePDF = document.getElementById('downloadChinesePDF');
        const fallbackMessage = document.createElement('div');
        fallbackMessage.id = 'fallback-message';
        fallbackMessage.style.display = 'none';
        fallbackMessage.style.color = '#F0F0F0';
        fallbackMessage.style.textAlign = 'center';
        fallbackMessage.style.padding = '20px';
        fallbackMessage.textContent = 'This CV variant is not available in the selected language.';
        document.querySelector('.resume-container').appendChild(fallbackMessage);

        function hideAllCVs() {
            for (let key in cvSections) {
                if (cvSections[key]) {
                    cvSections[key].style.display = 'none';
                }
            }
            fallbackMessage.style.display = 'none';
        }

        function showCV(variant, language) {
            hideAllCVs();
            const cvKey = `${variant}-${language}`;
            if (cvSections[cvKey]) {
                cvSections[cvKey].style.display = 'block';
                if (language === 'en') {
                    downloadEnglishPDF.style.display = 'inline-block';
                    downloadChinesePDF.style.display = 'none';
                } else {
                    downloadEnglishPDF.style.display = 'none';
                    downloadChinesePDF.style.display = 'inline-block';
                }
            } else {
                // Show fallback message and English version if available
                if (cvSections[`${variant}-en`]) {
                    cvSections[`${variant}-en`].style.display = 'block';
                    fallbackMessage.style.display = 'block';
                    downloadEnglishPDF.style.display = 'inline-block';
                    downloadChinesePDF.style.display = 'none';
                } else {
                    fallbackMessage.style.display = 'block';
                    downloadEnglishPDF.style.display = 'none';
                    downloadChinesePDF.style.display = 'none';
                }
            }
        }

        // Initial state: Show Full CV in English
        showCV('full', 'en');
        cvSelector.value = 'full';
        languageToggle.checked = false;
        languageToggle.disabled = false;

        // Dropdown change: Switch CV variant and reset to English
        cvSelector.addEventListener('change', function() {
            const variant = this.value;
            showCV(variant, 'en');
            languageToggle.checked = false;
            languageToggle.disabled = (variant !== 'full');
        });

        // Language toggle: Switch language for the selected variant
        languageToggle.addEventListener('change', function() {
            const variant = cvSelector.value;
            const language = this.checked ? 'zh' : 'en'; // Fixed from 'cn' to 'zh'
            showCV(variant, language);
        });

        // PDF download function
        function downloadPDF() {
            const visibleCV = document.querySelector('.resume-content[style*="block"]');
            if (visibleCV) {
                const id = visibleCV.id;
                let variant = id.includes('full') ? 'Full' : (id.includes('ee') ? 'EE' : '');
                let language = id.includes('-en') || id === 'ee-resume' ? 'English' : 'Chinese';
                const filename = `Augustus_Chen_Resume_${variant}_${language}.pdf`;
                html2pdf(visibleCV, {
                    margin: 0,
                    filename: filename,
                    image: { type: 'jpeg', quality: 1.0 },
                    html2canvas: { scale: 4 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                });
            }
        }

        downloadEnglishPDF.addEventListener('click', downloadPDF);
        downloadChinesePDF.addEventListener('click', downloadPDF);
    }
});

// for portfolio page (unchanged)
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".project-banner a");
    const articles = document.querySelectorAll(".project-entry-container");

    function showProjects(target) {
        articles.forEach(article => {
            if (target === "all" || article.dataset.tag === target) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });

        links.forEach(link => {
            if (link.dataset.target === target) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = link.dataset.target;
            showProjects(target);
        });
    });

    // Show the "all" section by default
    showProjects("all");
});