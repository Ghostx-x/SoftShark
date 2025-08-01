document.getElementById("postButton").addEventListener("click", async () => {
    const input = document.getElementById("input").value;

    if (!input.trim()) return alert("Post cannot be empty.");
})

