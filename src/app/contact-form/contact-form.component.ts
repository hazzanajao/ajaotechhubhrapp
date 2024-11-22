import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  contactForm : FormGroup;

  constructor (
    private fb: FormBuilder,
    private storage:AngularFireStorage,
    private http: HttpClient,
    private afs:AngularFirestore
               ){}

  ngOnInit() : void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      degree: ['', Validators.required],
      profession: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.contactForm.valid){
      //  handling file upload
      const file = this.contactForm.get('file')?.value;
      const filepath =`uploads/${file.name}`;
      this.storage.ref(filepath).put(file).subscribe(
        (snapshot)=> {
          console.log('File uploaded',snapshot.downloadUrl$)
      // Saving File
        const url = snapshot.downloadUrl$;
        const metadata = {
          name:file.name,
          url:url
        };
        this.afs.collection('uploads').add(metadata);
        },
        (error)=>{
          console.error('Error Uploading File', error)
        }

      );
    }
  }

}
