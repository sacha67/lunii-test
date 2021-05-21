import {Request, Response} from 'express';
import {ShortUrlCreateDto} from '../dtos/short-url-create.dto';
import {ShortUrlService} from '../services/short-url.service';
import {ShortUrlEntity} from '../models/short-url.entity';

const shortUrlService: ShortUrlService = new ShortUrlService();

export class ShortUrlController {

	createShortUrl(request: Request, response: Response): void {
		const shortUrlCreateDto: ShortUrlCreateDto = request.body;
		try {
			const createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(shortUrlCreateDto);
			response.json(createdUrl);
		} catch (error) {
			response.status(400).json({error: error.message});
		}
	}

	getShortUrlsAnalytics(request: Request, response: Response): void {
		const shortUrls: ShortUrlEntity[] = shortUrlService.findAllUrls();
		response.json(shortUrls);
	}

	redirectShortUrl(request: Request, response: Response) {
		const shortUrl: string = request.params.shortUrl;
		const originalUrl: string | undefined = shortUrlService.findOriginalUrl(shortUrl);
		if (originalUrl) {
			response.redirect(originalUrl);
		} else {
			response.status(404).send('Url not found.');
		}
	}
}
