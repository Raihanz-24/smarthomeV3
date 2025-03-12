document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();
    updateDummyData();
    
    // Update waktu setiap detik
    setInterval(updateDateTime, 1000);
    
    // Update sensor setiap 2 detik
    setInterval(updateDummyData, 2000);

    // Tambahkan event listener ke tombol Emergency Stop
    document.getElementById("emergencyStopBtn").addEventListener("click", emergencyStop);

    // Tambahkan event listener ke tombol relay
    document.querySelectorAll(".relay-btn").forEach(button => {
        button.addEventListener("click", function () {
            toggleRelay(this);
        });
    });
});

function updateDateTime() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
    document.getElementById("date").textContent = now.toLocaleDateString();
}

function toggleRelay(button) {
    button.classList.toggle("bg-gray-500");
    button.classList.toggle("bg-green-600");
}

function emergencyStop() {
    document.querySelectorAll(".relay-btn").forEach(button => {
        button.classList.remove("bg-green-600");
        button.classList.add("bg-gray-500");
    });
    alert("⚠️ Semua perangkat telah dimatikan!");
}

function updateDummyData() {
    const temp = Math.floor(Math.random() * 10) + 20;
    const humidity = Math.floor(Math.random() * 40) + 40;
    const battery = Math.floor(Math.random() * 50) + 50;

    document.getElementById("temperature").textContent = temp + "°C";
    document.getElementById("humidity").textContent = humidity + "%";
    document.getElementById("battery-status").textContent = battery + "%";

    document.getElementById("temp-bar").style.width = temp + "%";
    document.getElementById("humidity-bar").style.width = humidity + "%";
    document.getElementById("battery-bar").style.width = battery + "%";
}

function toggleNightMode() {
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("text-white");
    document.querySelectorAll(".bg-white").forEach(el => {
        el.classList.toggle("bg-gray-800");
        el.classList.toggle("text-white");
    });
}
