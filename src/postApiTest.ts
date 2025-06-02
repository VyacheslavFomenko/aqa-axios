import axios, {AxiosResponse} from "axios";
import {describe} from "node:test";
import {NewPost, Post} from "./tests/post";
import {User} from "./tests/user";
import {NewComment} from "./tests/comment";

const BASE_URL = process.env.BASE_URL || "https://jsonplaceholder.typicode.com";
describe("JSONPlaseholder API tests", () => {
    it("GET /posts: should return array of posts", async () => {
        const response: AxiosResponse<Post[]> = await axios.get(`${BASE_URL}/api/posts`);
        expect(response.status).toBe(200);

        const posts = response.data;
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);

        const firstPost = posts[0];
        expect(firstPost).toHaveProperty("userId");
        expect(firstPost).toHaveProperty("id");
        expect(firstPost).toHaveProperty("title");
        expect(firstPost).toHaveProperty("body");
    });

    it("GET /posts/:id should return post by id", async () => {
        const response: AxiosResponse<Post> = await axios.get(`${BASE_URL}/post/1`);
        expect(response.status).toBe(200);

        const post = response.data;
        expect(post.id).toBe(1);
        expect(post).toHaveProperty("userId");
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("body");
    });

    it("GET /users should return array of users", async () => {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/api/users`);
        expect(response.status).toBe(200);

        const users = response.data;
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);

        const firstUser = users[0];
        expect(firstUser).toHaveProperty("id");
        expect(firstUser).toHaveProperty("name");
        expect(firstUser).toHaveProperty("username");
        expect(firstUser).toHaveProperty("email");
        expect(firstUser).toHaveProperty("address");
    });

    it("POST /posts should create post", async () => {
        const newPost: NewPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        const response: AxiosResponse<NewPost> = await axios.post(`${BASE_URL}/api/post`,
            newPost,
            {
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            });
        expect(response.status).toBe(201);

        const postCreated = response.data;
        expect(postCreated.title).toBe(newPost.title);
        expect(postCreated.body).toBe(newPost.body);
        expect(postCreated.userId).toBe(newPost.userId);
    });

    it("POST /comment should create new comment", async () => {
        const newComment: NewComment = {
            postId: 1,
            name: "Test Name",
            email: "test@example.com",
            body: "This is a test comment",
        }

        const response: AxiosResponse<NewComment> = await axios.post(`${BASE_URL}/api/comment`,
            newComment,
            {
                headers: {'Content-Type': 'application/json; charset=UTF-8'}

            });
        expect(response.status).toBe(201);

        const created = response.data;
        expect(created.postId).toBe(newComment.postId);
        expect(created.name).toBe(newComment.name);
        expect(created.email).toBe(newComment.email);
        expect(created.body).toBe(newComment.body);
    });
});
