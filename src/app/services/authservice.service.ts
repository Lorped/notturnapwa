import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/listpoteri.php?id='+userid
    ).pipe(
    map(data => {
      //  ('poteri :' , data);
      return data;
    }));
  }

  taum(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/listtaum.php?id='+userid
    ).pipe(
    map(data => {
      // console.log ('poteri :' , data);
      return data;
    }));
  }

  loadpscorrenti(userid: number){

		return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/getps.php?id='+userid
		).pipe(
      map(data => {
        // console.log ('PS :' , data);
        return data;
      }));

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

}
