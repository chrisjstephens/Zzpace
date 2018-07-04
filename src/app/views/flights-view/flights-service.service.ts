import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http'
// import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor() { }

  private flightLength:number = Math.floor(Math.random() * 41) + 40;

  public getDepartureFlightStatus(obj):object {
    console.log('flightInfo', obj);

    const departureTimes = [6, 10, 14, 18, 22];

    let flightLength = this.flightLength;
    let flightInfo = obj;

    let departureDate = obj.departureDate;
    let returnDate = obj.returnDate;

    let fromLocation = obj.fromLocation;
    let toLocation = obj.toLocation;

    const flightTime6 = departureTimes[0];
    const departureTime6 = this.getDepartureTime(departureDate , flightTime6);

    const flightTime10 = departureTimes[1];
    const departureTime10 = this.getDepartureTime(departureDate , flightTime10);

    const flightTime14 = departureTimes[2];
    const departureTime14 = this.getDepartureTime(departureDate , flightTime14);

    const flightTime18 = departureTimes[3];
    const departureTime18 = this.getDepartureTime(departureDate , flightTime18);

    const flightTime22 = departureTimes[4];
    const departureTime22 = this.getDepartureTime(departureDate , flightTime22);

    let flightObj = [
      this.createFlightObj(this.getFlightId(fromLocation, 1, toLocation, departureDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime6, flightTime6, flightLength),
        this.getDepartureTime(departureDate , flightTime6), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(departureDate , flightTime6))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 2, toLocation, departureDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime10, flightTime10, flightLength),
        this.getDepartureTime(departureDate , flightTime10), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(departureDate , flightTime10))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 3, toLocation, departureDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime14, flightTime14, flightLength),
        this.getDepartureTime(departureDate, flightTime14), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(departureDate, flightTime14))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 4, toLocation, departureDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime18, flightTime18, flightLength),
        this.getDepartureTime(departureDate, flightTime18), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(departureDate, flightTime18))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 5, toLocation, departureDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime22, flightTime22, flightLength),
        this.getDepartureTime(departureDate , flightTime22), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(departureDate ,flightTime22))
      ) ];

    return flightObj;

  }

  public getReturnFlightStatus(obj):object {
    console.log('flightInfo', obj);

    const returnTimes = [7, 11, 15, 19, 23];

    let flightLength = this.flightLength;
    let flightInfo = obj;

    let departureDate = obj.departureDate;
    let returnDate = obj.returnDate;

    let fromLocation = obj.toLocation;
    let toLocation = obj.fromLocation;


    const flightTime7 = returnTimes[0];
    const departureTime7 = this.getDepartureTime(returnDate , flightTime7);

    const flightTime11 = returnTimes[1];
    const departureTime11 = this.getDepartureTime(returnDate , flightTime11);

    const flightTime15 = returnTimes[2];
    const departureTime15 = this.getDepartureTime(returnDate , flightTime15);

    const flightTime19 = returnTimes[3];
    const departureTime19 = this.getDepartureTime(returnDate , flightTime19);

    const flightTime23 = returnTimes[4];
    const departureTime23 = this.getDepartureTime(returnDate , flightTime23);

    let flightObj = [
      this.createFlightObj(this.getFlightId(fromLocation, 1, toLocation, returnDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime7, flightTime7, flightLength),
        this.getDepartureTime(returnDate , flightTime7), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(returnDate , flightTime7))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 2, toLocation, returnDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime11, flightTime11, flightLength),
        this.getDepartureTime(returnDate , flightTime11), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(returnDate , flightTime11))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 3, toLocation, returnDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime15, flightTime15, flightLength),
        this.getDepartureTime(returnDate, flightTime15), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime15))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 4, toLocation, returnDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime19, flightTime19, flightLength),
        this.getDepartureTime(returnDate, flightTime19), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime19))
      ),
      this.createFlightObj(this.getFlightId(fromLocation, 5, toLocation, returnDate),
        toLocation,
        fromLocation,
        this.getArrivalTime(departureTime23, flightTime23, flightLength),
        this.getDepartureTime(returnDate , flightTime23), flightLength,
        this.calculateFlightPrice(this.getDepartureTime(returnDate ,flightTime23))
      ) ];

    return flightObj;
  }

  private createFlightObj(flightId:string, toLocation:string, fromLocation:string, arrivalTime:Date, departureTime:Date, flightTimeLength:number, flightPrice:number):object {
      var x = {
      "flightId" : flightId,
      "arrivalLocation" : toLocation,
      "departureLocation" : fromLocation,
      "arrivalTime" : arrivalTime,
      "departureTime" : departureTime,
      "flightTimeLength" : flightTimeLength,
      "flightPrice" : flightPrice
      };
    return x;
  }

  private getDepartureTime(date:number, hours:number):Date {
    let dateOut = new Date(date);
    dateOut.setHours(hours, 0, 0);
    return dateOut;
  }

  private getArrivalTime(departureDate:Date, departHour:number, flightLength:number):Date {
    if (!departureDate) { return; }

    let date = departureDate;
    date.setHours(date.getHours() + flightLength);
    return date;
  }

  private getFlightId(fromLocation:string, flightNumber:number, toLocation:string, departureDate: Date) {
    let flightId = fromLocation.substring(0,2).toUpperCase() + '-' + flightNumber + '-' + toLocation.substring(0,2).toUpperCase() + '-' + + departureDate.getMonth() + departureDate.getDate() + departureDate.getFullYear().toString().substring(2,4);

    return flightId;
  }

  private calculateFlightPrice(departureDate: Date):number {
    let price = 100;

    //Calculate price based on departure day of week
    if ( departureDate.getDay() <= 2 ) {
      price = price * 1.1;
    } else if ( departureDate.getDay() >= 3 && departureDate.getDay() >= 5 ) {
      price = price * 1.5
    } else {
      price = price * 1.25;
    }

    //Calculate price based on departure arrivalTimes
    if ( departureDate.getHours() <= 8  ) {
      price = price * 0.8;
    } else if ( departureDate.getHours() <= 9 && departureDate.getHours() <= 14 ) {
      price = price * 1.4;
    } else if ( departureDate.getHours() <= 15 && departureDate.getHours() <= 23 ) {
      price = price * 1.15;
    }

    //round price to 2 decimals
    price = +price.toFixed(2);

    return price;
  }

}
