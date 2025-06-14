import React, { useState } from "react";
import "./App.css";

const ParagraphPreview = ({ text }) => {
  const paragraphs = text.split(/\n+/);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const getFirstSentence = (text) => {
    const match = text.match(/.*?[.!?](?=\s|$)/);
    return match ? match[0] : text;
  };

  const isExpanded = (index) => expandedIndexes.includes(index);
  const expand = (index) => setExpandedIndexes((prev) => [...prev, index]);
  const collapse = (index) =>
    setExpandedIndexes((prev) => prev.filter((i) => i !== index));

  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        const expanded = isExpanded(index);
        const firstSentence = getFirstSentence(paragraph);

        return (
          <div
            key={index}
            className="paragraph"
            onClick={() => collapse(index)}
          >
            {expanded ? (
              <span>{paragraph}</span>
            ) : (
              <>
                <span>{firstSentence}</span>
                {firstSentence !== paragraph && (
                  <span
                    className="ellipsis"
                    onClick={(e) => {
                      e.stopPropagation();
                      expand(index);
                    }}
                  >
                    ...
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParagraphPreview;
