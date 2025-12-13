console.log("AI Email Assistant");

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail-quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerHTML.trim();
        }
    }
    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDH', '[role="dialog"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atL L3 ai-reply-button';
    button.style.marginRight = '8px';
    button.innerHTML = 'Shizuka';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI reply');

    button.addEventListener('click', async () => {
        console.log('AI Reply button clicked');
        try {
            button.innerHTML = 'Generating...';
            button.style.pointerEvents = 'none';

            const emailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/api/email/reply', {
                method: 'POST',
                headers: {            // ← was `header`
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent,
                    tone: 'professional'
                })
            });

            if (!response.ok) {
                throw new Error('API request failed with status ' + response.status);
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]' // ← was role:"textbox"
            );

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply); // deprecated but works in Gmail [web:29][web:38]
            } else {
                console.warn('Compose box not found');
            }
        } catch (err) {
            console.error('Error generating AI reply', err);
        } finally {
            button.innerHTML = 'Shizuka';
            button.style.pointerEvents = 'auto';
        }
    });

    return button;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log('Toolbar not found');
        return;
    }

    console.log('Toolbar found');
    const button = createAIButton();
    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElement = addedNodes.some((node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches?.('.aDH, .btC, [role="dialog"]') ||
                node.querySelector?.('.aDH, .btC, [role="dialog"]'))
        );

        if (hasComposeElement) {
            console.log('Compose window detected.');
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
