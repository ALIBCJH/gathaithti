import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import { site } from '@content/site';

/**
 * No third-party map iframe. An embedded Google or Mapbox frame costs several
 * hundred kilobytes of JavaScript and a cross-origin connection on a page this
 * audience often loads on mobile data — for a pin that never moves. A flat map
 * still plus a real link into the reader's own maps app does the same job.
 */
export function LocationBlock({
  heading,
  body,
  address,
  directions,
  tone = 'parchment',
}: {
  heading: string;
  body?: string;
  /** Omit where the page has already given the address — the Contact page
   *  states it directly above this block, and saying it twice in adjacent
   *  sections reads as a mistake rather than as emphasis. */
  address?: readonly string[];
  directions: string;
  tone?: 'parchment' | 'parchment-2';
}) {
  const mapsUrl = `https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lng}#map=13/${site.geo.lat}/${site.geo.lng}`;

  return (
    <Section tone={tone} id="location" ariaLabelledby="location-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <h2 id="location-heading" className="t-section max-w-[14ch]">
              {heading}
            </h2>
            {body ? <p className="t-body measure text-ink-soft">{body}</p> : null}

            {address && address.length > 0 ? (
              <address className="mt-4 flex flex-col gap-1 text-[1.0625rem] not-italic leading-relaxed">
                {address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            ) : null}

            <a className="link w-fit text-[0.9375rem]" href={mapsUrl} rel="noopener" target="_blank">
              {directions}
            </a>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <SmartImage slot="locationMap" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
