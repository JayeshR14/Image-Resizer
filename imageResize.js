const btn = document.querySelector("#btn");
const selImg = document.querySelector(".up-img-bx");
let previewImg = selImg.querySelector('img');
const file = document.querySelector("#file");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const aspectCheck = document.querySelector("#checkRes");
const redq = document.querySelector("#redq");

let imgRatio;
const loadfile = (e) => {
     const file = e.target.files[0];
     if(!file) return;
     previewImg.src = URL.createObjectURL(file);
     previewImg.addEventListener('load',()=>{        
          selImg.classList.add("active");
          width.value = previewImg.naturalWidth;
          height.value = previewImg.naturalHeight;
          imgRatio = previewImg.naturalWidth / previewImg.naturalHeight;
     })
}

const downloadAndResize = () => {

     const a = document.createElement('a');
     let canvas = document.createElement('canvas')
     let ctx = canvas.getContext('2d');

     const imgQuality = redq.checked ? 0.7 : 1.0;

     canvas.width = width.value;
     canvas.height = height.value;

     ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)

     a.href = canvas.toDataURL("imgae/jpeg",imgQuality);
     a.download = new Date().getTime();
     a.click();
     selImg.classList.remove("active");
     window.location.reload();
}

btn.addEventListener('click',downloadAndResize)

width.addEventListener("keyup",()=>{
     const hgt = aspectCheck.checked ? parseInt(width.value) / imgRatio : height.value;
     height.value = Math.floor(hgt);
})

height.addEventListener("keyup",()=>{
     const wgt = aspectCheck.checked ? parseInt(height.value) * imgRatio : weight.value;
     width.value = Math.floor(wgt);
})

file.addEventListener('change',loadfile)
selImg.addEventListener('click',()=>{
     file.click();
})
