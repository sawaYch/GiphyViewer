import { z } from 'zod';

/**
 * The Gif Object schema used by GiphyViewer,
 */
export const giphyAPIImageItemSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt_text: z.string(),
  title: z.string(),
  images: z.object({
    fixed_width: z.object({
      height: z.number(),
      width: z.number(),
      webp: z.string(),
      url: z.string(),
    }),
  }),
});

export const giphyApiDataSchema = z.object({
  data: z.array(giphyAPIImageItemSchema),
});

export type GiphyApiResponseType = z.infer<typeof giphyApiDataSchema>;
export type GifItem = z.infer<typeof giphyAPIImageItemSchema>;
