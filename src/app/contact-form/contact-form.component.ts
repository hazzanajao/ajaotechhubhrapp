import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      degree: ['', Validators.required],
      profession: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      const file = this.contactForm.get('file')?.value;
      const filepath = `uploads/${file.name}`;
      const fileRef = this.storage.ref(filepath);
      const uploadTask = this.storage.upload(filepath, file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded', url);
            const metadata = {
              name: file.name,
              url: url,
            };
            this.afs.collection('uploads').add(metadata);
          });
        })
      ).subscribe(
        (snapshot) => {
          // Handle snapshot if needed
        },
        (error) => {
          console.error('Error Uploading File', error);
        }
      );
    }
  }
}
