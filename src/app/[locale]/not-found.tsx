import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section tone="parchment" size="loose">
      <Container width="wide">
        <div className="flex flex-col gap-8 pt-24">
          <p className="t-meta text-ochre-ink">404</p>
          <h1 className="t-page-title max-w-[18ch]">That page is not on this site</h1>
          <p className="t-lead measure text-ink-soft">
            The link may be old, or mistyped. Everything the society publishes is reachable from the
            home page.
          </p>
          <Link href="/en" className="link w-fit t-meta">
            Back to the home page
          </Link>
        </div>
      </Container>
    </Section>
  );
}
