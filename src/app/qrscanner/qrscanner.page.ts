import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
import { Oggetto } from '../globals';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class QrscannerPage implements AfterViewInit, OnDestroy {
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  canvasElement?: HTMLCanvasElement;
  videoElement?: HTMLVideoElement;
  canvasContext?: CanvasRenderingContext2D;

  animationFrameId?: number;
  lastscantime = 0;

  scanInterval = 100; // milliseconds between scan attempts

  scanActive = false;
  scanResult: string | null = null;

  private loading?: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private oggetto: Oggetto,
    private router: Router,
    private platform: Platform
  ) {
    const isStandaloneMode = (): boolean => 
      'standalone' in window.navigator &&  Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

    if (this.platform.is('ios') && isStandaloneMode()) {
      console.log ("I'm an iOS PWA!!")
    }
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas?.nativeElement;
    this.videoElement = this.video?.nativeElement;
    this.canvasContext = this.canvasElement?.getContext('2d', { willReadFrequently: true }) ?? undefined;
  }

  ngOnDestroy() {
    this.scanResult = null;
    //this.stopScan();
  }

  async startScan() {
    if (this.scanActive) {
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia ) {
      console.error('Camera is not supported in this browser.');
      return;
    }

    if (!this.videoElement || !this.canvasElement || !this.canvasContext) {
      console.error('Video or canvas elements are not properly initialized.');
      return;
    }

    try {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();


      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },

          // no risoluzioni eccessive per evitare problemi di performance
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false
      });

      this.videoElement.srcObject = stream;
      this.videoElement.playsInline = true;
      this.videoElement.muted = true;
      await this.videoElement.play();

      this.scanActive = true;
      this.lastscantime = 0;
      this.scheduleNextScan();

    } catch (error) {
      console.error('Error starting scan:', error);
      await this.stopScan();
    }
  }

  async stopScan() {
    this.scanActive = false;

    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }

    const stream = this.videoElement?.srcObject ;

    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.srcObject = null;
    }

    if (this.loading) {
      await this.loading.dismiss().catch(() => undefined);
      this.loading = undefined;
    }

  }

  scheduleNextScan() {
    if (!this.scanActive){
      return;
    }
    this.animationFrameId = requestAnimationFrame((timestamp) => this.scan(timestamp));
    
  }


  private async scan(timestamp: number) {
    if (!this.scanActive || !this.videoElement || !this.canvasElement || !this.canvasContext) {
      return;
    }

    if (timestamp - this.lastscantime  < this.scanInterval || this.videoElement.readyState < this.videoElement.HAVE_CURRENT_DATA) {
      this.scheduleNextScan();
      return;
    }

    this.lastscantime = timestamp;

    if (this.loading) {
      await this.loading.dismiss().catch(() => undefined);
      this.loading = undefined;
    } 

    if (!this.scanActive) {
      return;
    }
      
    const targetWidth = 640;
    const scale = targetWidth / this.videoElement.videoWidth;
    const targetHeight = Math.round (this.videoElement.videoHeight * scale);

    if (this.canvasElement.width !== targetWidth || this.canvasElement.height !== targetHeight) {
      this.canvasElement.width = targetWidth;
      this.canvasElement.height = targetHeight;
    }
    
    this.canvasContext.drawImage(this.videoElement, 0, 0, targetWidth, targetHeight);

    const imagedata = this.canvasContext.getImageData(0, 0, targetWidth, targetHeight);

    const code = jsQR(imagedata.data, imagedata.width, imagedata.height, { inversionAttempts: 'dontInvert' });

    if (!code) {
      this.scheduleNextScan();
      return;
    }

    const value = code.data.trim();

    if (!this.isValidIdentifier(value)) {
      alert(`Invalid QR code identifier: ${value}`);
      this.scheduleNextScan();
      return;
    }

    this.scanResult = value;
    this.oggetto.id = value;
    await this.stopScan();

    await this.router.navigate(['/oggetto']);
    
  }

  isValidIdentifier(value: string): boolean {
    // Accept identifiers that contain any non-digit prefix but end with 12 digits
    const pattern = /\d{12}$/;
    return pattern.test(value);
  }


}