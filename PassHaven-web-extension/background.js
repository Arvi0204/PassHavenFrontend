let backendHost = 'https://pass-haven-backend.vercel.app';
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day login time

// Function to set the auth token
function setAuthToken(token) {
    const expiryTime = Date.now() + TOKEN_EXPIRATION_TIME;
    chrome.storage.local.set({ authToken: token, tokenExpiry: expiryTime });
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
                    setAuthToken(data.authToken)
                    sendResponse({ success: true });
                } else {
                    sendResponse({ success: false, error: data.error });
                }
            })
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep the message channel open for async response
    }

    if (request.type === 'fetchPasswords') {
        chrome.storage.local.get(['authToken'], (result) => {
            const authToken = result.authToken; // Retrieve the token from local storage
            fetch(`${backendHost}/api/passwords/fetchallpass`, {
                method: 'GET',
                headers: {
                    'auth-token': authToken,
                },
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch passwords: Invalid token or server error');
                }
                return response.json();
            })
                .then(passwords => sendResponse({ success: true, passwords }))
                .catch(error => sendResponse({ success: false, error: error.message }));
        });
        return true; // Keep the message channel open for async response
    }
});
