import axios from 'axios';
import type { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import type { GifItem, GiphyApiResponseType } from './apiSchema';

export const getGiphyGif = async (
  keyword: string,
  page: number
): Promise<GifItem[]> => {
  if (Config.GIPHY_API_KEY == null)
    throw new Error('Error: Giphy API Key is missing.');
  if (page < 0)
    throw new Error(`Error: Invalid Query Param value "offset" = ${page}`);

  const pageSize = 15;

  const endpoint =
    keyword.trim() === ''
      ? `https://api.giphy.com/v1/gifs/trending?api_key=${
          Config.GIPHY_API_KEY
        }&limit=${pageSize}&offset=${pageSize * page}`
      : `https://api.giphy.com/v1/gifs/search?api_key=${
          Config.GIPHY_API_KEY
        }&q=${keyword}&limit=${pageSize}&offset=${pageSize * page}`;

  // limit should be multiply of 4 for better UI/UX
  const response: AxiosResponse<GiphyApiResponseType> = await axios.get(
    endpoint
  );

  const transformedData: GifItem[] = response.data.data.map(it => ({
    id: it.id,
    url: it.url,
    alt_text: it.alt_text,
    title: it.alt_text,
    images: {
      fixed_width: it.images.fixed_width,
    },
  }));

  return transformedData;
};
