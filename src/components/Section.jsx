import React from "react";

export function Section({ title, action, onAction, children }) {
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{title}</h2>
        {action && (
          <button onClick={onAction} className="seeAll">
            {action} <i className="fi fi-sr-angle-right" aria-hidden="true" />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
