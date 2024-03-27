const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const faceColour = document.getElementById('face-colour');
const borderColour = document.getElementById('border-colour');
const hourLineColour = document.getElementById('hour-line-color');
const minLineColour = document.getElementById('min-line-color');
const lrgHandColor = document.getElementById('large-hands-color');
const secHandColor = document.getElementById('seconds-hand-color');

const clock = () => {
  const now = new Date();

  //Setup Canvas
  ctx.save();

  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2);

  //Set default styles
  ctx.strokeStyle = '#282828';
  ctx.fillStyle = '#f4f4f4';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  //Draw Clock Face/Border
  ctx.save();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColour.value;
  ctx.fillStyle = faceColour.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();

  ctx.restore();

  //Draw hour lines
  ctx.save();
  ctx.strokeStyle = hourLineColour.value;
  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }

  ctx.restore();

  //Draw minute lines
  ctx.save();
  ctx.strokeStyle = minLineColour.value;
  ctx.lineWidth = 4;
  for (i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }

  ctx.restore();

  //Get current time
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  //   console.log(`${hour}:${min}:${sec}`);

  //Draw hour's hand
  ctx.save();

  ctx.rotate(
    (Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = lrgHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();

  ctx.restore();

  //Draw min's hand
  ctx.save();

  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = lrgHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(111, 0);
  ctx.stroke();

  ctx.restore();

  //Draw sec's hand
  ctx.save();

  ctx.rotate(sec * (Math.PI / 30));
  ctx.strokeStyle = secHandColor.value;
  ctx.fillStyle = '#86f592';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.restore();

  ctx.restore();

  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
});
