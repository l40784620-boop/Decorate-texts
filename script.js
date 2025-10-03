
function generateDecoration() {
    let input = document.getElementById("userInput").value.trim();
    let resultDiv = document.getElementById("result");
    if (input === "") {
        resultDiv.innerHTML = "يرجى إدخال نص ليتم زخرفته!";
        return;
    }
    let decorations = [
        input.split('').join('ـ'),
        "❣ـ" + input + "ـ❣",
        "🌙ـ" + input + "ـ🌙",
        "⭐" + input.split('').join('⭐') + "⭐",
        "✨" + input + "✨",
        "✧*" + input + "*✧",
        "☾" + input + "☽",
        "𓆩" + input + "𓆪",
        "♛" + input + "♛",
        "【" + input + "】",
        "༺" + input + "༻",
        "꧁" + input + "꧂",
        input.split('').join(' '),
        input.split('').reverse().join(''),
        "❀ " + input + " ❀",
        "꧁༒" + input + "༒꧂",
        input.toUpperCase(),
        input.toLowerCase(),
        "💫" + input + "💫",
        "♔" + input + "♔",
        "🎀" + input + "🎀",
        "✿" + input + "✿",
        "☘" + input + "☘",
        "🔱" + input + "🔱",
        "♥" + input.split('').join('♥') + "♥"
    ];
    let html = "";
    for (let i = 0; i < decorations.length; i++) {
        html += `
            <div class="dec-item" data-idx="${i}">
                <div class="dec-num">${i + 1}.</div>
                <div class="dec-text" tabindex="0">${escapeHtml(decorations[i])}</div>
                <div class="dec-actions">
                    <button class="dec-select" data-idx="${i}" title="تحديد">تحديد</button>
                    <button class="dec-copy" data-idx="${i}" title="نسخ">نسخ</button>
                </div>
            </div>
        `;
    }
    resultDiv.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('decorateBtn');
    let input = document.getElementById('userInput');

    if (btn) {
        btn.addEventListener('click', generateDecoration);
    }
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                generateDecoration();
            }
        });
    }
    
    let resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.addEventListener('click', function(e) {
            let selectBtn = e.target.closest('.dec-select');
            let copyBtn = e.target.closest('.dec-copy');
            if (selectBtn) {
                let parent = selectBtn.closest('.dec-item');
                let textEl = parent.querySelector('.dec-text');
                selectElementText(textEl);
            } else if (copyBtn) {
                let parent = copyBtn.closest('.dec-item');
                let text = parent.querySelector('.dec-text').innerText;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(function() {
                        copyBtn.innerText = 'تم النسخ';
                        setTimeout(function() {
                            copyBtn.innerText = 'نسخ';
                        }, 1200);
                    }).catch(function() {
                        selectElementText(parent.querySelector('.dec-text'));
                        document.execCommand('copy');
                        copyBtn.innerText = 'تم النسخ';
                        setTimeout(function() {
                            copyBtn.innerText = 'نسخ';
                        }, 1200);
                    });
                } else {
                    selectElementText(parent.querySelector('.dec-text'));
                    document.execCommand('copy');
                    copyBtn.innerText = 'تم النسخ';
                    setTimeout(function() {
                        copyBtn.innerText = 'نسخ';
                    }, 1200);
                }
            }
        });
    }
});
function selectElementText(el) {
    if (!el) return;
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
