/**
 * Marks a string as awaiting Kiswahili translation.
 *
 * It returns the English source unchanged, so an untranslated key renders in
 * English rather than blank. Replace the whole call with a Kiswahili string
 * when you translate it:
 *
 *     heading: todo('Cherry price & payments')   ->   heading: 'Bei ya cherry …'
 */
export const todo = (english: string): string => english;
