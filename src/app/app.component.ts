import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('videoElement') videoElement: any;
  video: any;
  isshow: boolean;

  constructor() 
  {
    this.isshow = false;
  }
  showcam() 
  {
    this.isshow = true;
  }

//   NOTIFICATION***********************************************************

  getNotification()
  {
      

      Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
          console.log('Permission wasn\'t granted. Allow a retry.');
          return;
        }
        if (result === 'default') {
          console.log('The permission request was dismissed.');
          return;
        }
        console.log('Permission was granted for notifications');
      });
  }


  //   LOCATION*******************************************************************

  getLocation()
  {
    navigator.geolocation.getCurrentPosition(success, error, options)
    
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  
      function success(pos) 
      {
        var crd = pos.coords;
        console.log('Current position:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
       // console.log(`More or less ${crd.accuracy} meters.`);
      }
  
      function error(err) 
      {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }      
  }


//   CAMERA***********************************************************************

  getCamera()
  {    
      var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
      var video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
      video.play();
      };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });
  } 
}
