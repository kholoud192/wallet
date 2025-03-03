import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  user: User = {
    first_name: '',
    last_name: '',
    middle_name: '',
    other_names: '',
    date_of_birth: '',
    place_of_birth: '',
    current_address: '',
    phone_number: '',
    email: '',
    has_investment_license: false,
    investment_license_number: '',
    usdt_address: '',
    secret_phrase: '',
    wallet_type: '',
    image: null as any,
  };

  constructor(private userService: UserService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.image = file;
    }
  }
  

  submitForm(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    
    Object.entries(this.user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
        // console.log(' FormData :', formData);

      }
    });
  
    const formObject: any = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // console.log('Form Object:', formObject); 

  
    this.userService.registerUser(formData).subscribe(
      response => {
        console.log('Server Response:', response);
        alert('تم التسجيل بنجاح!');
      },
      error => {
        console.error(' Server Error:', error);
        alert('حدث خطأ أثناء التسجيل.');
      }
    );
  }
  
  
}
