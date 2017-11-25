import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlatformLocation } from '@angular/common';
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

import { action, confirm } from "ui/dialogs";

import { Config } from "../shared/config";
import { Comment } from "../shared/model/comment";
import { CommentService } from "../shared/services/comment.service";
import { ProductService } from "../shared/services/product.service";

@Component({
    selector: "Comments",
    moduleId: module.id,
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.css"],
    providers: [CommentService,ProductService]
})
export class CommentsComponent implements OnInit {

    // Component Variables
    private comments: any[];
    private stars : string[] = ["Todas", "1 Estrella", "2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas"];
    private picked: string = "Todas";
    private productId : string;
    private rate : number;
    private commentsCount : number;
    private isLoading : boolean = true;
    private currentPage : number = 0;
    private hasNext : boolean = false;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private commentService: CommentService, private productService: ProductService, private location : PlatformLocation) {}

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.productId = this.route.snapshot.params["id"];
        this.rate = +this.route.snapshot.params["rate"];
        this.commentsCount = +this.route.snapshot.params["commentsCount"];

        this.commentService.getComments(this.productId, this.currentPage).subscribe(result => {
            if(result.success) {
                this.comments = this.mergeProductAndLikes(result.comments.content, result.comments.likes);
                this.hasNext = !result.comments.last;
            } else {
                console.log('failed while loading comments');
            }
            this.isLoading = false;
        });

        this.location.onPopState(() => {
            this.productService.getProductById(this.productId).subscribe(result => {
                let p  = result["product"];
                this.rate = p.rate;
                this.commentsCount = p.commentsCount;
            });

            this.commentService.getComments(this.productId, 0).subscribe(result => {
                if(result.success) {
                    let tmp = this.mergeProductAndLikes(result.comments.content, result.comments.likes);
                    for(let i = 0; i < this.comments.length; i++) {
                        if(!this.commentExists(this.comments[i].id, tmp)) {
                            tmp = tmp.concat(this.comments[i]);
                        }
                    }
                    this.comments = tmp;
                } else {
                    console.log('failed while loading comments');
                }
                this.isLoading = false;
            });
        });

    }

    mergeProductAndLikes(products: any, likes: any) : any {
        let i = 0;
        for(i = 0; i < products.length; i++) {
            products[i].userLike = likes[i];
        }
        return products;
    }

    loadNextCommentsPage(): void {
        this.currentPage++;
        this.isLoading = true;
        this.commentService.getComments(this.productId, this.currentPage).subscribe(result => {
            if(result.success) {
                let tmp = this.mergeProductAndLikes(result.comments.content, result.comments.likes);
                for(let i = 0; i < tmp.length; i++) {
                    if(!this.commentExists(tmp[i].id, this.comments)) {
                        this.comments = this.comments.concat(tmp[i]);
                    }
                }
                this.hasNext = !result.comments.last;
            } else {
                console.log('failed while loading comments');
            }
            
            this.isLoading = false;
        });
    }

    commentExists(id: string, list: any[]): boolean {
        for(let i = 0; i < list.length; i++) {
            if(list[i].id == id) {
                return true;
            }
        }
        return false;
    }

    getDate(millis: number): string {
        let date = new Date(millis);
        
        return date.toLocaleDateString();
    }

    goToAddComment(): void {
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            this.router.navigate(["/add-comment", this.productId], {
                transition: {name: "slide"}
            });
        }
    }

    showStarsOptions() : void {
        let options = {
            title: "Filtro por estrellas",
            message: "Selecciona una option",
            cancelButtonText: "Cancelar",
            actions: this.stars
        };
        
        action(options).then((result) => {
            if(result !== options.cancelButtonText && this.picked !== result) {
                this.picked = result;
                console.log(result);
            }
        });
    }

    showLoginDialog(): void {
        let options = {
            title: "Inicia sesión.",
            message: "Quieres ir al formulario de inicio de sesión?",
            okButtonText: "Si",
            cancelButtonText: "No"
        }
        confirm(options).then((result: boolean) => {
            if(result) {
                this.router.navigate(["/login", "product", this.productId], {
                    transition: {name: "fade"}
                });
            }
        });
    }

    like(comment: any): void {
        if(comment.savingLike) { return; }
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            comment.savingLike = true;
            if(comment.userLike == 1) {
                this.commentService.unlikeComment(comment.id).subscribe(result => {
                    if(result.success) {
                        comment.likesCount--;
                        comment.userLike = 0;
                        comment.savingLike = false;
                    } else {
                        alert("Unlike was not saved, try again.");
                    }
                });
            } else {
                this.commentService.likeComment(comment.id).subscribe(result => {
                    if(result.success) {
                        comment.likesCount++;
                        if(comment.userLike < 0) { comment.dislikesCount--; }
                        comment.userLike = 1;
                        comment.savingLike = false;
                    } else {
                        alert("Like was not saved, try again.");
                    }
                });
            }
        }
    }

    dislike(comment: any): void {
        if(comment.savingLike) { return; }
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            comment.savingLike = true;
            if(comment.userLike == -1) {
                this.commentService.unlikeComment(comment.id).subscribe(result => {
                    if(result.success) {
                        comment.dislikesCount--;
                        comment.userLike = 0;
                        comment.savingLike = false;
                    } else {
                        alert("Unlike was not saved, try again.");
                    }
                });
            } else {
                this.commentService.dislikeComment(comment.id).subscribe(result => {
                    if(result.success) {
                        comment.dislikesCount++;
                        if(comment.userLike > 0) { comment.likesCount--; }
                        comment.userLike = -1;
                        comment.savingLike = false;
                    } else {
                        alert("Like was not saved, try again.");
                    }
                });
            }
        }
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
