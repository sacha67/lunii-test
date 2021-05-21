import {ShortUrlEntity} from '../models/short-url.entity';

export class ShortUrlInMemoryRepository {

	private shortUrls: ShortUrlEntity[] = [];

	findAll(): ShortUrlEntity[] {
		return this.shortUrls;
	}

	create(shortUrl: ShortUrlEntity): ShortUrlEntity {
		this.shortUrls.push(shortUrl);
		return shortUrl;
	}

	findByShortUrl(shortUrl: string): ShortUrlEntity | undefined {
		return this.shortUrls.find((url: ShortUrlEntity) => url.shortUrl === shortUrl);
	}

	update(shortUrl: string, shortUrlUpdate: ShortUrlEntity) {
		const shortUrlEntity: ShortUrlEntity | undefined = this.findByShortUrl(shortUrl);
		if (!shortUrlEntity) {
			throw Error('Short url not found.')
		}
		shortUrlEntity.shortUrl = shortUrlUpdate.shortUrl;
		shortUrlEntity.nbClicks = shortUrlUpdate.nbClicks;
		shortUrlEntity.originalUrl = shortUrlUpdate.originalUrl;

		return shortUrlEntity;
	}
}
