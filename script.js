document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();
    updateDummyData();

    setInterval(updateDateTime, 1000);
    setInterval(updateDummyData, 2000);

    document.getElementById("emergencyStopBtn").addEventListener("click", emergencyStop);

    document.querySelectorAll(".relay-btn").forEach(button => {
        button.addEventListener("click", function () {
            toggleRelay(this);
        });
    });
});

// Token dan Chat ID bot Telegram
const BOT_TOKEN = "7938826396:AAGqbyvm4a9KdebQkCOGXXRrqHwDc2zBshk";
const CHAT_ID = "963724868";
const ESP32_API_URL = "http://192.168.1.100/control"; // Ganti dengan IP ESP32

function updateDateTime() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
    document.getElementById("date").textContent = now.toLocaleDateString();
}

function toggleRelay(button, deviceType) {
    button.classList.toggle("bg-gray-500");
    button.classList.toggle("bg-green-600");

    const device = button.textContent.trim();
    const status = button.classList.contains("bg-green-600") ? "ON" : "OFF";

    sendToTelegram(`Perintah: ${device} ${status}`);
    sendToESP32(device, status, deviceType);
}

function emergencyStop() {
    document.querySelectorAll("button.bg-green-600").forEach(button => {
        button.classList.remove("bg-green-600");
        button.classList.add("bg-gray-500");
    });

    sendToTelegram("⚠️ Semua perangkat telah dimatikan!");
    sendToESP32("ALL", "OFF", "emergency");
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

// Kirim pesan ke bot Telegram
function sendToTelegram(message) {
    console.log("Mengirim pesan ke Telegram:", message); // Debugging
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const data = {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
    };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Pesan terkirim:", data))
    .catch(error => console.error("Error mengirim pesan:", error));
}

// Kirim perintah ke ESP32
function sendToESP32(device, status, deviceType) {
    const url = `${ESP32_API_URL}?device=${encodeURIComponent(device)}&status=${status}&type=${deviceType}`;

    fetch(url, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => console.log("ESP32 Response:", data))
    .catch(error => console.error("Error mengirim ke ESP32:", error));
}
