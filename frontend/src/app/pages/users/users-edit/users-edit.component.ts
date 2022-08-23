import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/iuser';
import { TypicodeService } from '../../../services/typicode.service';
@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup;
  userData: IUser;

  constructor(private typicodeService: TypicodeService, private fb: FormBuilder, private router: Router) {
    this.userData = { id: 0, name: "", username: "", email: "", website: "", checked: false };
    this.userForm = this.fb.group({
      id: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      checked: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const tempVar = history.state.userSeleced;
    if (tempVar == undefined) {
      this.router.navigate(['/users']);
    }
    this.userData = tempVar;
    this.userForm.patchValue({
      id: this.userData.id,
      name: this.userData.name,
      username: this.userData.username,
      email: this.userData.email,
      website: this.userData.website,
      checked: this.userData.checked ? this.userData.checked : false,
    })
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.typicodeService.updateUser(form.value).pipe().subscribe({
        complete: () => {
          alert("User updated successfully");
          this.router.navigateByUrl('/users');
        },
        error: (e) => {
          alert("Error updating the user, sorry :(");
          console.error(e);
        },
      });

    }
    else {
      alert("Invalid form");
    }

  }
}
