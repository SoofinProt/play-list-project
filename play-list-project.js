import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./play-list-slide.js";
import "./play-list-dots.js";
import "./play-list-nav.js";

export class PlayListProject extends DDDSuper(LitElement) {
  static get tag() { return "play-list-project"; }

  static get properties() {
    return {
      index: { type: Number, reflect: true },
      slides: { type: Array },
    };
  }

  constructor() {
    super();
    this.index = 0;
    this.slides = [];
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-sm);
          max-width: 1000px;
          margin: 0 auto;
          background: var(--ddd-theme-default-white);
          outline: none;
          padding-bottom: var(--ddd-spacing-10);
          position: relative;
          color-scheme: light dark;
        }

        :host(:focus-within) {
          border-color: var(--ddd-theme-default-link);
          box-shadow: var(--ddd-boxShadow-md);
        }

        .slider-window {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        slot {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
        }

        ::slotted(play-list-slide) {
          flex: 0 0 100%;
          min-width: 100%;
        }

        .slider-track-wrapper {
          flex: 1;
          overflow: hidden;
          min-width: 0;
          align-self: stretch;
        }

        .slider-layout {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          width: 100%;
          position: relative;
        }

        @media (max-width: 600px) {
          :host { border-radius: 0; }
        }

        @media (prefers-color-scheme: dark) {
          :host { background: var(--ddd-theme-default-coalyGray); }
        }
      `
    ];
  }

  _handleKeyDown(e) {
    if (e.key === "ArrowLeft") this.changeSlide(-1);
    if (e.key === "ArrowRight") this.changeSlide(1);
  }

  handleSlotChange(e) {
    this.slides = e.target.assignedElements({ flatten: true })
      .filter(el => el.tagName.toLowerCase() === 'play-list-slide');
    this.requestUpdate();
  }

  changeSlide(dir) {
    const total = this.slides.length;
    if (total === 0) return;
    this.index = (this.index + dir + total) % total;
  }

  handleNavClick(e) {
    if (e.detail.direction === 'prev') this.changeSlide(-1);
    else this.changeSlide(1);
  }

  render() {
    return html`
      <div class="slider-layout">
        <play-list-nav
          direction="prev"
          ?disabled="${this.slides.length <= 1}"
          @play-list-nav-clicked="${this.handleNavClick}">
        </play-list-nav>

        <div class="slider-track-wrapper">
          <div
            class="slider-window"
            role="region"
            aria-live="polite"
            style="transform: translateX(-${this.index * 100}%);">
            <slot @slotchange="${this.handleSlotChange}"></slot>
          </div>
        </div>

        <play-list-nav
          direction="next"
          ?disabled="${this.slides.length <= 1}"
          @play-list-nav-clicked="${this.handleNavClick}">
        </play-list-nav>
      </div>

      <play-list-dots
        count="${this.slides.length}"
        index="${this.index}"
        role="tablist"
        aria-label="Slide Selection"
        @play-list-index-changed="${(e) => this.index = e.detail.index}">
      </play-list-dots>
    `;
  }
}
globalThis.customElements.define(PlayListProject.tag, PlayListProject);