import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'person-app';
  data: FormGroup;
  deleteData: FormGroup;
  personData: FormGroup;
  favArray = [{ item: "Cricket" }, { item: "Football" }, { item: "Tennis" }];
  url: string;
  message1: string;
  message2: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.createPayload();
    this.createAddPayload();
    this.createDeletePayload();
    this.displayValues();
    this.url = 'http://localhost:8080/project/rest/person';
  }

  createPayload() {
    this.data = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      age: new FormControl(''),
      favourite_color: new FormControl(''),
      hobby: new FormArray([
        new FormControl(),
        new FormControl(),
        new FormControl()
      ])
    });
  }

  createAddPayload() {
    this.personData = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      age: new FormControl(''),
      favourite_color: new FormControl(''),
      hobby: this.fb.array([])
    });
  }

  createDeletePayload() {
    this.deleteData = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl('')
    });
  }

  addPersonDetails() {
    console.log(this.personData);
    this.http.post(this.url, this.personData.value).subscribe(data => {
      this.message1 = data.toString();
    });

    // this.message1 = 'Details added successfully';
  }

  updatePersonDetails() {
    console.log(this.personData);
    const updatedUrl = this.url + "/" + this.personData.get('first_name').value + "/" + this.personData.get('last_name').value;
    this.http.put(updatedUrl, this.personData.value).subscribe(data => {
      this.message1 = data.toString();
    });
    // this.message1 = 'Details updated successfully';
  }

  deletePersonDetails() {
    console.log(this.deleteData);
    const updatedUrl = this.url + "/" + this.deleteData.get('first_name').value + "/" + this.deleteData.get('last_name').value;
    this.http.delete(updatedUrl, this.deleteData.value).subscribe(data => {
      this.message2 = data.toString();
    });
    // this.message2 = 'Details deleted successfully.';
  }

  changeAction(data, event) {
    const favouritesArray = <FormArray>this.personData.controls.hobby;

    if (event) {
      favouritesArray.push(new FormControl(data));
    }
  }

  displayValues() {
    /*const personDetails = {
      first_name: 'Abuzar',
      last_name: 'Siddiqui',
      age: 30,
      favourite_color: 'Blue',
      hobby: ['Cricket', 'Basketball']
    };*/

    this.http.get(this.url).subscribe((response: any) => {
      this.data.patchValue(response);
    });

    // this.data.patchValue(personDetails);
  }
}
