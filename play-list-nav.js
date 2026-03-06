import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListNav extends DDDSuper(LitElement) {
  static get tag() { return "play-list-nav"; }

  static get properties() {
    return {
      direction: { type: String },
      disabled: { type: Boolean, Reflect: true },
    };
  }

  constructor() {
    super();
    this.direction = "next";
    this.disabled = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          align-items: center;
        }
        .nav-button {
          flex-shrink: 0;
          background: white;
          border: 2px solid var(--ddd-theme-default-link);
          color: var(--ddd-theme-default-link);
          border-radius: var(--ddd-radius-circle);
          width: 44px;
          height: 44px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s all ease;
          margin: 0 -22px;
          /** position: relative; */
          z-index: 2;
        }
        .nav-button:hover,
        .nav-button:focus {
          background: var(--ddd-theme-default-link);
          color: white;
          outline: none;
        }
        .nav-button:focus-visible {
          outline: 2px solid var(--ddd-theme-default-link);
          outline-offset: 2px;
        }
        .nav-button:disabled {
          opacity: 0.3;
          cursor: default;
        }
        @media (max-width: 600px) {
          .nav-button { width: 32px; height: 32px; font-size: 14px; }
        }
        @media (prefers-color-scheme: dark) {
          .nav-button {
            background: var(--ddd-theme-default-coalyGray);
            border-color: var(--ddd-theme-default-link);
          }
        }
      `
    ];
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("play-list-nav-clicked", {
      composed: true,
      bubbles: true,
      detail: { direction: this.direction }
    }));
  }

  render() {
    return html`
      <button
        class="nav-button"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.direction === 'prev' ? 'Previous Slide' : 'Next Slide'}">
        ${this.direction === 'prev' ? '❮' : '❯'}
      </button>
    `;
  }
}
globalThis.customElements.define(PlayListNav.tag, PlayListNav);