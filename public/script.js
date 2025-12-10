async function callApi(method, url) {
    const responseOutput = document.getElementById('responseOutput');
    const cityInput = document.getElementById('cityInput').value.trim();
    const jsonInput = document.getElementById('jsonInput').value.trim();

    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (method === 'POST' || method === 'PUT') {
        try {
            options.body = jsonInput ? jsonInput : '{}';
        } catch (e) {
            responseOutput.textContent = 'Error: Invalid JSON in the input field.';
            return;
        }
    }

    responseOutput.textContent = `Sending ${method} request to ${url}...`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        responseOutput.innerHTML = `<span class="status ${response.ok ? 'success' : 'error'}">${response.status} ${response.statusText}</span>\n\n` +
            JSON.stringify(data, null, 2);
    } catch (error) {
        responseOutput.textContent = `Network error: ${error.message}`;
    }
}

const style = document.createElement('style');
style.textContent = `
    #responseOutput .success { color: #4CAF50; font-weight: bold; }
    #responseOutput .error { color: #F44336; font-weight: bold; }
`;
document.head.appendChild(style);