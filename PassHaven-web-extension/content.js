chrome.storage.local.get('passwords', (data) => {
  if (data.passwords) {
    const currentUrl = window.location.href;

    // Check if there's a password for the current URL'
    const matchingPassword = data.passwords.find(pass => getDisplayURL(pass.url) === getDisplayURL(currentUrl));

    if (matchingPassword) {
      document.querySelector('input[type="text"], input[type="email"]').value = matchingPassword.username;
      document.querySelector('input[type="password"]').value = matchingPassword.password;
    }
  }
});
//Rudimentary logic to clip url for better matching and autofill
const getDisplayURL = (url) => {
  // Remove http:// or https://
  const strippedUrl = url.replace(/^(https?:\/\/)/, '');
  // Match up to the main domain (e.g., example.com)
  const match = strippedUrl.match(/^[^\/]+(\.com|\.in|\.org|\.net|\.edu|\.gov)/);
  return match ? match[0] : strippedUrl;
};
