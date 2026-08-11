"use client";

import { useEffect } from "react";

/**
 * Short share link: /ohb -> /ourherobalthazar
 *
 * Exists so partner links stay short enough to sit comfortably in an
 * Instagram bio. The query string is carried across verbatim, so the `?r=`
 * partner code still reaches the tracking on the destination page.
 *
 * Uses replace() rather than push() so the redirect doesn't sit in history
 * and trap people on the back button.
 */
export default function OhbShortLink() {
  useEffect(() => {
    const search = window.location.search || "";
    const hash = window.location.hash || "";
    window.location.replace("/ourherobalthazar" + search + hash);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Fallback for anything that runs no JS */}
        <meta httpEquiv="refresh" content="0; url=/ourherobalthazar" />
        <link rel="canonical" href="https://wgpictures.com/ourherobalthazar" />
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ margin: 0, background: "#000", color: "#fff" }}>
        <noscript>
          <p style={{ fontFamily: "sans-serif", padding: "2rem" }}>
            <a href="/ourherobalthazar" style={{ color: "#fff" }}>
              Continue to Our Hero, Balthazar
            </a>
          </p>
        </noscript>
      </body>
    </html>
  );
}
