/**
 * CURRENTLY UNMOUNTED — the site ships English only. See content/site.ts.
 */
/**
 * Shown on Kiswahili pages while the translation is being prepared. Honest is
 * better than a half-machine-translated page: it tells the reader what they
 * are looking at and disappears the moment `locale.pending` is emptied in
 * content/sw/common.ts.
 */
export function TranslationNotice({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="bg-moss text-on-moss on-moss" role="status">
      <p className="mx-auto max-w-[82rem] px-6 py-3 text-[0.8125rem] leading-relaxed sm:px-10 lg:px-16">
        {message}
      </p>
    </div>
  );
}
