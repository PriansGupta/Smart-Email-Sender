window.addEventListener("message", async (event) => {
    if (event.data.type === "START_GMAIL_BOT") {
        const { emails, subject, body } = event.data;
        console.log(`Starting to send ${emails.length} emails...`);

        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            console.log(`Sending to ${email}...`);

            // Send progress update
            chrome.runtime.sendMessage({
                type: 'PROGRESS_UPDATE',
                current: i + 1,
                total: emails.length,
                email: email
            });

            await sendOneEmail(email, subject, body);
            // Wait 1.5 seconds between emails
            await delay(1000);
        }


        // Notify that all emails are sent
        chrome.runtime.sendMessage({ type: 'EMAILS_SENT' }, (response) => {
            if (chrome.runtime.lastError) {
                console.log('All emails sent notification sent');
            }
        });
    }
});

async function sendOneEmail(email, subject, body) {
    // 1. Click Compose
    const composeBtn = document.querySelector(".T-I.T-I-KE.L3");
    if (!composeBtn) {
        composeBtn = document.querySelector('div[aria-label="Compose"]');
    }
    composeBtn.click();

    // 2. Wait for Compose window to open
    await waitForElement('input[peoplekit-id]', 5000);
    await delay(500);

    // 3. Fill Recipient
    const toField = document.querySelector('input[peoplekit-id]') || document.querySelector('textarea[name="to"]');
    toField.value = email;
    toField.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(500);

    // 4. Fill Subject
    const subjectField = document.querySelector('input[name="subjectbox"]');
    subjectField.value = subject;
    subjectField.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(300);

    // 5. Fill Body
    const bodyField = document.querySelector('div[aria-label="Message Body"]');
    bodyField.innerText = body;
    bodyField.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(300);

    // 6. Click Send
    const sendBtn = document.querySelector(".T-I.J-J5-Ji.aoO.v7.T-I-atl.L3");
    sendBtn.click();

    await delay(2000);
}

function waitForElement(selector, timeout = 3000) {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                resolve();
            }
        }, 200);
        setTimeout(() => clearInterval(interval), timeout);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}