import { giphyAPIImageItemSchema, giphyApiDataSchema } from './apiSchema';

describe('Giphy API Schemas', () => {
  it('should validate a correct GifItem object', () => {
    const validGifItem = {
      id: '123',
      url: 'https://example.com/gif',
      alt_text: 'A funny gif',
      title: 'Funny Gif',
      images: {
        fixed_width: {
          height: 200,
          width: 200,
          webp: 'https://example.com/gif.webp',
          url: 'https://example.com/gif',
        },
      },
    };

    expect(() => giphyAPIImageItemSchema.parse(validGifItem)).not.toThrow();
  });

  it('should invalidate an incorrect GifItem object', () => {
    const invalidGifItem = {
      id: '123',
      url: 'https://example.com/gif',
      alt_text: 'A funny gif',
      title: 'Funny Gif',
      images: {
        fixed_width: {
          height: '200', // Should be a number
          width: 200,
          webp: 'https://example.com/gif.webp',
          url: 'https://example.com/gif',
        },
      },
    };

    expect(() => giphyAPIImageItemSchema.parse(invalidGifItem)).toThrow();
  });

  it('should validate a correct GiphyApiResponseType object', () => {
    const validApiResponse = {
      data: [
        {
          id: '123',
          url: 'https://example.com/gif',
          alt_text: 'A funny gif',
          title: 'Funny Gif',
          images: {
            fixed_width: {
              height: 200,
              width: 200,
              webp: 'https://example.com/gif.webp',
              url: 'https://example.com/gif',
            },
          },
        },
      ],
    };

    expect(() => giphyApiDataSchema.parse(validApiResponse)).not.toThrow();
  });

  it('should invalidate an incorrect GiphyApiResponseType object', () => {
    const invalidApiResponse = {
      data: [
        {
          id: '123',
          url: 'https://example.com/gif',
          alt_text: 'A funny gif',
          title: 'Funny Gif',
          images: {
            fixed_width: {
              height: 200,
              width: 200,
              webp: 'https://example.com/gif.webp',
              url: 123, // Should be a string
            },
          },
        },
      ],
    };

    expect(() => giphyApiDataSchema.parse(invalidApiResponse)).toThrow();
  });
});
