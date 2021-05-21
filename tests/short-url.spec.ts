import {ShortUrlService} from '../src/services/short-url.service';
import {ShortUrlCreateDto} from '../src/dtos/short-url-create.dto';
import {ShortUrlEntity} from '../src/models/short-url.entity';

let shortUrlService: ShortUrlService;

beforeEach(() => {
	shortUrlService = new ShortUrlService();
});

it('should exist', () => {
	expect(shortUrlService).toBeDefined();
});

it('should create a shortened url with a valid url', () => {
	let shortUrlCreateDto: ShortUrlCreateDto = {
		url: 'www.lunii.com',
	};

	let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);

	expect(createdUrl.originalUrl).toBe(shortUrlCreateDto.url);
	expect(createdUrl.shortUrl).toHaveLength(6);
	expect(createdUrl.nbClicks).toBe(0);
	expect(shortUrlService.findAllUrls()).toHaveLength(1);
});

it('should fail to create a shortened url with an invalid url', () => {
	let shortUrlCreateDto: ShortUrlCreateDto = {
		url: 'lunii',
	};

	expect.hasAssertions();
	try {
		let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);
	} catch (error) {
		expect(error.message).toBe('Invalid url.');
	}
});

it('should fail to create a shortened url with a missing url', () => {

	expect.hasAssertions();
	try {
		let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl({} as ShortUrlCreateDto);
	} catch (error) {
		expect(error.message).toBe('Missing url.');
	}
});

it('should get original url', () => {
	let shortUrlCreateDto: ShortUrlCreateDto = {
		url: 'http://www.lunii.com',
	};

	let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);
	let foundUrl: string | undefined = shortUrlService.findOriginalUrl(createdUrl.shortUrl);
	expect(foundUrl).toBe(shortUrlCreateDto.url);

});

it('should get original url with protocol', () => {
	let shortUrlCreateDto: ShortUrlCreateDto = {
		url: 'www.lunii.com',
	};

	let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);
	let foundUrl: string | undefined = shortUrlService.findOriginalUrl(createdUrl.shortUrl);
	expect(foundUrl).toBe('https://www.lunii.com');

});

it('should increase number of clicks', () => {
	let shortUrlCreateDto: ShortUrlCreateDto = {
		url: 'www.lunii.com',
	};

	let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);
	shortUrlService.findOriginalUrl(createdUrl.shortUrl);
	let shortUrl: ShortUrlEntity | undefined = shortUrlService.findByShortUrl(createdUrl.shortUrl);
	expect(shortUrl?.nbClicks).toBe(1);
});
