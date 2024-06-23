import axios from 'axios';
import Config from 'react-native-config';
import { getGiphyGif } from './getGiphyGif';
import type { GiphyApiResponseType } from './apiSchema';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getGiphyGif', () => {
  beforeEach(() => {
    Config.GIPHY_API_KEY = 'test_api_key';
  });

  it('throws an error if the Giphy API key is missing', async () => {
    Config.GIPHY_API_KEY = undefined;

    await expect(getGiphyGif('test', 0)).rejects.toThrow(
      'Error: Giphy API Key is missing.'
    );
  });

  it('throws an error if the page number is negative', async () => {
    await expect(getGiphyGif('test', -1)).rejects.toThrow(
      'Error: Invalid Query Param value "offset" = -1'
    );
  });

  it('fetches trending gifs when keyword is empty', async () => {
    const mockResponse: GiphyApiResponseType = {
      data: [
        {
          id: '1',
          url: 'https://example.com/gif1',
          alt_text: 'Gif 1',
          title: 'Gif 1',
          images: {
            fixed_width: {
              height: 200,
              width: 200,
              webp: 'https://example.com/gif1.webp',
              url: 'https://example.com/gif1',
            },
          },
        },
      ],
    };

    const f = mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getGiphyGif('', 0);

    expect(f).toHaveBeenCalledWith(
      'https://api.giphy.com/v1/gifs/trending?api_key=test_api_key&limit=15&offset=0'
    );
    expect(result).toEqual([
      {
        id: '1',
        url: 'https://example.com/gif1',
        alt_text: 'Gif 1',
        title: 'Gif 1',
        images: {
          fixed_width: {
            height: 200,
            width: 200,
            webp: 'https://example.com/gif1.webp',
            url: 'https://example.com/gif1',
          },
        },
      },
    ]);
  });

  it('fetches searched gifs when keyword is provided', async () => {
    const mockResponse: GiphyApiResponseType = {
      data: [
        {
          id: '2',
          url: 'https://example.com/gif2',
          alt_text: 'Gif 2',
          title: 'Gif 2',
          images: {
            fixed_width: {
              height: 200,
              width: 200,
              webp: 'https://example.com/gif2.webp',
              url: 'https://example.com/gif2',
            },
          },
        },
      ],
    };

    const f = mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getGiphyGif('funny', 1);

    expect(f).toHaveBeenCalledWith(
      'https://api.giphy.com/v1/gifs/search?api_key=test_api_key&q=funny&limit=15&offset=15'
    );
    expect(result).toEqual([
      {
        id: '2',
        url: 'https://example.com/gif2',
        alt_text: 'Gif 2',
        title: 'Gif 2',
        images: {
          fixed_width: {
            height: 200,
            width: 200,
            webp: 'https://example.com/gif2.webp',
            url: 'https://example.com/gif2',
          },
        },
      },
    ]);
  });
});
