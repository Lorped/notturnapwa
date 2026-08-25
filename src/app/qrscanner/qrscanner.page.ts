import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';
import { Oggetto } from '../globals';
import { Router } from '@angular/router';

@Component({
    selector: 'app-qrscanner',
    templateUrl: './qrscanner.page.html',
    styleUrls: ['./qrscanner.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class QrscannerPage implements OnInit {
  @ViewChild('video', { static: false }) video?: ElementRef;
  @ViewChild('canvas', { static: false }) canvas?: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput?: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult: any  = null;
  loading?: HTMLIonLoadingElement;



  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    public oggetto: Oggetto,
    public router: Router
  ) { 
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit (){
    this.canvasElement = this.canvas?.nativeElement;
    this.canvasContext = this.canvasElement?.getContext('2d');
    this.videoElement = this.video?.nativeElement;
  }

  ngOnDestroy() {
    this.stopScan();
  }

  /*
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
  */

  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;

    if (this.videoElement?.srcObject) {
      const stream = this.videoElement.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      this.videoElement.srcObject = null;
    }

    if (this.loading) {
      this.loading.dismiss().catch(() => undefined);
      this.loading = undefined;
    }
  }

  async startScan() {

    // TEST ONLY
    //    this.oggetto.id = "543478635197";
    //    this.router.navigate(['oggetto']);
    /***************** */

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Camera non supportata in questo browser');
      return;
    }

    if (!this.videoElement || !this.canvasElement || !this.canvasContext) {
      console.error('Video/canvas non inizializzati');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }
      });

      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute('playsinline', true);
      this.videoElement.muted = true;

      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();

      await this.videoElement.play();
      this.scanActive = true;
      requestAnimationFrame(() => this.scan());
    } catch (error) {
      console.error('Errore apertura camera', error);
      this.stopScan();
    }
  }
  
  async scan() {
    if (!this.videoElement || !this.canvasElement || !this.canvasContext) {
      return;
    }

    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss().catch(() => undefined);
        this.loading = undefined;
      }

      this.scanActive = true;
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.oggetto.id = this.scanResult;

        if (this.videoElement?.srcObject) {
          const stream = this.videoElement.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          this.videoElement.srcObject = null;
        }

        // alert('Scansione completata: ' + this.scanResult);
        this.router.navigateByUrl('/oggetto');
      } else if (this.scanActive) {
        requestAnimationFrame(() => this.scan());
      }
    } else if (this.scanActive) {
      requestAnimationFrame(() => this.scan());
    }
  }

  /***   NON SRVE IMMAGINE FISSA  */
  /*
  captureImage() {
    this.fileinput?.nativeElement.click();
  }
  
  handleFile($event: any) {

    const file = $event.target.files.item(0);
  
    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
  
      if (code) {
        this.scanResult = code.data;
        //this.showQrToast();
        this.oggetto.id=this.scanResult;
        this.router.navigate(['/tabs/oggetto']);
      }
    };
    img.src = URL.createObjectURL(file);
  }
  */

}
