document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".chat-input");
    const sendButton = document.querySelector(".send-button");

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });

    async function sendMessage() {
        const message = inputField.value.trim();
        if (message === "") return;

        inputField.value = "";
        
        // Tampilkan pesan pengguna
        addMessage("User", message);

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage("LTen AI", data.reply);
        } catch (error) {
            addMessage("LTen AI", "Maaf, terjadi kesalahan.");
        }
    }

    function addMessage(sender, text) {
        const chatBox = document.createElement("div");
        chatBox.innerHTML = `<strong>${sender}:</strong> ${text}`;
        document.body.appendChild(chatBox);
    }
});
