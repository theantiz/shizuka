console.log("AI Email Assistant loaded");

let selectedTone = "professional";

function getEmailContent() {
    const selectors = [
        ".h7",
        ".a3s.aiL",
        ".gmail-quote",
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return "";
}

function findComposeToolbar() {
    const selectors = [".btC", ".aDH", ".gU.Up"];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

function createToneDropdown() {
    const select = document.createElement("select");

    select.className = "ai-tone-select";
    select.style.marginRight = "8px";
    select.style.height = "30px";
    select.style.borderRadius = "4px";
    select.style.border = "1px solid #ccc";
    select.style.fontSize = "12px";

    const tones = [
        { value: "none", label: "None" },
        { value: "professional", label: "Professional" },
        { value: "casual", label: "Casual" },
        { value: "friendly", label: "Friendly" },
        { value: "formal", label: "Formal" },
        { value: "concise", label: "Concise" },
        { value: "detailed", label: "Detailed" }
    ];


    tones.forEach(tone => {
        const option = document.createElement("option");
        option.value = tone.value;
        option.textContent = tone.label;
        select.appendChild(option);
    });

    select.value = selectedTone;

    select.addEventListener("change", e => {
        selectedTone = e.target.value;
        console.log("Tone selected:", selectedTone);
    });

    return select;
}

function createAIButton() {
    const button = document.createElement("div");

    button.className = "T-I J-J5-Ji aoO v7 T-I-atL L3 ai-reply-button";
    button.style.marginRight = "8px";
    button.innerText = "Generate";

    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip", "Shizuka - AI Email Assistant ");

    button.addEventListener("click", async () => {
        try {
            button.innerText = "Generating...";
            button.style.pointerEvents = "none";

            const emailContent = getEmailContent();

            const response = await fetch(
                "https://shizuka-mv0v.onrender.com/api/email/reply",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        emailContent,
                        tone: selectedTone
                    })
                }
            );

            if (!response.ok) {
                throw new Error("API failed: " + response.status);
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );

            if (composeBox) {
                composeBox.focus();
                document.execCommand("insertText", false, generatedReply);
            }
        } catch (err) {
            console.error("Error generating AI reply", err);
        } finally {
            button.innerText = "Generate";
            button.style.pointerEvents = "auto";
        }
    });

    return button;
}

function injectButton() {
    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    if (toolbar.querySelector(".ai-reply-button")) return;

    const toneDropdown = createToneDropdown();
    const aiButton = createAIButton();

    toolbar.insertBefore(aiButton, toolbar.firstChild);
    toolbar.insertBefore(toneDropdown, aiButton);
}

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (
                node.nodeType === Node.ELEMENT_NODE &&
                (node.matches?.(".aDH, .btC, [role='dialog']") ||
                    node.querySelector?.(".aDH, .btC, [role='dialog']"))
            ) {
                setTimeout(injectButton, 500);
            }
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
