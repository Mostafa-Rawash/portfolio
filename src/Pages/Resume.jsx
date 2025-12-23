import React from "react";

const CV_LINK = "https://docs.google.com/document/d/1CLJD3bJbjpe35vzvNBKqY8OexdnHGqwr/edit";
const CV_PDF = "https://docs.google.com/document/d/1CLJD3bJbjpe35vzvNBKqY8OexdnHGqwr/export?format=pdf";

export default function CV() {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-5xl lg:text-7xl font-bold mb-6">Resume</h1>
      <p className="text-lg max-w-3xl mb-8 text-theme-tc">
        Latest CV hosted on Google Docs. Use the buttons below to view it online or download a PDF copy.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          className="btn bg-theme-cc border-0 text-theme-tc font-semibold rounded-full"
          href={CV_LINK}
          target="_blank"
          rel="noreferrer"
        >
          View on Google Docs
        </a>
        <a
          className="btn btn-outline border-theme-p text-theme-tc font-semibold rounded-full"
          href={CV_PDF}
          target="_blank"
          rel="noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
