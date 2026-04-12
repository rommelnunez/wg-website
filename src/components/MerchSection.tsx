"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ShopifyBuy?: {
      UI?: unknown;
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
    };
  }
}

export function MerchSection() {
  useEffect(() => {
    const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    function ShopifyBuyInit() {
      if (!window.ShopifyBuy) return;

      const client = window.ShopifyBuy.buildClient({
        domain: "5ajy6j-6u.myshopify.com",
        storefrontAccessToken: "182f91281b0c113f3e990757249ab645",
      });

      // @ts-expect-error Shopify Buy Button SDK types
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent("product", {
          id: "7864173166682",
          node: document.getElementById("product-component-1776022335467"),
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "text-align": "left",
                },
                title: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "14px",
                  "font-weight": "600",
                  color: "#000",
                  "margin-bottom": "8px",
                },
                price: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "14px",
                  "font-weight": "500",
                  color: "#000",
                },
                button: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "12px",
                  "font-weight": "600",
                  "text-transform": "uppercase",
                  "letter-spacing": "0.05em",
                  "background-color": "#000",
                  "border-radius": "0",
                  padding: "12px 24px",
                  ":hover": {
                    "background-color": "#333",
                  },
                  ":focus": {
                    "background-color": "#333",
                  },
                },
                options: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "12px",
                },
              },
              contents: {
                img: true,
                title: true,
                price: true,
                options: true,
                button: true,
              },
              text: {
                button: "Buy Now",
                outOfStock: "Out of Stock",
              },
            },
            option: {
              styles: {
                label: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "11px",
                  "text-transform": "uppercase",
                  "letter-spacing": "0.05em",
                  color: "#666",
                },
                select: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-size": "13px",
                  "font-weight": "700",
                  "border-radius": "0",
                  border: "none",
                  "background-color": "#000",
                  color: "#fff",
                  padding: "10px 14px",
                },
                wrapper: {
                  border: "none",
                  "box-shadow": "none",
                },
                selectIcon: {
                  fill: "#fff",
                },
              },
            },
            cart: {
              styles: {
                button: {
                  "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  "font-weight": "600",
                  "text-transform": "uppercase",
                  "letter-spacing": "0.05em",
                  "background-color": "#000",
                  "border-radius": "0",
                  ":hover": {
                    "background-color": "#333",
                  },
                  ":focus": {
                    "background-color": "#333",
                  },
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {
              styles: {
                toggle: {
                  "background-color": "#000",
                  ":hover": {
                    "background-color": "#333",
                  },
                  ":focus": {
                    "background-color": "#333",
                  },
                },
              },
            },
          },
        });
      });
    }

    function loadScript() {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, []);

  return (
    <section id="merch" className="bg-white py-16 px-[4vw]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h3 className="font-display text-5xl md:text-6xl font-black uppercase leading-[0.9] text-black">
            SHOP
          </h3>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex flex-col">
            <div id="product-component-1776022335467"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
