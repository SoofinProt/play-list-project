import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class PlayListProject extends DDDSuper(LitElement) {
  static get tag() { return "play-list-project"; }

  static get properties() {
    return {
      index: { type: Number, reflect: true },
      slides: { type: true }
    };
  }

  constructor() {
    super();
    this.setAttribute('tabindex', '0');
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
          background: white;
          outline: none;
          padding-bottom: var(--ddd-spacing-10);
          position: relative;
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
          align-self: center;
          align-items: center;
          justify-content: center;
          transition: 0.2s all ease;
          margin: 0 var(--ddd-spacing-3);
          z-index: 10;
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

        .dots-nav {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) 0;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: var(--ddd-theme-default-limestoneGray);
          cursor: pointer;
          padding: 0;
          transition: 0.2s all ease;
        }

        .dot:hover, .dot:focus {
          background: var(--ddd-theme-default-limestoneMax);
        }

        .dot.active {
          background: var(--ddd-theme-default-link);
          transform: scale(1.2);
        }

        @media (max-width: 600px) {
          .nav-button { width: 32px; height: 32px; font-size: 14px; }
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

 
render() {
  return html`
    <div class="slider-layout">
      <button class="nav-button btn-prev" @click="${() => this.changeSlide(-1)}" aria-label="Previous Slide" ?disabled="${this.slides.length <= 1}">❮</button>

      <div class="slider-track-wrapper">
        <div 
          class="slider-window" 
          role="region" 
          aria-live="polite"
          style="transform: translateX(-${this.index * 100}%);">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
      </div>

      <button class="nav-button btn-next" @click="${() => this.changeSlide(1)}" aria-label="Next Slide" ?disabled="${this.slides.length <= 1}">❯</button>
    </div>

    <div class="dots-nav" role="tablist" aria-label="Slide Selection">
      ${this.slides.map((_, i) => html`
        <button 
          class="dot ${i === this.index ? 'active' : ''}" 
          @click="${() => this.index = i}"
          role="tab"
          aria-selected="${i === this.index}"
          aria-label="Go to slide ${i + 1}">
        </button>
      `)}
    </div>
  `;
}
}
globalThis.customElements.define(PlayListProject.tag, PlayListProject);