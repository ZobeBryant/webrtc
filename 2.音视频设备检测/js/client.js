var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");

// 通过navigator.mediaDevices.enumerateDevices接口获取音视频设备列表
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices is not supported!');

}else{
    navigator.mediaDevices.enumerateDevices()
    .then(getDevices)
    .catch(handleError)
}

function getDevices(deviceInfos) {
    deviceInfos.forEach((deviceInfo) => {
        console.log(deviceInfo.kind + ": label = "
            + deviceInfo.label + ": id = "
            + deviceInfo.deviceId + ": groupId = "
            + deviceInfo.groupId);

            var option = document.createElement('option')
            // https环境下label不为空，否则为空
            option.text = deviceInfo.label
            option.value = deviceInfo.deviceId
            if(deviceInfo.kind === 'audioinput'){
                audioSource.appendChild(option);
            }else if(deviceInfo.kind === 'audiooutput'){
                audioOutput.appendChild(option);
            }else if(deviceInfo.kind === 'videoinput'){
                videoSource.appendChild(option);
            }
    })
}

function handleError(err){
    console.log(err.name + " : " + err.message);
}