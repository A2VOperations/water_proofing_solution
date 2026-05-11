"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import { StyledComponent } from "./StyledComponent";
import { theme } from "./theme";
import GoogleReviewsFallback from "./GoogleReviewsFallback";

const Testimonials = () => {
  const [elfsightReady, setElfsightReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!containerRef.current) return;

      const html = containerRef.current.innerHTML || "";

      // Explicitly bail out on error/deactivated states
      const isDeactivated =
        html.includes("deactivated") ||
        html.includes("Reactivate") ||
        html.includes("temporarily");

      // Only trust it if it looks like real review content
      const hasReviews =
        !isDeactivated &&
        (html.includes("eapps-google-reviews") ||
          html.includes("eapps-reviews-item"));

      if (isDeactivated) {
        // Elfsight is broken — stop watching, keep fallback visible forever
        observer.disconnect();
        return;
      }

      if (hasReviews) {
        setElfsightReady(true);
        observer.disconnect();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledComponent>
        <div className="sm:p-30 px-5 py-10 relative">
          <Script src="https://elfsightcdn.com/platform.js" async />

          {/* 
            Use visibility+position instead of display:none.
            display:none breaks Elfsight's IntersectionObserver lazy loader,
            causing it to only trigger on tab switch.
          */}
          <div
            ref={containerRef}
            // className="elfsight-app-ebeacab4-832b-4bc2-9dcd-6eeefd1a5511"
            style={
              elfsightReady
                ? { position: "static" }
                : {
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                    width: "100%",
                  }
            }
          />

          {!elfsightReady && <GoogleReviewsFallback />}
        </div>
      </StyledComponent>
    </ThemeProvider>
  );
};

export default Testimonials;