import { ImageResponse } from 'next/og';

/**
 * OpenGraph and Twitter cards, generated per page at build time.
 *
 * Deliberately typographic rather than photographic: the photographs do not
 * exist yet, and a card that is set in the site's own colours will still look
 * deliberate when they do. No network fetch, no external font — this has to
 * build anywhere.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const INK = '#241611';
const PARCHMENT = '#FAF6EF';
const OCHRE = '#B4622A';
const INK_SOFT = '#574238';

export function renderOgImage({ title, line }: { title: string; line: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PARCHMENT,
          padding: 64,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: `1px solid ${OCHRE}`,
            opacity: 0.5,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 2, backgroundColor: OCHRE }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: INK_SOFT,
              display: 'flex',
            }}
          >
            Gathaithi Farmers’ Co-operative Society
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 46 ? 68 : 88,
            lineHeight: 1.04,
            letterSpacing: -2.5,
            color: INK,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `1px solid ${OCHRE}`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 26, color: INK_SOFT, display: 'flex', maxWidth: 760 }}>{line}</div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: OCHRE,
              display: 'flex',
            }}
          >
            Tetu · Nyeri · Kenya
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
