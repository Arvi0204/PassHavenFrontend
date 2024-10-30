let authToken = '';
let backendHost = 'https://pass-haven-backend.vercel.app';
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day login time

// Function to clear the auth token from storage
function clearAuthToken() {
    chrome.storage.local.remove("authToken");
}

// Load the token on service worker start
function loadAuthToken() {
    chrome.storage.local.get(['authToken'], (result) => {
        if (result.authToken) {
            authToken = result.authToken; // Store token in memory
        }
    });
}

// Call this function to load token when the service worker is started
loadAuthToken();

// Listen for when Chrome starts up
chrome.runtime.onStartup.addListener(() => {
    loadAuthToken();
});

// Function to set the auth token
function setAuthToken(token) {
    chrome.storage.local.set({ "authToken": token });
    setTimeout(() => {
        clearAuthToken();
    }, TOKEN_EXPIRATION_TIME);
}

// Existing message listener code for login and fetching passwords...
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'login') {
        fetch(`${backendHost}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: request.email,
                password: request.password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    authToken = data.authToken;
                    setAuthToken(authToken)
                    sendResponse({ success: true });
                } else {
                    sendResponse({ success: false, error: data.error });
                }
            })
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep the message channel open for async response
    }

    if (request.type === 'fetchPasswords') {
        fetch(`${backendHost}/api/passwords/fetchallpass`, {
            method: 'GET',
            headers: {
                'auth-token': `${authToken}`,
            },
        })
            .then(response => response.json())
            .then(passwords => sendResponse({ success: true, passwords }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});
