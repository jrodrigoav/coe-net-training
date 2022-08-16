import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { IQuestion } from 'src/app/interfaces/iquestions';
import { IQuestionsByTabResponse, ITabJoined } from 'src/app/interfaces/iquestionstabs';
// import { IQuestionsByTabResponse, ITabsResponse } from 'src/app/interfaces/itabs';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-tabs-home',
  templateUrl: './tabs-home.component.html',
  styleUrls: ['./tabs-home.component.css']
})
export class TabsHomeComponent implements OnInit {
  //tabsResponse!: ITabsResponse;
  listTabsQuestionsResponse!: IQuestionsByTabResponse;
  listTabs: ITabJoined[] = [];
  listQuestions: IQuestion[] = [];
  listOptions: string[] = ["Not asked", "Does not know the answer", "Basic knnowledge", "Some experience", "Experienced in the concept"];
  myForm!: FormGroup;
  constructor(private _unicornRewardsService: UnicornRewardsApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.getTabs();
    this.fillData();

    this.myForm = this.fb.group({
      //dynamicField: []
    })
  }

  fillData() {
    const TabList$ = this._unicornRewardsService.getTabsList();
    const QuestionList$ = this._unicornRewardsService.getQuestionsList(true);
    var resultJoin = forkJoin(
      [
        // this._unicornRewardsService.getQuestionsList(true),
        // this._unicornRewardsService.getTabsList()
        TabList$,
        QuestionList$
      ])
      .pipe(map(([tabs, questions]) => tabs.responseResult.map(tab => {
        return {
          "id": tab.id,
          "name": tab.name,
          "label": tab.label,
          // "sugestedAnswers": question.sugestedAnswers,
          "questionsTab": questions.responseResult.filter(x => x.tabId == tab.id),
        }
      })
      ))

    resultJoin.subscribe(
      (response) => {
        this.listTabsQuestionsResponse = response;
        this.listTabs = this.listTabsQuestionsResponse;
        // this.listQuestions = this.listTabs[0].questionsTab;
        // console.log(response);
        // console.log(JSON.stringify(this.listTabsQuestionsResponse));
        // console.log('TABS');
        // console.log(this.listTabs);

        this.listTabs.forEach(tab => {
          console.log(tab.label);
          tab.questionsTab.forEach(question => {
            this.myForm.addControl(question.id.toString(), this.fb.control(null))
            //this.myForm.addControl(question.id.toString(), new FormControl(null))
            if(question.sugestedAnswers)
            {
              question.answers = question.sugestedAnswers.split('|');
            }
          })
        });
      }
    );

  }
}
