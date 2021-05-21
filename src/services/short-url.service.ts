import {ShortUrlCreateDto} from '../dtos/short-url-create.dto';
import {ShortUrlInMemoryRepository} from '../repositories/short-url.in-memory.repository';
import {ShortUrlEntity} from '../models/short-url.entity';
import * as randomstring from 'randomstring';
import validator from 'validator';
import isURL = validator.isURL;

const shortUrlRepository: ShortUrlInMemoryRepository = new ShortUrlInMemoryRepository();

export class ShortUrlService {

	private isValidUrl(url: string): boolean {
		return isURL(url);
	}


	createShortUrl(shortUrlCreateDto: ShortUrlCreateDto): ShortUrlEntity {
		if (!shortUrlCreateDto?.url) {
			throw Error('Missing url.');
		}
		if (!isURL(shortUrlCreateDto.url)) {
			throw Error('Invalid url.');
		}

		const randomString: string = randomstring.generate({length: 6});
		const shortUrlEntity: ShortUrlEntity = new ShortUrlEntity(shortUrlCreateDto.url, randomString);
		return shortUrlRepository.create(shortUrlEntity);
	}

	findAllUrls(): ShortUrlEntity[] {
		return shortUrlRepository.findAll();
	}

	findByShortUrl(url: string): ShortUrlEntity | undefined {
		return shortUrlRepository.findByShortUrl(url);
	}

	findOriginalUrl(shortUrl: string): string | undefined {
		const shortUrlEntity: ShortUrlEntity | undefined = this.findByShortUrl(shortUrl);
		if (shortUrlEntity) {
			shortUrlEntity.nbClicks++;
			shortUrlRepository.update(shortUrlEntity.shortUrl, shortUrlEntity);
			const urlHasProtocol: boolean = isURL(shortUrlEntity.originalUrl, {require_protocol: true});
			if (!urlHasProtocol) {
				return `https://${shortUrlEntity.originalUrl}`;
			}
			return shortUrlEntity.originalUrl;
		}
		return undefined;
	}
}
