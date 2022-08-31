import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-upload-albums',
  templateUrl: './upload-albums.component.html',
  styleUrls: ['./upload-albums.component.css']
})
export class UploadAlbumsComponent implements OnInit {
  albumForm: FormGroup;

  constructor(private unicornRewardsApiService: UnicornRewardsApiService, private fb: FormBuilder, private router: Router) {
    this.albumForm = this.fb.group({
      file: [null, [
        Validators.required,
        Validators.minLength(1),
        RxwebValidators.fileSize({ maxSize: 10000000 }),
        RxwebValidators.extension({ extensions: ["json"] })
      ]],
    });
  }

  ngOnInit(): void {
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.unicornRewardsApiService.addAlbums(form).pipe().subscribe({
        complete: () => {
          alert("Album(s) added successfully");
          this.router.navigateByUrl('/albums');
        },
        error: (e) => {
          alert("Error adding album(s), sorry :(");
          console.error(e);
        },
      });
    }
    else {
      alert("Invalid form");
    }
  }
}
