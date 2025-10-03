

function generateDecoration() {
    const input = document.getElementById("userInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!input) {
        resultDiv.innerHTML = "يرجى إدخال نص ليتم زخرفته!";
        return;
    }

    const decorations = [
        `${input.split('').join('ـ')}`,
        `❣ـ${input}ـ❣`,
        `🌙ـ${input}ـ🌙`,
        `⭐${input.split('').join('⭐')}⭐`,
        `✨${input}✨`,
        `✧*${input}*✧`,
        `☾${input}☽`,
        `𓆩${input}𓆪`,
        `♛${input}♛`,
        `【${input}】`,
        `༺${input}༻`,
        `꧁${input}꧂`,
        `${input.split('').join(' ')}`,
        `${input.split('').reverse().join('')}`,
        `❀ ${input} ❀`,
        `꧁༒${input}༒꧂`,
        `${input.toUpperCase()}`,
        `${input.toLowerCase()}`,
        `💫${input}💫`,
        `♔${input}♔`,
        `🎀${input}🎀`,
        `✿${input}✿`,
        `☘${input}☘`,
        `🔱${input}🔱`,
        `♥${input.split('').join('♥')}♥`
    ];

    // Render each decoration with a number, the text, and action buttons
    resultDiv.innerHTML = decorations.map((dec, idx) => `
        <div class="dec-item" data-idx="${idx}">
            <div class="dec-num">${idx + 1}.</div>
            <div class="dec-text" tabindex="0">${escapeHtml(dec)}</div>
            <div class="dec-actions">
                <button class="dec-select" data-idx="${idx}" title="تحديد">تحديد</button>
                <button class="dec-copy" data-idx="${idx}" title="نسخ">نسخ</button>
            </div>
        </div>
    `).join('');
}

// Attach event listeners without inline HTML attributes
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('decorateBtn');
    const input = document.getElementById('userInput');

    if (btn) btn.addEventListener('click', generateDecoration);

    // Allow pressing Enter in the input to trigger decoration
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') generateDecoration();
        });
    }

    // Delegate clicks for select/copy buttons inside result container
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.addEventListener('click', async (e) => {
            const selectBtn = e.target.closest('.dec-select');
            const copyBtn = e.target.closest('.dec-copy');
            if (selectBtn) {
                const parent = selectBtn.closest('.dec-item');
                const textEl = parent.querySelector('.dec-text');
                selectElementText(textEl);
            } else if (copyBtn) {
                const parent = copyBtn.closest('.dec-item');
                const text = parent.querySelector('.dec-text').innerText;
                try {
                    await navigator.clipboard.writeText(text);
                    // small feedback
                    copyBtn.innerText = 'تم النسخ';
                    setTimeout(() => { copyBtn.innerText = 'نسخ'; }, 1200);
                } catch (err) {
                    // fallback: select then execCommand
                    selectElementText(parent.querySelector('.dec-text'));
                    document.execCommand('copy');
                    copyBtn.innerText = 'تم النسخ';
                    setTimeout(() => { copyBtn.innerText = 'نسخ'; }, 1200);
                }
            }
        });
    }
});

// Helper: select text inside an element
function selectElementText(el) {
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// Helper: escape HTML to avoid injection when inserting text nodes
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}