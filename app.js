import resumeData from './resume-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- UI Toggle Logic ---
    const terminalBtn = document.getElementById('terminal-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const terminalView = document.getElementById('terminal-view');
    const chatbotView = document.getElementById('chatbot-view');

    terminalBtn.addEventListener('click', () => {
        terminalBtn.classList.add('active');
        chatbotBtn.classList.remove('active');
        terminalView.classList.add('active');
        terminalView.classList.remove('hidden');
        chatbotView.classList.remove('active');
        chatbotView.classList.add('hidden');
        document.getElementById('terminal-input').focus();
    });

    chatbotBtn.addEventListener('click', () => {
        chatbotBtn.classList.add('active');
        terminalBtn.classList.remove('active');
        chatbotView.classList.add('active');
        chatbotView.classList.remove('hidden');
        terminalView.classList.remove('active');
        terminalView.classList.add('hidden');
        document.getElementById('chat-input').focus();
    });

    // --- Terminal Logic ---
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    const commands = {
        'help': () => `Available commands:
  <span class="terminal-command">whoami</span>    - Display summary
  <span class="terminal-command">experience</span> - List professional experience
  <span class="terminal-command">projects</span>   - Show key projects
  <span class="terminal-command">skills</span>     - List technical skills
  <span class="terminal-command">clear</span>      - Clear terminal output`,

        'whoami': () => `<span class="terminal-highlight">${resumeData.basics.name}</span>
${resumeData.basics.title} | ${resumeData.basics.location}

${resumeData.basics.summary}`,

        'experience': () => {
            return resumeData.experience.map(exp => `
<span class="terminal-highlight">${exp.company}</span> - ${exp.role} (${exp.duration})
${exp.highlights.map(h => `  * ${h}`).join('\n')}`
            ).join('\n');
        },

        'projects': () => {
            return resumeData.projects.map(proj => `
<span class="terminal-success">${proj.name}</span> (${proj.context})
  Description: ${proj.description}
  Tech: ${proj.tech.join(', ')}`
            ).join('\n');
        },

        'skills': () => `Technical Expertise:
[ ${resumeData.skills.join(' | ')} ]`,

        'clear': () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    };

    function printToTerminal(text, isCommand = false, rawCmd = "") {
        if (!text) return;
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (isCommand) {
            line.innerHTML = `<span class="prompt">guest@anand-portfolio:~$</span> `;
            const cmdSpan = document.createElement('span');
            cmdSpan.textContent = rawCmd; // Use textContent to prevent self-XSS
            line.appendChild(cmdSpan);
        } else {
            line.innerHTML = text;
        }
        terminalOutput.appendChild(line);
        document.querySelector('.terminal-window').scrollTop = document.querySelector('.terminal-window').scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = terminalInput.value.trim();
            const cmd = rawCmd.toLowerCase();
            terminalInput.value = '';

            if (rawCmd) {
                printToTerminal('', true, rawCmd);
                if (commands[cmd]) {
                    printToTerminal(commands[cmd]());
                } else {
                    // Safe injection of unknown command
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-line';
                    errorLine.textContent = `bash: ${rawCmd}: command not found. Type 'help' for available commands.`;
                    terminalOutput.appendChild(errorLine);
                    document.querySelector('.terminal-window').scrollTop = document.querySelector('.terminal-window').scrollHeight;
                }
            }
        }
    });

    // --- Chatbot Logic ---
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatSuggestions = document.getElementById('chat-suggestions');

    const suggestionTexts = [
        "Tell me about your Google experience",
        "What did you do at Splunk?",
        "Show me your projects",
        "What are your core skills?"
    ];

    function renderSuggestions() {
        chatSuggestions.innerHTML = '';
        suggestionTexts.forEach(text => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = text;
            chip.onclick = () => {
                handleUserMessage(text);
                chatSuggestions.style.display = 'none'; // Hide after first use
            };
            chatSuggestions.appendChild(chip);
        });
    }

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = isUser ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        if (isUser) {
            bubble.textContent = text;
        } else {
            bubble.innerHTML = text;
        }

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('google')) {
            const googleExp = resumeData.experience.find(e => e.company === 'Google');
            return `At ${googleExp.company}, I was a ${googleExp.role}. I led a team of 8 engineers and notably enhanced data pipeline performance, reducing runtime by 80%. I also built the Case Management System for enterprise legal matters. <br><br>Want to hear about my projects there?`;
        }

        if (q.includes('splunk') || q.includes('cisco')) {
            const splunkExp = resumeData.experience.find(e => e.company === 'CISCO (Splunk)');
            return `Currently at ${splunkExp.company} as a ${splunkExp.role}. I recently built an LLM-powered tool to aggregate and analyze test failures from CI/CD pipelines, integrating a chat-based MCP interface. I also work heavily with Splunk ITSI Alerts.`;
        }

        if (q.includes('project') || q.includes('built')) {
            return "Some of my key projects include:<br><ul>" +
                resumeData.projects.map(p => `<li><b>${p.name} (${p.context}):</b> ${p.description}</li>`).join('') +
                "</ul>";
        }

        if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
            return `My core expertise lies in backend infrastructure and distributed systems. My tech stack includes: <b>${resumeData.skills.join(', ')}</b>.`;
        }

        if (q.includes('hi') || q.includes('hello')) {
            return "Hello! How can I help you explore Anand's background?";
        }

        return "I'm a simple portfolio assistant! Try asking about Anand's experience at <b>Google</b> or <b>Splunk</b>, his <b>projects</b>, or his <b>skills</b>.";
    }

    function handleUserMessage(msgText) {
        if (!msgText) return;
        appendMessage(msgText, true);
        chatInput.value = '';

        // Simulate thinking delay
        setTimeout(() => {
            const response = generateBotResponse(msgText);
            appendMessage(response, false);
        }, 600);
    }

    chatSendBtn.addEventListener('click', () => handleUserMessage(chatInput.value.trim()));
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleUserMessage(chatInput.value.trim());
    });

    renderSuggestions();

    // Initial Terminal Boot Sequence
    const bootMessage = `Initializing AnandOS v9.0...
Loading distributed systems expertise... <span class="terminal-success">[OK]</span>
Mounting data pipelines... <span class="terminal-success">[OK]</span>
Connecting LLM interfaces... <span class="terminal-success">[OK]</span>

Welcome to Anand Suthar's interactive portfolio.
Type <span class="terminal-command">'help'</span> to see available commands.
`;
    printToTerminal(bootMessage);
});
