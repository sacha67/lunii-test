export class ShortUrlEntity {
	originalUrl: string;
	shortUrl: string;
	nbClicks: number;


	constructor(originalUrl: string, shortUrl: string) {
		this.originalUrl = originalUrl;
		this.shortUrl = shortUrl;
		this.nbClicks = 0;
	}


}
