
export default class ImageAntdResponse {
    private readonly name: string;
    private readonly status: string;
    private readonly url: string;
    private readonly thumbUrl: string;

    constructor(name: string, status: string, url: string, thumbUrl: string) {
        this.name = name;
        this.status = status;
        this.url = url;
        this.thumbUrl = thumbUrl;
    }
}