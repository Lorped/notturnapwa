import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  
  login(username: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/login.php', {
      username: username,
      password: password
    });
  }

  skill(userid: number) {
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/skill.php', {
      userid: userid
    });
  }

  poteri(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/listpoteri.php?id='+userid);
  }

  taum(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/listtaum.php?id='+userid);
  }

  loadpscorrenti(userid: number){

		return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/getps.php?id='+userid);

  }

  loadrubrica(userid: number){
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/rubrica.php?id='+userid );
  }

  addcontatto(userid: number, contatto: string, cell: number, home: number, note: string){
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/addrubrica.php', {
      idutente: userid,
      contatto: contatto,
      cell: cell,
      home: home,
      note: note
    });
  }

  delrubrica(idrubrica: number){
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/delrubrica.php?id='+idrubrica );
  }
  changerubrica(idrubrica: number, contatto: string, cell: number,  home: number, note: string){
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/changerubrica.php', {
      idrubrica: idrubrica,
      contatto: contatto,
      cell: cell,
      home: home,
      note: note
    });
  }

  getpregi(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/getpregi.php?id='+userid); 
  }

  morteultima(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/morte.php?id='+userid); 
  }

  barcode(userid: number, barcode: string) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/barcode.php?id=' + userid + '&barcode=' + barcode);
  }

  getscan(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/getscan.php?id=' + userid);
  }

  msgtomaster(userid: number, messaggio: string) {
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/msgtomaster.php', {
      idutente: userid,
      messaggio: messaggio
    });
  }

  caccia(userid: number, bs: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/caccia.php?id=' + userid + '&BS=' + bs);
  }
  modifcanote(userid: number, note: string) {
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/modificanote.php', {
      idutente: userid,
      note: note
    });
  }
}
