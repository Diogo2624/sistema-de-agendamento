document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup-status");
    const okButton = document.getElementById("popup-ok");

    if (!popup || !okButton) return;

    okButton.addEventListener("click", () => {
        popup.style.display = "none";
    });
});
