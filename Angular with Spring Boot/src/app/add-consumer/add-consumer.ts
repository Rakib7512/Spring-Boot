import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../service/consumer.service';

@Component({
  selector: 'app-add-consumer',
  standalone: false,
  templateUrl: './add-consumer.html',
  styleUrl: './add-consumer.css'
})
export class AddConsumer {

  userForm!:FormGroup;
  consumerForm!:FormGroup;
  photoFile!:File;
  message: string='';


  constructor(private fb:FormBuilder, private consumerService:ConsumerService){
    this.consumerForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]

    })
     this.consumerForm = this.fb.group({
      gender: ['', Validators.required],
      nid: ['', Validators.required]
    });
  }

}
