import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { IQuestion } from 'src/app/interfaces/iquestions';
import { IComboTab } from 'src/app/interfaces/itabs';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {
  createdId!: number;
  comboValues!: IComboTab[];
  constructor(private _unicornRewardsService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    this.getTabsTextValue();
  }

  createQuestionForm = new FormGroup({
    "type": new FormControl('Select an option', [Validators.required]),
    "label": new FormControl('', [Validators.required]),
    "sugestedAnswers": new FormControl('', []),
    "tabId": new FormControl('Select an option', [Validators.required])
  })

  getTabsTextValue() {
    const constGetTabs$ = this._unicornRewardsService.getTabsList();
    var tabsRecords = constGetTabs$.pipe(map((tabs) => tabs.responseResult.map(tab => {
      return {
        "id": tab.id,
        "name": tab.name,
      }
    })
    ))

    tabsRecords.subscribe((response) => {
      this.comboValues = response;
      console.log(JSON.stringify(response));
    });
  }



  createQuestion(question: IQuestion, isValid: boolean | null) {
    if (isValid) {
      const createQuestion$ = this._unicornRewardsService.createQuestion(question);
      createQuestion$.subscribe((response) => {
        this.createdId = response;
        alert("Question created with Id: " + this.createdId);
      })
    }
  }
}
