import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Booking } from '../commonResource/booking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  authAdmin(data:any){
    return this.http.post(`${this.baseUrl}/authAdmin`, data, this.createHeader('application/json')).toPromise()
  }
  getUser(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllUsers/${id}`);
  }
  createUser(data:any){
    return this.http.post(`${this.baseUrl}/addUser`, data, this.createHeader('application/json')).toPromise()
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllUsers`);
  }
  
  resetPassword(data:any){
    return this.http.put(`${this.baseUrl}/updatePassword/${data.id}`, data, this.createHeader('application/json')).toPromise()
  }
  createBooking(data:any){
    return this.http.post(`${this.baseUrl}/addBooking `, data, this.createHeader('application/json')).toPromise()
  }
  addBooking(data:any){
    return this.http.post(`${this.baseUrl}/addBooking`, data, this.createHeader('application/json')).toPromise()
  }
  private createHeader(contentType: string): any {
    return { headers: new HttpHeaders({ 'Content-Type': contentType }), responseType: 'text' };
  }

  addMoney(data:any){
    return this.http.put(`${this.baseUrl}/updateWallet/${data.id}`, data, this.createHeader('application/json')).toPromise()
  }
  cancelUpdateRoom(data:any){
    return this.http.put(`${this.baseUrl}/updateRoom/${data.id}`, data, this.createHeader('application/json')).toPromise()
  }
  cancelUpdateBooking(data:any){
    return this.http.put(`${this.baseUrl}/updateBookings/${data.id}`, data, this.createHeader('application/json')).toPromise()
  }
  getBookingById(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllBookings/${id}`);
  }
  updateWallet(data:any){
    return this.http.put(`${this.baseUrl}/updateWallet/${data.id}`, data, this.createHeader('application/json')).toPromise()
  }
  public getOtp(otpData) {
    return this.http.post("https://j9186hxap5.execute-api.ap-south-1.amazonaws.com/prod/pysendsms",otpData).toPromise()
  }
  public checkAadhar(id: String): Observable<any> {
    return this.http.get(`https://r5pevav13l.execute-api.ap-south-1.amazonaws.com/temp/aadhar-verify?aadharNum=${id}`);
  }
  public checkAvailability(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + '/findAllRooms'
    );
  }
  public getBookings(): Observable<any> { 
    return this.http.get<any>(
      this.baseUrl + '/findAllBookings'
    );
  }
}