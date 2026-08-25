import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { User } from '../globals';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AuthserviceService } from '../services/authservice.service';

import { Oggetto } from '../globals'; //SERVE??

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class Tab3Page implements OnInit {


  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  isModalOpen = false;
  oggetto: Oggetto = new Oggetto();

  giarisposto = false;
  rispostaselezionata = '';

  oldscan: Array<Oggetto> = [];



  constructor(
	public user: User, 
	private authservice: AuthserviceService,
	private router: Router,
	private alertController: AlertController) {	
    
  }


  async initialstuff(){
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }
    
    let { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
 
    if (available == false ){
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
     this.router.navigate(['/qrscanner']);
     return;

  }


  ionViewWillEnter() {
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      //console.log(data);
      this.oldscan = data;
      // console.log("odscan : ", this.oldscan);
    });
  }

  ngOnInit() {
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      //console.log(data);
      this.oldscan = data;
      // console.log("odscan : ", this.oldscan);
    });
  }


	
}
