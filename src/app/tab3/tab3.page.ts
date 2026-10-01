import {
  ChangeDetectorRef,
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { User, Oggetto } from '../globals';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthserviceService } from '../services/authservice.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { MenopsRoutineService } from '../services/menops-routine.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export class Tab3Page implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  isModalOpen = false;
  oggetto: Oggetto = new Oggetto();

  giarisposto = false;
  rispostaselezionata = '';

  oldscan: Array<Oggetto> = [];

  public user = inject(User);
  private authservice = inject(AuthserviceService);
  private router = inject(Router);
  public alertController = inject(AlertController);
  private menopsRoutine = inject(MenopsRoutineService);

  constructor() {
    this.initialstuff();
  }

  ngOnInit() {
    this.menopsRoutine.ripristina(this.user);
  }

  async initialstuff() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }

    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (available == false) {
      // alert("debug: module not available");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } else {
      // alert("debug: module available");
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openbarcode() {
    await this.router.navigate(['/qrscanner']);
  }

  risposta(risposta: string) {
    //console.log('Risposta selezionata:', risposta);
    this.giarisposto = true;
    this.rispostaselezionata = risposta;
  }

  /** NO MODAL IN PWA 
  cancel() {
    this.isModalOpen = false;
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      this.oldscan = data;
    });
  }
   ********** */

  ionViewWillEnter() {
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      //console.log(data);
      this.oldscan = data;
      this.changeDetectorRef.markForCheck();
      // console.log("odscan : ", this.oldscan);
    });
  }
}
