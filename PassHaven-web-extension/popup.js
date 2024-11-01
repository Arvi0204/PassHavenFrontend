document.addEventListener("DOMContentLoaded", () => {
    // Add an event listener to the login button
    document.getElementById("loginButton").addEventListener("click", (e) => {
        handleLogin(e); // Pass the event to handleLogin
    });
    document.getElementById("logoutButton").addEventListener("click", () => {
        // Setting form to blank
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        // Clearing local storage variables to ensure access to validated users
        chrome.storage.local.remove(['authToken', 'passwords', 'tokenExpiry']);
        document.getElementById("passwordsContainer").classList.add("hidden");
        document.getElementById("loginForm").classList.remove("hidden");
        showToast("Logged out successfully!", true)
    });
    
    document.getElementById("redirect").addEventListener("click", () => { chrome.tabs.create({ url: 'https://pass-haven.netlify.app/' }) });
    
    // Run this check to see if the user is already logged in
    chrome.storage.local.get(["authToken", 'tokenExpiry'], (result) => {
        if (result.authToken && Date.now() < result.tokenExpiry) {
            document.getElementById("loginForm").classList.add("hidden");
            document.getElementById("passwordsContainer").classList.remove("hidden");
            fetchPasswords();
        } else {
            showToast("Session expired, please login again", false)
            //Clearing authtoken
            chrome.storage.local.remove(['authToken', 'passwords', 'tokenExpiry']);
        }
    });
});

function handleLogin(e) {
    // Include event parameter
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let isValid = true;
    let errorMessage = "";

    // Check if the email is in valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage += "Please enter a valid email address!<br>";
        isValid = false;
    }

    // Check if the password is not empty
    if (password.trim() === "") {
        errorMessage += "Password cannot be blank!";
        isValid = false;
    }

    // If the form is not valid, prevent submission and show error
    if (!isValid) {
        e.preventDefault(); // Prevent form submission
        showToast(errorMessage, false)
        return; // Exit the function early if validation fails
    }

    // Send login message
    chrome.runtime.sendMessage({ type: "login", email, password }, (response) => {
        if (response.success) {
            document.getElementById("loginForm").classList.add("hidden");
            document.getElementById("passwordsContainer").classList.remove("hidden");
            showToast("Login successful", true)
            fetchPasswords();
        } else {
            showToast("Login Failed. Enter valid credentials", false);
        }
    });
}

function copyToClipboard(text, type) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            // Show the toast notification
            showToast(`Copied ${type} to clipboard`, true);
        })
        .catch(() => {
            showToast("Failed to copy. Please try again.", false);
        });
}
const getDisplayURL = (url) => {
    // Remove http:// or https://
    const strippedUrl = url.replace(/^(https?:\/\/)/, '');
    // Match up to the main domain (e.g., example.com)
    const match = strippedUrl.match(/^[^\/]+(\.com|\.in|\.org|\.net|\.edu|\.gov)/);
    return match ? match[0] : strippedUrl;
};

function fetchPasswords() {
    chrome.runtime.sendMessage({ type: "fetchPasswords" }, (response) => {
        const passwordTableBody = document.getElementById("passwordTableBody");
        passwordTableBody.innerHTML = ""; // Clear the table body initially

        if (response.success) {
            const passwords = response.passwords;

            // Check if passwords is an array
            if (!Array.isArray(passwords)) {
                return; // Exit if not an array
            }

            // Check if there are no passwords
            if (passwords.length === 0) {
                // Create a message row with a cell that spans all columns
                const messageRow = document.createElement('tr');
                const messageCell = document.createElement('td');

                // Set colspan to the number of columns in your table (adjust as necessary)
                messageCell.setAttribute('colspan', '3');
                messageCell.classList.add('text-sm', 'text-white', 'text-center', 'font-bold');
                messageCell.innerHTML = "Please add passwords to display";

                messageRow.appendChild(messageCell);
                passwordTableBody.appendChild(messageRow);

                // Hide the password table body since there are no passwords
                passwordTableBody.classList.remove("hidden");
            } else {
                // If there are passwords, show them in the table
                passwords.forEach((pass) => {
                    const maskedPassword = "*".repeat(pass.password.length); // Masking the password
                    const row = document.createElement("tr");
                    row.classList.add("bg-blue-400");

                    row.innerHTML = `
                        <td class="whitespace-nowrap p-2 text-white border border-blue-100"> 
                            <a target="_blank" rel="noopener noreferrer" href="${pass.url.startsWith("http://") || pass.url.startsWith("https://") ? pass.url : "https://" + pass.url}">${getDisplayURL(pass.url)}</a>
                        </td>
                        <td class="whitespace-nowrap p-2 text-white border border-blue-100">
                            <span class="cursor-pointer username">${pass.username}</span>
                        </td>
                        <td class="whitespace-nowrap p-2 text-white border border-blue-100">
                            <span class="cursor-pointer password" data-password="${pass.password}">${maskedPassword}</span>
                        </td>
                    `;
                    passwordTableBody.appendChild(row);
                });
                // Show the password table now that we have passwords
                passwordTableBody.classList.remove("hidden");

                // Store passwords in local storage for content script to use
                chrome.storage.local.set({ passwords: response.passwords });

                // Attach event listeners to copy username and password
                document.querySelectorAll(".username").forEach((element) => {
                    element.addEventListener("click", (event) => {
                        const username = event.target.innerText;
                        copyToClipboard(username, "username");
                    });
                });

                document.querySelectorAll(".password").forEach((element) => {
                    element.addEventListener("click", (event) => {
                        const password = event.target.getAttribute("data-password");
                        copyToClipboard(password, "password");
                    });
                });
            }
        } else {
            showToast(`Failed to fetch passwords: ${response.error}`, false)
        }
    });
}

function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    const icon = document.createElement("img");
    if (type)
        icon.src = "icons/check.png";
    else
        icon.src = "icons/cross.png";

    toast.insertAdjacentElement("afterbegin", icon);

    document.body.appendChild(toast);

    // Show the toast
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    // Hide the toast after 1.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        // Remove the toast from the DOM after hiding
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
    }, 1500);
}
