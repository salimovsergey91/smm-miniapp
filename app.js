const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('photoInput');
const brightnessRange = document.getElementById('brightnessRange');
const contrastRange = document.getElementById('contrastRange');

canvas.width = 360;
canvas.height = 360;

let img = new Image();
let brightness = 1;
let contrast = 1;

// Загрузка фото
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    img.src = event.target.result;
    img.onload = drawImage;
  };
  reader.readAsDataURL(file);
});

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `brightness(${brightness}) contrast(${contrast})`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';
}

// Яркость и контраст через ползунки
brightnessRange.addEventListener('input', (e) => {
  brightness = e.target.value;
  drawImage();
});

contrastRange.addEventListener('input', (e) => {
  contrast = e.target.value;
  drawImage();
});

// Кнопки фильтров
document.getElementById('filterBtn').onclick = () => {
  ctx.filter = 'contrast(1.2) saturate(1.3)';
  drawImage();
};

document.getElementById('vignetteBtn').onclick = () => {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 100,
    canvas.width / 2, canvas.height / 2, 250
  );
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawImage();
};

document.getElementById('gradientBtn').onclick = () => {
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, 'pink');
  grad.addColorStop(1, 'orange');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawImage();
};

document.getElementById('fontBtn').onclick = () => {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Пример текста', 20, 50);
};

// Предпросмотр
document.getElementById('previewBtn').onclick = () => {
  const dataUrl = canvas.toDataURL();
  const win = window.open();
  win.document.write(`<img src="${dataUrl}" style="width:100%">`);
};

// Сохранение
document.getElementById('saveBtn').onclick = () => {
  const link = document.createElement('a');
  link.download = 'smm-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

// Заглушка Telegram
document.getElementById('openTG').onclick = () => {
  alert('Открытие в Telegram MiniApp...');
};
