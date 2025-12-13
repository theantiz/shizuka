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

function createToneDropdown() {
    const dropdown = document.createElement('select');
    dropdown.className = 'ai-tone-select';
    dropdown.style.marginRight = '8px';
    dropdown.style.padding = '4px 8px';
    dropdown.style.border = '1px solid #dadce0';
    dropdown.style.borderRadius = '4px';
    dropdown.style.fontSize = '13px';
    dropdown.style.backgroundColor = 'white';

    const tones = [
        { value: 'professional', label: 'Professional' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'concise', label: 'Concise' },
        { value: 'detailed', label: 'Detailed' }
    ];

    tones.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone.value;
        option.textContent = tone.label;
        if (tone.value === 'professional') option.selected = true;
        dropdown.appendChild(option);
    });

    return dropdown;
}

function createAIButton() {
    // Container for dropdown + button
    const container = document.createElement('div');
    container.className = 'ai-reply-container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '4px';
    container.style.marginRight = '16px';  // ← Added space after container

    const dropdown = createToneDropdown();
    const button = document.createElement('div');

    button.className = 'T-I J-J5-Ji aoO v7 T-I-atL L3 ai-reply-button';
    button.style.margin = '0';
    button.innerHTML = 'Generate';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Shizuka - AI Email Assistant');

    // Store dropdown reference on button for access in click handler
    button._toneDropdown = dropdown;

    button.addEventListener('click', async () => {
        console.log('AI Reply button clicked');
        try {
            button.innerHTML = 'Generating...';
            button.style.pointerEvents = 'none';
            dropdown.style.pointerEvents = 'none';

            const emailContent = getEmailContent();
            const selectedTone = dropdown.value;

            const response = await fetch('http://localhost:8080/api/email/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent,
                    tone: selectedTone
                })
            });

            if (!response.ok) {
                throw new Error('API request failed with status ' + response.status);
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.warn('Compose box not found');
            }
        } catch (err) {
            console.error('Error generating AI reply', err);
        } finally {
            button.innerHTML = 'Generate';
            button.style.pointerEvents = 'auto';
            dropdown.style.pointerEvents = 'auto';
        }
    });

    container.appendChild(dropdown);
    container.appendChild(button);
    return container;
}

function injectButton() {
    const existingContainer = document.querySelector('.ai-reply-container');
    if (existingContainer) existingContainer.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log('Toolbar not found');
        return;
    }

    console.log('Toolbar found');
    const aiContainer = createAIButton();
    toolbar.insertBefore(aiContainer, toolbar.firstChild);
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
