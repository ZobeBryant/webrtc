"use strict";

//filter
var filtersSelect = document.querySelector("select#filter");

//picture
var snapshot = document.querySelector("button#snapshot");
var picture = document.querySelector("canvas#picture");
picture.width = 640;
picture.height = 480;

var videoplay = document.querySelector("video#player");

var save = document.querySelector("button#save");

function gotMediaStream(stream) {
  window.stream = stream;
  videoplay.srcObject = stream;
}

function handleError(err) {
  console.log("getUserMedia error:", err);
}

function start() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia is not supported!");
    return;
  } else {
    var constraints = {
      video: {
        width: 640,
        height: 480,
        frameRate: 15,
        facingMode: "enviroment", // 后置摄像头
      },
      audio: false,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotMediaStream)
      .catch(handleError);
  }
}

filtersSelect.onchange = function () {
  videoplay.className = filtersSelect.value;
};

var filterMap = {
  blur: "blur(3px)",
  grayscale: "grayscale(1)",
  invert: "invert(1)",
  sepia: "sepia(1)",
  none: "none",
};

snapshot.onclick = function () {
  var ctx = picture.getContext("2d");
  ctx.filter = filterMap[filtersSelect.value]; // 给canvas上下文设置滤镜，这样保存的是滤镜后的图片
  ctx.drawImage(videoplay, 0, 0, picture.width, picture.height);
};

function downLoad(url) {
  var oA = document.createElement("a");
  oA.download = "photo"; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}

save.onclick = function () {
  downLoad(picture.toDataURL("image/jpeg"));
};

start();
