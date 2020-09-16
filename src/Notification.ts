export class Response {
    public data: Notification[];

    constructor(data: Notification[]) {
        this.data = data;
    }
}

export class Notification {
    public id: string;
    public unread: boolean;
    public reason: string;
    public subject: Subject

    constructor(id: string, unread:boolean, reason:string, subject: Subject) {
        this.id = id;
        this.unread = unread;
        this.reason = reason;
        this.subject = subject;
    }
}

export class Subject {
    public title: string;
    public url: string;
    public latestCommentUrl: string;
    public type: string;

    constructor(title: string, url: string, latestCommentUrl: string, type:string){
        this.title = title;
        this.url = url;
        this.latestCommentUrl = latestCommentUrl;
        this.type = type;
    }
}