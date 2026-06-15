const fs = require('fs');
const data = fs.readFileSync('assets/Prio 3d Logo.glb');
const b64 = data.toString('base64');
fs.writeFileSync('assets/model_data.js', 'window.PRIO_LOGO_B64 = "data:application/octet-stream;base64,' + b64 + '";');
console.log('Successfully encoded 3D model.');
