// Listen for messages from content script about progress
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PROGRESS_UPDATE') {
        updateProgress(request.current, request.total, request.email);
    } else if (request.type === 'EMAILS_SENT') {
        showCompletion();
    }
});

function updateProgress(current, total, email) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const currentEmail = document.getElementById('currentEmail');

    const percentage = (current / total) * 100;
    progressFill.style.width = percentage + '%';
    progressText.innerText = `${current} / ${total}`;
    currentEmail.innerText = email;
}

function showCompletion() {
    const loadingContent = document.getElementById('loadingContent');
    const completionMessage = document.getElementById('completionMessage');

    loadingContent.style.display = 'none';
    completionMessage.classList.add('show');

    // Auto close after 3 seconds
    setTimeout(() => {
        window.close();
    }, 3000);
}