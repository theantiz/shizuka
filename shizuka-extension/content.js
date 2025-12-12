console.log("AI Email Assistant");

function findComposeToolbar() {
    const selectors = ['.btC', '.aDH', '[role="dialog"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atL L3 ai-reply-button';
    button.style.marginRight = '8px';
    button.innerHTML = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'generate AI reply');

    button.addEventListener('click', () => {
        console.log("AI Reply button clicked");
        // your action here
    });

    return button;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found");
    const button = createAIButton();
    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);

        const hasComposeElement = addedNodes.some((node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDH, .btC, [role="dialog"]') ||
                node.querySelector?.('.aDH, .btC, [role="dialog"]'))
        );

        if (hasComposeElement) {
            console.log("Compose window detected.");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
