var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");

const mediaStreamContrains = {
    // video: true
    video: true,
    // audio: true
};

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia is not supported!');
} else {
    // 通过navigator.mediaDevices.getUserMedia接口访问音视频设备
    navigator.mediaDevices.getUserMedia(mediaStreamContrains)
        .then(
            gotMediaStream
        ).then(getDevices)
        .catch(
            (error) => {
                console.log('navigator.getUserMedia error: ', error);
            }
        );

}
const localVideo = document.querySelector('video');

function gotMediaStream(stream) {
    // videoplay.srcObject = stream; // 指定数据源来自stream,这样视频标签采集到这个数据之后就可以将视频和音频播放出来
    localVideo.srcObject = stream;
    // 当我们采集到音视频的数据之后，我们返回一个Promise
    return navigator.mediaDevices.enumerateDevices();
}


function getDevices(deviceInfos) {
    deviceInfos.forEach((deviceInfo) => {
        console.log(deviceInfo)
        console.log(deviceInfo.kind + ": label = "
            + deviceInfo.label + ": id = "
            + deviceInfo.deviceId + ": groupId = "
            + deviceInfo.groupId);

        var option = document.createElement('option')
        // https环境下label不为空，否则为空
        option.text = deviceInfo.label
        option.value = deviceInfo.deviceId
        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            videoSource.appendChild(option);
        }
    })
}

function handleError(err) {
    console.log(err.name + " : " + err.message);
}
