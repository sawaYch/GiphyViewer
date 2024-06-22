import axios from 'axios';
import type { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { z } from 'zod';

/**
 * The Gif Object schema used by GiphyViewer,
 */
const trendingGifSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt_text: z.string(),
  title: z.string(),
  images: z.object({
    fixed_width: z.object({
      height: z.number(),
      width: z.number(),
      webp: z.string(),
    }),
  }),
});

const trendingGifsSchema = z.object({
  data: z.array(trendingGifSchema),
});

type TrendingGifApiResponse = z.infer<typeof trendingGifsSchema>;
export type GifItem = z.infer<typeof trendingGifSchema>;

export const getGiphyGif = async (keyword: string): Promise<GifItem[]> => {
  if (Config.GIPHY_API_KEY == null)
    throw new Error('Error: Giphy API Key is missing.');

  const endpoint =
    keyword.trim() === ''
      ? `https://api.giphy.com/v1/gifs/trending?api_key=${Config.GIPHY_API_KEY}&limit=40`
      : `https://api.giphy.com/v1/gifs/search?api_key=${Config.GIPHY_API_KEY}&q=${keyword}&limit=40`;

  // limit should be multiply of 4 for better UI/UX
  const response: AxiosResponse<TrendingGifApiResponse> = await axios.get(
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
