import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-subscriber-expert-detail',
  templateUrl: './subscriber-expert-detail.component.html',
  styleUrls: ['./subscriber-expert-detail.component.css']
})
export class SubscriberExpertDetailComponent implements OnInit {

  expert:any

  constructor(private route:ActivatedRoute,  private userService: UserService) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.userService.getExpert(id).subscribe((res:any)=>{
      console.log(res)
      this.expert = res
      //console.log(res)
      //
    })
  }

}
