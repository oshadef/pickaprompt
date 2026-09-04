const promptContainer = document.querySelector('#prompt');
const promptButton = document.querySelector('#prompt-button');

let prompts = [];
let selectedIndex = -1;

function showMessage(title, description = '') {
  const heading = document.createElement('h1');
  heading.textContent = title;

  promptContainer.replaceChildren(heading);

  if (description) {
    const detail = document.createElement('p');
    detail.textContent = description;
    promptContainer.append(detail);
  }
}

function choosePrompt() {
  if (prompts.length === 0) return;

  if (prompts.length === 1) {
    selectedIndex = 0;
    showMessage(prompts[0].title, prompts[0].description);
    return;
  }

  let nextIndex = selectedIndex;
  while (nextIndex === selectedIndex) {
    nextIndex = Math.floor(Math.random() * prompts.length);
  }

  selectedIndex = nextIndex;
  const prompt = prompts[selectedIndex];
  showMessage(prompt.title, prompt.description);
}

async function loadPrompts() {
  try {
    const response = await fetch('./prompts.json');
    if (!response.ok) throw new Error('Prompt list could not be loaded.');

    const data = await response.json();
    prompts = data.filter(
      (prompt) => typeof prompt.title === 'string' && prompt.title.trim().length > 0,
    );

    if (prompts.length === 0) throw new Error('No prompts were found.');
    promptButton.disabled = false;
  } catch (error) {
    showMessage(error instanceof Error ? error.message : 'Prompt list could not be loaded.');
  }
}

promptButton.addEventListener('click', choosePrompt);
loadPrompts();
