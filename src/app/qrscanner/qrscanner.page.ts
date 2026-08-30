import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
export class QrscannerPage {
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  scanActive = false;
  private loading?: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private oggetto: Oggetto,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.stopScan();
  }

  async startScan() {
    if (!navigator.mediaDevices?.getUserMedia || !this.video || !this.canvas) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
      });
      const video = this.video.nativeElement;
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      video.muted = true;
      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();
      await video.play();
      this.scanActive = true;
      requestAnimationFrame(() => this.scan());
    } catch {
      this.stopScan();
    }
  }

  stopScan() {
    this.scanActive = false;
    const stream = this.video?.nativeElement.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    if (this.video) this.video.nativeElement.srcObject = null;
    this.loading?.dismiss().catch(() => undefined);
    this.loading = undefined;
  }

  private async scan() {
    const video = this.video?.nativeElement;
    const canvas = this.canvas?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!video || !canvas || !context || !this.scanActive) return;
    if (video.readyState < video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(() => this.scan());
      return;
    }
    await this.loading?.dismiss().catch(() => undefined);
    this.loading = undefined;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(image.data, image.width, image.height, { inversionAttempts: 'dontInvert' });
    if (!code) {
      requestAnimationFrame(() => this.scan());
      return;
    }
    this.oggetto.id = code.data;
    this.stopScan();
    await this.router.navigate(['/oggetto']);
  }
}