import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./main/home.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { TodoButtonDeleteAllComponent } from "src/app/shared/components/todo-button-delete-all/todo-button-delete-all.component";
import { TodoInputAddItensComponent } from "src/app/shared/components/todo-input-add-itens/todo-input-add-itens.component";
import { TodoListComponent } from "src/app/shared/components/todo-list/todo-list.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      HomeComponent,
      HeaderComponent,
      TodoButtonDeleteAllComponent,
      TodoInputAddItensComponent,
      TodoListComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule
    ],
    providers: []
})
export class HomeModule { }
