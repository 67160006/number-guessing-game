// filepath: script.js

// 1. ตัวแปรสำหรับสถานะเกม
let secretNumber = 0;
let attemptCount = 0; // ประกาศแค่ครั้งเดียวเพื่อป้องกัน Error "Cannot redeclare..."

// 2. จัดการ Event ต่างๆ เมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", function () {
    const guessInput = document.getElementById("guessInput");

    // รองรับการกดปุ่ม Enter
    guessInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    // ให้เลือกข้อความทั้งหมดอัตโนมัติเมื่อคลิกที่ช่อง input
    guessInput.addEventListener("focus", function () {
        this.select();
    });

    initializeGame(); // เริ่มต้นเกม
});

// 3. ฟังก์ชันเริ่มต้นหรือเริ่มเกมใหม่
function initializeGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptCount = 0;
    updateDisplay();
}

function resetGame() {
    initializeGame();
    document.getElementById("resultContainer").innerHTML = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").focus();
}

// 4. ฟังก์ชันตรวจสอบการทายตัวเลข
function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guessValue = parseInt(guessInput.value);
    const resultContainer = document.getElementById("resultContainer");

    // Validation: ตรวจสอบข้อมูลนำเข้า
    if (isNaN(guessValue) || guessInput.value === "") {
        resultContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">กรุณาใส่ตัวเลข!</div>
        `;
        return;
    }

    if (guessValue < 1 || guessValue > 100) {
        resultContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!</div>
        `;
        return;
    }

    attemptCount++;

    if (guessValue === secretNumber) {
        resultContainer.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h5>✓ ถูกต้อง!</h5>
                <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
            </div>
        `;
    } else if (guessValue > secretNumber) {
        resultContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">↓ ตัวเลขสูงไป</div>
        `;
    } else {
        resultContainer.innerHTML = `
            <div class="alert alert-info" role="alert">↑ ตัวเลขต่ำไป</div>
        `;
    }

    updateDisplay();
    guessInput.value = "";
    guessInput.focus();
}

// 5. ฟังก์ชันอัปเดตการแสดงผลจำนวนครั้ง
function updateDisplay() {
    const attemptsContainer = document.getElementById("attemptsContainer");
    attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}