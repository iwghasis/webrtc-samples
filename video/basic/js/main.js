/**
 * Created by iwghais@naver.com on 2016-03-16.
 */
(function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var video = document.querySelector('video');
    var takePhotoBtn = document.querySelector('button');
    var sVideoSourceId = null;

    MediaStreamTrack.getSources(function(sourceInfos) {
        for (var i = 0; i < sourceInfos.length; i++) {
            if (sourceInfos[i].kind == 'video') {
                sVideoSourceId = sourceInfos[i].id;
                break;
            }
        }
    });

    takePhotoBtn.addEventListener('click', function(e) {
        var canvas = document.querySelector('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    });

    navigator.getUserMedia({
            video: {
                optional: [{
                    sourceId: sVideoSourceId
                }]
            }
        }, function (stream) {
            var video = document.querySelector('video');

            /*if (window.stream) {
                video.src = null;
                window.stream.stop();
            }*/

            window.stream = stream; // make stream available to console

            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, function (error) {
            console.log('navigator.getUserMedia error: ', error);
        });


})()