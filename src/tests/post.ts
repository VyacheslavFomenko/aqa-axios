export interface Post {
    userId: string;
    id: number;
    title: string;
    body: string;
}

export interface NewPost {
    title: string;
    body: string;
    userId: number;
}