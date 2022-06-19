
'use strict';

const mediaStreamContrains = {
    // video: true
    video: {

        frameRate: { min: 20 }, // 帧率
        width: { min: 640, ideal: 1280 }, // 视频宽度
        height: { min: 360, ideal: 720 }, // 视频高度
        aspectRatio: 16 / 9, // 宽高比
        facingMode: 'enviroment' // 后置摄像头
    },
    audio: {
        echoCancellation: true, // 回音消除
        noiseSuppression: true, // 降噪
        autoGainControl: true // 自动增益
    }
};

const localVideo = document.querySelector('video');

function gotLocalMediaStream(mediaStream) {
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(mediaStreamContrains).then(
    gotLocalMediaStream
).catch(
    handleLocalMediaStreamError
);