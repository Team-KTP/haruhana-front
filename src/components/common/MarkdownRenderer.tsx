import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'default' | 'dark';
}

export function MarkdownRenderer({ content, className = '', variant = 'default' }: MarkdownRendererProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
        // 제목 스타일링 - 반응형
        h1: ({ children }) => (
          <h1 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-5 sm:mt-6 ${isDark ? 'text-haru-200' : 'text-slate-800'}`}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-5 ${isDark ? 'text-haru-200' : 'text-slate-800'}`}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className={`text-base sm:text-lg font-bold mb-2 mt-3 sm:mt-4 ${isDark ? 'text-haru-300' : 'text-slate-700'}`}>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className={`text-sm sm:text-base font-bold mb-2 mt-2 sm:mt-3 ${isDark ? 'text-haru-300' : 'text-slate-700'}`}>
            {children}
          </h4>
        ),

        // 단락 스타일링 - 반응형
        p: ({ children }) => (
          <p className={`mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base ${isDark ? 'text-haru-100' : 'text-slate-700'}`}>
            {children}
          </p>
        ),

        // 리스트 스타일링 - 반응형
        ul: ({ children }) => (
          <ul className={`list-disc list-outside ml-5 sm:ml-6 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base ${isDark ? 'text-haru-100' : 'text-slate-700'}`}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className={`list-decimal list-outside ml-5 sm:ml-6 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base ${isDark ? 'text-haru-100' : 'text-slate-700'}`}>
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className={`leading-relaxed ${isDark ? 'marker:text-haru-400' : 'marker:text-slate-500'}`}>
            {children}
          </li>
        ),

        // 코드 블록 스타일링 - 반응형
        code: ({ inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                className={`px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono ${
                  isDark
                    ? 'bg-slate-700 text-haru-200 border border-slate-600'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} text-xs sm:text-sm`} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre
            className={`p-3 sm:p-4 rounded-lg sm:rounded-xl overflow-x-auto mb-3 sm:mb-4 border ${
              isDark
                ? 'bg-slate-900 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            {children}
          </pre>
        ),

        // 인용구 스타일링 - 반응형
        blockquote: ({ children }) => (
          <blockquote
            className={`border-l-4 pl-3 sm:pl-4 py-2 my-3 sm:my-4 italic text-sm sm:text-base ${
              isDark
                ? 'border-haru-400 bg-slate-800/50 text-haru-100'
                : 'border-haru-400 bg-haru-50/30 text-slate-600'
            }`}
          >
            {children}
          </blockquote>
        ),

        // 링크 스타일링 - 반응형
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium underline decoration-2 underline-offset-2 transition-colors text-sm sm:text-base break-words ${
              isDark
                ? 'text-haru-300 hover:text-haru-200 decoration-haru-400/50'
                : 'text-haru-600 hover:text-haru-700 decoration-haru-400/50'
            }`}
          >
            {children}
          </a>
        ),

        // 구분선 스타일링 - 반응형
        hr: () => (
          <hr className={`my-4 sm:my-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />
        ),

        // 테이블 스타일링 - 반응형
        table: ({ children }) => (
          <div className="overflow-x-auto mb-3 sm:mb-4 -mx-2 sm:mx-0">
            <table className={`min-w-full border-collapse text-xs sm:text-sm ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className={isDark ? 'bg-slate-800' : 'bg-slate-50'}>
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className={isDark ? 'divide-slate-700' : 'divide-slate-200'}>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className={`border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className={`px-2 sm:px-4 py-1.5 sm:py-2 text-left font-semibold ${isDark ? 'text-haru-200' : 'text-slate-700'}`}>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className={`px-2 sm:px-4 py-1.5 sm:py-2 ${isDark ? 'text-haru-100' : 'text-slate-600'}`}>
            {children}
          </td>
        ),

        // 강조 스타일링
        strong: ({ children }) => (
          <strong className={`font-bold ${isDark ? 'text-haru-200' : 'text-slate-800'}`}>
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className={isDark ? 'text-haru-200' : 'text-slate-700'}>
            {children}
          </em>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
