import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';

/**
 * The top of every page except the home page. Deliberately quiet: a label, the
 * page title, one lead paragraph, and a great deal of air.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  lead: string;
  /**
   * `center` stacks the three lines down the middle, the way About and Our
   * Coffee open. Left keeps the original two-column reading, where the title
   * is a column and the lead is the column beside it.
   */
  align?: 'left' | 'center';
}) {
  if (align === 'center') {
    return (
      <div className="bg-parchment pb-16 pt-40 sm:pb-20 sm:pt-48 lg:pb-24 lg:pt-56">
        <Container width="wide">
          <div className="mx-auto flex max-w-[52rem] flex-col items-center gap-6 text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="t-page-title max-w-[20ch] text-balance">{title}</h1>
            <p className="t-lead max-w-[56ch] text-ink-soft">
              <RichText text={lead} />
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-parchment pb-16 pt-40 sm:pb-20 sm:pt-48 lg:pb-24 lg:pt-56">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
            <h1 className="t-page-title max-w-[18ch]">{title}</h1>
          </div>
          <p className="t-lead measure text-ink-soft lg:col-span-5 lg:pt-4">
            <RichText text={lead} />
          </p>
        </div>
      </Container>
    </div>
  );
}
