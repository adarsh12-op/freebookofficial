let key = "";

// Generate a random key (example)
function generateKey() {
    key = Math.random().toString(36).substring(2, 15);
    document.getElementById("key").textContent = key;
    // Store key expiration date (48 hours from now)
    const expirationDate = new Date().getTime() + 48 * 60 * 60 * 1000;
    localStorage.setItem("key", JSON.stringify({ key, expirationDate }));
}

// Check if key is still valid
function checkKeyValidity() {
    const savedKey = JSON.parse(localStorage.getItem("key"));
    if (savedKey && new Date().getTime() < savedKey.expirationDate) {
        document.getElementById("key").textContent = savedKey.key;
    } else {
        generateKey();
    }
}

// Set video quality
document.getElementById("quality").addEventListener("change", (event) => {
    const quality = event.target.value;
    alert(`Video quality set to: ${quality}`);
    // You can adjust the YouTube embed URL dynamically based on the quality
});

// Set video playback speed
document.getElementById("speed").addEventListener("change", (event) => {
    const speed = event.target.value;
    document.querySelector("iframe").contentWindow.postMessage(
        '{"event":"command","func":"setPlaybackRate","args":[' + speed + ']}',
        "*"
    );
});

// Server button functionality
document.getElementById("server1").addEventListener("click", () => {
    alert("Server 1 selected");
});

document.getElementById("server2").addEventListener("click", () => {
    alert("Server 2 selected");
});

// Attach the generate key function
document.getElementById("generateKey").addEventListener("click", generateKey);

// Initialize by checking key validity
checkKeyValidity();
