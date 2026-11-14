import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display text-display text-ink mt-2 mb-6" {...props} />,
    h2: (props) => <h2 className="font-display text-2xl text-ink mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="text-lg font-semibold text-charcoal mt-8 mb-3" {...props} />,
    p: (props) => <p className="text-charcoal/85 leading-[1.9] my-4" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 space-y-2 text-charcoal/85 leading-[1.9] my-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 space-y-2 text-charcoal/85 leading-[1.9] my-4" {...props} />,
    a: (props) => <a className="text-forest underline underline-offset-4 decoration-forest/40 hover:decoration-forest" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-orange bg-orange-soft/40 px-5 py-3 my-6 text-ink" {...props} />,
    ...components,
  };
}
