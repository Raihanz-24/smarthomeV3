// Night mode toggle
function toggleNightMode() {
    const body = document.body;
    const isDark = body.classList.toggle('bg-gray-900');

    if (isDark) {
        body.classList.remove('bg-gray-100');
        document.querySelectorAll('.bg-white').forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-gray-800', 'text-white');
        });
    } else {
        body.classList.add('bg-gray-100');
        document.querySelectorAll('.bg-gray-800').forEach(el => {
            el.classList.remove('bg-gray-800', 'text-white');
            el.classList.add('bg-white');
        });
    }
}

// Update time and date
function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
    document.getElementById('date').textContent = now.toLocaleDateString();
}
setInterval(updateTime, 1000);
updateTime();

// Fungsi toggle tombol dan kirim notifikasi ke Telegram
function toggleRelay(button, type) {
    const isActive = button.classList.contains('bg-green-500');
    const deviceName = button.textContent.trim();

    // Toggle warna
    button.classList.toggle('bg-green-500');
    button.classList.toggle('bg-gray-500');

    // Animasi kecil
    button.classList.add('scale-95');
    setTimeout(() => button.classList.remove('scale-95'), 150);

    const status = isActive ? 'OFF' : 'ON';

    // Kirim notifikasi Telegram
    sendTelegramMessage(`🔔 ${deviceName} (${type}) diubah menjadi ${status}`);
}

// Emergency Stop
document.addEventListener("DOMContentLoaded", () => {
    const stopBtn = document.getElementById('emergencyStopBtn');
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            document.querySelectorAll('button[onclick^="toggleRelay"]').forEach(btn => {
                btn.classList.remove('bg-green-500');
                btn.classList.add('bg-gray-500');
            });
            sendTelegramMessage('🚨 Semua perangkat dimatikan melalui Emergency Stop!');
        });
    }
});

// Fungsi kirim notifikasi ke Telegram
function sendTelegramMessage(text) {
    const TOKEN = '7938826396:AAGqbyvm4a9KdebQkCOGXXRrqHwDc2zBshk';
    const CHAT_ID = '5477649606';
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    }).catch(err => console.error('Telegram Error:', err));
}
