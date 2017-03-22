class MessageCommentController implements ng.IController {
    dismiss: any;
    resolve: any;
    comment: any;
    multipleSelect: any;
    percent: any;
    typeAddShow: any;
    from: string;
    to: string;
    constructor() {
        console.log('comments ');
    }

    cancel() {
        this.resolve.callback(this.resolve.x, this.comment, this.resolve.parent, this.resolve.y, this.multipleSelect,
            this.percent, this.from, this.to);
        this.dismiss({$value: 'dismiss'});
    }

    typeAdd(type:string) {
        this.typeAddShow = type;
    }
}

const MessageCommentComponent = {
    bindings : {
    resolve: '<',
    close: '&',
    dismiss: '&'
    },
    template: require('./message-comment.html'),
    controller: MessageCommentController
};

export default MessageCommentComponent;
