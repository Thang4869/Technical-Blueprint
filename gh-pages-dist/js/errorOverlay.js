export function initErrorOverlay() {
    function showError(msg, url, line, col, err) {
        const container = document.getElementById('bb-error-overlay');
        if (!container) return;
        container.style.display = 'block';
        container.innerHTML = `<h3 class="bb-error-title">JavaScript Error Detected</h3><pre class="bb-error-pre">${msg}\n${url || ''}:${line || ''}:${col || ''}\n${err && err.stack ? err.stack : ''}</pre>`;
    }
    window.addEventListener('error', function(e){ showError(e.message, e.filename, e.lineno, e.colno, e.error); });
    window.addEventListener('unhandledrejection', function(e){ showError(String(e.reason)); });
    const oldErr = console.error;
    console.error = function(){ oldErr.apply(this, arguments); try { showError(Array.from(arguments).join(' ')); } catch(e){} };
}