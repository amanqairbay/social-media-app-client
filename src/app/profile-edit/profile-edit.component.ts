import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICity } from '../_models/city';
import { IGender } from '../_models/gender';
import { IRegion } from '../_models/region';
import { IStatus } from '../_models/status';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user?: User;
  region?: IRegion;
  city?: ICity;
  gender?: IGender;
  status?: IStatus;
  genders?: IGender[];
  statuses: IStatus[] = [];
  regions: IRegion[] = [];
  cities?: ICity[] = [];

  userId?: number;

  @ViewChild('editForm', {static: true}) editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  selectedCity?: number;
  selectedRegion?: number;
  selectedGender?: number;
  selectedStatus?: number;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe( data => this.user = data['user'] );
    this.selectedCity = this.user?.cityId;
    this.selectedRegion = this.user?.regionId;
    this.selectedGender = this.user?.genderId;
    this.selectedStatus = this.user?.statusId;
    this.getRegions();
    this.getCities();
    this.getGenders();
    this.getStatuses();
  }

  getRegions() {
    this.userService.getRegions().subscribe(response => {
      this.regions = [...response];
    }, error => {
      console.log(error);
    })
  }

  getCities() {
    this.userService.getCities().subscribe(response => {
      this.cities = [...response];
    }, error => {
      console.log(error);
    })
  }

  getCitiesByRegionId(regionId: number) {
    this.cities = [];
    this.userService.getCities().subscribe(response => {
      this.cities = [...response].filter((x) => x.regionId === regionId);
      this.selectedCity = this.cities[0]['id'];
      if (this.user != undefined) {
        this.user.cityId = this.cities[0]['id'];
      }
    }, error => {
      console.log(error);
    })
  }

  onRegionSelected(regionId: number) {
    if (regionId) {
      this.userService.getRegion(regionId).subscribe(
        data => {
          this.region = data;
          this.getCitiesByRegionId(this.region.id);
        }
      );
    } else {
      this.problem();
    }
  }

  onCitySelected(cityId: number) {
    if (cityId) {
      this.userService.getCity(cityId).subscribe(
        data => {
          this.city = data;
          if (this.user != undefined) {
            this.user.regionId = this.city.regionId;
          }
          //this.getRegion(this.city.regionId);
          console.log("selectedRegion: " + this.selectedRegion + " : ");
          console.log("user region: " + this.user?.regionId + " : " + this.user?.region);
        }
      );
    } else {
      this.problem();
    }
  }

  getGenders() {
    this.userService.getGenders().subscribe(response => {
      this.genders = [...response];
    }, error => {
      console.log(error);
    })
  }

  getStatuses() {
    this.userService.getStatuses().subscribe(response => {
      this.statuses = [...response];
    }, error => {
      console.log(error);
    })
  }

  getRegion(regionId: number) {
    if (regionId) {
      this.userService.getRegion(regionId).subscribe(
        data => {
          this.selectedRegion = data.id;
          if (this.user != undefined) {
            this.user.regionId = this.selectedRegion;
          }
        }
      );
    } else {
      this.problem();
    }
  }

  getCity(cityId: number) {
    if (cityId) {
      this.userService.getCity(cityId).subscribe(
        data => {
          this.city = data;
          this.selectedCity = this.city.id;
        }
      );
    } else {
      this.problem();
    }
  }

  getGender(genderId: number) {
    if (genderId) {
      this.userService.getGender(genderId).subscribe(
        data => {
          this.selectedGender = data.id;
        }
      );
    } else {
      this.problem();
    }
  }

  getStatus(statusId: number) {
    if (statusId) {
      this.userService.getStatus(statusId).subscribe(
        data => {
          this.selectedStatus = data.id;
        }
      );
    } else {
      this.problem();
    }
  }

  problem() {
    this.regions = [];
    this.cities = [];
    this.genders = [];
    this.statuses = [];
    this.alertify.message('Problem retrieving data');
  }

  currentUserId() : number {
    var id = localStorage.getItem('userId');
    this.userId =+id!;

    return this.userId;
  }
  
  updateUser() {
    this.userService.updateUser(this.currentUserId(), this.user!).subscribe(next => {
      this.alertify.message('Profile updated successfully.');
      //this.editForm?.reset(this.user);
      this.editForm?.reset({
        'name': this.user?.name,
        'surname': this.user?.surname,
        'birthday': this.user?.dateOfBirth,
        'gender': this.user?.genderId,
        'status': this.user?.statusId,
        'region': this.user?.regionId,
        'city': this.user?.cityId,
        'email': this.user?.email,
        'interests': this.user?.interests
      });
      //this.resetPage();
    }, error => {
      this.alertify.message(error);
      console.log("update: " + error)
      console.log("user: " + this.user?.name)
      console.log("nameid: " + this.authService.decodedToken.nameid)
    });
  }

  private resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['./'], { 
      relativeTo: this.route,
      queryParamsHandling: "merge"
    });
   }
}
