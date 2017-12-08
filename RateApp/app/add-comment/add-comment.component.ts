import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../shared/model/user";
import { Comment } from "../shared/model/comment";
import { CommentService } from "../shared/services/comment.service";

@Component({
    selector: "AddComment",
    moduleId: module.id,
    templateUrl: "./add-comment.component.html",
    styleUrls: ["./add-comment.component.css"],
    providers: [CommentService],
})
export class AddCommentComponent implements OnInit {

    // Component Variables
    private starSelected : number = 0;
    private commentId : string;
    private comment : string;
    private productId : string;
    private isLoading : boolean;
    private errorMsg : string;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private commentService: CommentService) {
    }

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
        
        this.isLoading = true;
        this.productId = this.route.snapshot.params["id"];
        this.commentService.getComment(this.productId).subscribe(result => {
            if(result.success) {
                if(result.exists) {
                    this.commentId = result.comment.id;
                    this.starSelected = result.comment.stars;
                    this.comment = result.comment.text;
                } else {
                    this.starSelected = 0;
                    this.comment = "";
                }
            } else {
                this.errorMsg = "Error.";
                console.log('failed to load comment');
            }
            this.isLoading = false;
        });
	}

    selectStar(value : number) : void {
        this.starSelected = value;
    }

    saveComment() : void {
        let comment: Comment;
        if(this.starSelected == 0) {
            alert('Seleccione la cantidad de estrellas');
            return;
        }
        if(this.comment.length < 1) {
            alert('No ha ingresado ningun comentario');
            return;
        }
        this.commentService.saveComment(this.productId, this.commentId, this.comment, this.starSelected)
            .subscribe(
                (result) => {
					if(result.success) {
                        this.router.backToPreviousPage();
                    } else {
                        alert('Error while saving comment, please try again');
                    }
				},
				(error) => {
					alert('Unexpected error, please try again');
					console.dir(error);
				}
            );
    }

    goBack() {
        this.router.backToPreviousPage();
    }


    /****************
     * Side Drawer methods
     ***************/
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
