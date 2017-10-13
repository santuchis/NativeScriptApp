import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
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
    private comment : string;
    private productId : string;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private commentService: CommentService) {}

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code
        
        this.productId = this.route.snapshot.params["id"];
	}

    selectStar(value : number) : void {
        this.starSelected = value;
    }

    saveComment() : void {
        let comment: Comment;
        this.commentService.saveComment(this.productId, this.comment, this.starSelected)
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

    /**
     * workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
     */
	onDrawerRefresh(): void {
		this.drawerComponent.sideDrawer.closeDrawer();
	}
}
