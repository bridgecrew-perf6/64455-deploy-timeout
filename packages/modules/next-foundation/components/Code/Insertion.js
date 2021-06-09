/* eslint-disable react/no-danger */

import Head from 'next/head';
import { isBlank } from '../../lib/util';

const CodeInsertion = ({ id, source, className }) => {
  const { language, code } = source;
  const hasSource = !isBlank(code);
  if (language === 'html' && hasSource) {
    return (
      <div
        className={className ?? 'tm-expand'}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  } else if (language === 'css' && hasSource) {
    return (
      <Head key={id}>
        <style dangerouslySetInnerHTML={{ __html: code }} />
      </Head>
    );
  } else if (language === 'js' && hasSource) {
    return (
      <Head key={id}>
        <script dangerouslySetInnerHTML={{ __html: code }} />
      </Head>
    );
  }
  return null;
};

export default CodeInsertion;
