import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export class FeedItem {
	pg: string;
	data: string;
	ora: string;
	testo: string;

	constructor(pg: string, data: string, ora: string, testo: string) {
    this.pg = pg;
	  this.data = data;
    this.ora = ora;
    this.testo = testo;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(public http: HttpClient) { }

  public getDadi(userid: number) {
    var url = 'https://www.roma-by-night.it/ionicPHP/dadi.php?last=0&userid='+userid;

	var tirididado: Array<FeedItem> = [];

	return this.http.get(url).pipe(
    map( (res: any ) => {
		let status = res['status'];
		if ( status != 0 ) {
		  var objects = res['post'];
			if ( status == 1 ) {
				let newFeedItem = new FeedItem(objects.pg, objects.data, objects.ora, objects.testo);
				tirididado.push(newFeedItem);
			} else {
				var num=objects.length;
				// console.log ("num ", num );
				// console.log ("status ", status );
  				for (let i = 0; i < num; i++) {
   				let item = objects[i];
   				let newFeedItem = new FeedItem(item.pg, item.data, item.ora, item.testo);
   				tirididado.push(newFeedItem);
	   		}
		}
        // console.log( "feed tiridado= ", tirididado);
      	return tirididado;
			
	}
    return null;
    }));
  }


}
