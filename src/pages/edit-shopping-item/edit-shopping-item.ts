import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ToastService } from '../../services/toast/toast.service';


@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  item: Item;
  loader = this.loadingCtrl.create();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private shopping: ShoppingListService, 
    private toast: ToastService,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillLoad() {
    console.log(this.navParams.get('item'));
    this.item = this.navParams.get('item');
  }

  saveItem(item: Item) {
    this.loader.present();     
    this.shopping.editItem(item)
      .then(() => {
        this.loader.dismiss();
        this.toast.show(`${item.name} saved!`);
        this.navCtrl.setRoot('HomePage')
      });
  }

  removeItem(item: Item) {
    this.shopping.removeItem(item)
      .then(() => 
        this.toast.show(`${item.name} Deleted!`));
        this.navCtrl.setRoot('HomePage')
  }
}
