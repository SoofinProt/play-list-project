import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListSlide extends DDDSuper(LitElement) {
  static get tag() { return "play-list-slide"; }

  static get properties() {
    return {
      topHeading: { type: String, attribute: "top-heading", reflect: true },
      secondHeading: { type: String, attribute: "second-heading", reflect: true },
    };
  }

  constructor() {
    super();
    this.topHeading = '';
    this.secondHeading = '';
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          flex: 0 0 100%;
          min-width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding: var(--ddd-spacing-8);
          overflow: hidden;
          color-scheme: light dark;
        }
        .top-heading {
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-xs, 12px);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-link, blue);
          text-transform: uppercase;
          margin-bottom: var(--ddd-spacing-2);
          letter-spacing: var(--ddd-ls-72-lg);
        }
        .second-heading {
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-xl, 28px);
          font-weight: var(--ddd-font-size-black);
          color: var(--ddd-theme-default-nittanyNavy, #1e407c);
          margin: 0 0 16px 0;
          line-height: 1.1;
        }
        .accent {
          width: 60px;
          height: 3px;
          background-color: var(--ddd-theme-default-link);
          margin-bottom: var(--ddd-spacing-8);
        }
        .scroll-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 300px;
          padding-right: var(--ddd-spacing-6);
          font-family: var(--ddd-font-secondary);
          line-height: var(--ddd-lh-md);
          color: var(--ddd-theme-default-coalyGray);
          word-break: break-word;
        }
        .scroll-content::-webkit-scrollbar { width: 6px; }
        .scroll-content::-webkit-scrollbar-track { background: transparent; }
        .scroll-content::-webkit-scrollbar-thumb {
          background: var(--ddd-theme-default-limestoneGray);
          border-radius: var(--ddd-radius-sm);
        }
        @media (max-width: 768px) {
          :host { padding: var(--ddd-spacing-4); }
          .second-heading { font-size: var(--ddd-font-size-l); }
        }
        @media (prefers-color-scheme: dark) {
          .second-heading { color: white; }
          .scroll-content { color: var(--ddd-theme-default-limestoneLight); }
        }
      `
    ];
  }

  render() {
    return html`
      <div class="top-heading">${this.topHeading}</div>
      <h2 class="second-heading">${this.secondHeading}</h2>
      <div class="accent"></div>
      <div class="scroll-content">
        <slot></slot>
      </div>
    `;
  }
}
globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);