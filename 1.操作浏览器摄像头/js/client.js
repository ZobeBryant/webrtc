
'use strict';

// 可以指定 MediaStream 中包含哪些类型的媒体轨（音频轨、视频轨），并且可为这些媒体轨设置一些限制。
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

// 通过navigator.mediaDevices.getUserMedia接口访问音视频设备
navigator.mediaDevices.getUserMedia(mediaStreamContrains).then(
    gotLocalMediaStream
).catch(
    handleLocalMediaStreamError
);