document.getElementById('sendBtn').addEventListener('click', async () => {
    const emailsText = document.getElementById('emails').value;
    const emails = emailsText.split('\n').map(e => e.trim()).filter(e => e && e.includes('@'));
    const subject = document.getElementById('subject').value.trim();
    const body = document.getElementById('body').value.trim();
    const statusDiv = document.getElementById('status');
    const progressDiv = document.getElementById('progress');
    const btn = document.getElementById('sendBtn');

    if (!emails.length) {
        showStatus('Please enter at least one valid email address.', 'error');
        return;
    }
    if (!subject) {
        showStatus('Please enter an email subject.', 'error');
        return;
    }
    if (!body) {
        showStatus('Please enter an email body.', 'error');
        return;
    }

    btn.disabled = true;
    showStatus(`Opening progress tracker...`, 'info');

    const gmailTabs = await chrome.tabs.query({ url: "*://mail.google.com/*" });

    if (!gmailTabs.length) {
        showStatus('Gmail tab not found! Please open Gmail first.', 'error');
        btn.disabled = false;
        return;
    }

    const tab = gmailTabs[0];

    // Open progress window
    chrome.windows.create({
        url: 'progress.html',
        type: 'popup',
        width: 460,
        height: 360,
        left: Math.round((screen.width - 460) / 2),
        top: Math.round((screen.height - 360) / 2)
    });

    // Close this popup after a short delay
    setTimeout(() => {
        window.close();
    }, 500);

    // Execute the automation
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: startAutomation,
        args: [emails, subject, body]
    });
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = message;
    statusDiv.className = type;
}

function startAutomation(emails, subject, body) {
    window.postMessage({ type: "START_GMAIL_BOT", emails, subject, body }, "*");
}