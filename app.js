const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 360;
canvas.height = 360;

let img = new Image();
let file = localStorage.getItem('photo');

if (file) {
  img.src = file;
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Фильтры
document.getElementById('brightnessBtn').onclick = () => {
  ctx.filter = 'brightness(1.2)';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

document.getElementById('filterBtn').onclick = () => {
  ctx.filter = 'contrast(1.3) saturate(1.2)';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

document.getElementById('vignetteBtn').onclick = () => {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 100,
    canvas.width / 2, canvas.height / 2, 250
  );
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Градиентный фон
document.getElementById('gradientBtn').onclick = () => {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#ff9a9e');
  gradient.addColorStop(1, '#fad0c4');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Цветной фон
document.getElementById('bgBtn').onclick = () => {
  const colors = ['#f9f9f9', '#ffe4e1', '#e0f7fa', '#fff3e0', '#f3e5f5'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Добавление текста
document.getElementById('addTextBtn').onclick = () => {
  const text = document.getElementById('captionInput').value;
  const selectedFont = document.getElementById('fontSelect').value;

  if (text) {
    ctx.font = `24px ${selectedFont}`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height - 30);
  }
};

// Сохранить
document.getElementById('saveBtn').onclick = () => {
  const link = document.createElement('a');
  link.download = 'smm-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

// Предпросмотр
document.getElementById('previewBtn').onclick = () => {
  window.open(canvas.toDataURL('image/png'), '_blank');
};
