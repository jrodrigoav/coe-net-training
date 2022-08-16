import { Component, OnInit } from '@angular/core';
import { IQuestion, IQuestionsResponse } from 'src/app/interfaces/iquestions';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent implements OnInit {
  questionResponse!: IQuestionsResponse;
  questionsList: IQuestion[] = []
  answersList!: string[];
  constructor(private _unicornRewardsService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(){
    const getQuestions = this._unicornRewardsService.getQuestionsList(true);
    getQuestions.subscribe((response) => {
      this.questionResponse = response;
      this.questionsList = response.responseResult;
    });
  }

  getSuggestedAnsw(id: number){
    const getAnswers$ = this._unicornRewardsService.getSuggestedAnswers(id);
    getAnswers$.subscribe((response) =>{
      this.answersList = response;
      console.log(JSON.stringify(response));
    })
  }
}
