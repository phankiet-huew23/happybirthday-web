const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const passwordInput = document.getElementById('passwordInput');
const openGiftBtn = document.getElementById('openGiftBtn');
const musicPlayer = document.getElementById('musicPlayer');
let chosenFiles = [];

// Xem trước ảnh
imageInput.addEventListener('change', () => {
  const files = Array.from(imageInput.files);

  if (files.length > 3) {
    alert('Vui lòng chọn tối đa 3 ảnh!');
    imageInput.value = '';
    preview.innerHTML = '';
    chosenFiles = [];
    return;
  }

  chosenFiles = files;
  preview.innerHTML = '';

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
      setTimeout(() => { img.style.opacity = '1'; }, 50);
    };
    reader.readAsDataURL(file);
  });
});

// Mở quà
openGiftBtn.addEventListener('click', () => {
  const name = passwordInput.value.trim();

  if (chosenFiles.length !== 3) {
    alert('Vui lòng chọn đủ 3 ảnh!');
    return;
  }

  if (name === "") {
    alert('Vui lòng nhập tên người nhận!');
    return;
  }

  // Hiện màn 3
  document.getElementById('screen').style.display = 'none';
  const screen3 = document.getElementById('screen3');
  screen3.style.display = 'block';

  // Hiển thị ảnh
  const chosenImagesDiv = document.getElementById('chosenImages');
  chosenImagesDiv.innerHTML = '';
  chosenFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      chosenImagesDiv.appendChild(img);
      setTimeout(() => { img.style.opacity = '1'; }, 100);
    };
    reader.readAsDataURL(file);
  });

  // Lời chúc (thay "em" bằng tên)
  const message = document.getElementById('message');
  const baseMessage =
    "Chúc {name} sinh nhật thật hạnh phúc, ngập tràn nụ cười và yêu thương. " +
    "Mỗi ngày của {name} đều là niềm vui, chúc sinh nhật này cũng ngập tràn hạnh phúc. " +
    "Tuổi mới rực rỡ như nụ cười của {name}, sinh nhật vui vẻ nhé. " +
    "Chúc {name} luôn xinh đẹp, vui vẻ và mọi điều tốt đẹp sẽ đến bên {name}. " +
    "Chúc {name} tuổi mới ngập tràn may mắn, yêu thương và những khoảnh khắc ngọt ngào. " +
    "Hãy cười thật tươi, tận hưởng từng khoảnh khắc. " +
    "Chúc sinh nhật {name} luôn thật đặc biệt như chính em 💖🎂✨";

  message.innerText = baseMessage.replaceAll("{name}", name);
  setTimeout(() => { message.style.opacity = '1'; }, 500);

  // Tự động phát nhạc
  musicPlayer.play().catch(e => console.log("Autoplay bị chặn:", e));
});
