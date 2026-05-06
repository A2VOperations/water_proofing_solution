"use client";

import Script from "next/script";
import { ThemeProvider } from "styled-components";
import { StyledComponent } from "./StyledComponent";
import { theme } from "./theme";

const Testimonials = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponent>
        <div className="p-30">
          <Script src="https://elfsightcdn.com/platform.js" async></Script>
          <div
            className="elfsight-app-8ef167b7-93f5-404e-bb8a-0f5f91cb2ba4"
            data-elfsight-app-lazy
          ></div>
        </div>
      </StyledComponent>
    </ThemeProvider>
  );
};

export default Testimonials;

