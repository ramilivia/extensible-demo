class FieldRegistry {
  constructor(config) {
    this.registry = {};
    this.observer = null;
    this.isDestroyed = false;
    this.config = config;
    this.initializeObserver();
    this.scanExistingElements();
  }
  /**
   * Get all elements for a specific field
   */
  getElementsForField(fieldApiId, locale) {
    const elements = [];
    for (const elementList of Object.values(this.registry)) {
      for (const element of elementList) {
        if (element.fieldApiId === fieldApiId && element.locale === locale) {
          elements.push(element);
        }
      }
    }
    return elements;
  }
  /**
   * Get all elements for a specific entry
   */
  getElementsForEntry(entryId) {
    const elements = [];
    for (const elementList of Object.values(this.registry)) {
      for (const element of elementList) {
        if (element.entryId === entryId) {
          elements.push(element);
        }
      }
    }
    return elements;
  }
  /**
   * Get specific element by exact match
   */
  getElement(entryId, fieldApiId, locale) {
    const key = this.createRegistryKey(entryId, fieldApiId, locale);
    const elements = this.registry[key];
    return (elements == null ? void 0 : elements[0]) || null;
  }
  /**
   * Refresh registry - scan for new elements
   */
  refresh() {
    if (this.isDestroyed) return;
    this.scanExistingElements();
  }
  /**
   * Destroy registry and clean up observers
   */
  destroy() {
    var _a;
    this.isDestroyed = true;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    this.registry = {};
  }
  initializeObserver() {
    this.observer = new MutationObserver((mutations) => {
      var _a;
      if (this.isDestroyed) return;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.scanElement(node);
            }
          }
        }
        if (mutation.type === "attributes" && ((_a = mutation.attributeName) == null ? void 0 : _a.startsWith("data-hygraph-"))) {
          this.updateElementRegistration(mutation.target);
        }
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "data-hygraph-entry-id",
        "data-hygraph-field-api-id",
        "data-hygraph-field-locale"
      ]
    });
  }
  scanExistingElements() {
    const elements = document.querySelectorAll("[data-hygraph-entry-id]");
    elements.forEach((element) => this.scanElement(element));
  }
  scanElement(element) {
    if (this.hasHygraphAttributes(element)) {
      this.registerElement(element);
    }
    const children = element.querySelectorAll("[data-hygraph-entry-id]");
    children.forEach((child) => this.registerElement(child));
  }
  hasHygraphAttributes(element) {
    return element.hasAttribute("data-hygraph-entry-id");
  }
  registerElement(element) {
    const entryId = element.getAttribute("data-hygraph-entry-id");
    if (!entryId) return;
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    const registeredElement = {
      element,
      entryId,
      fieldApiId,
      locale,
      lastUpdated: Date.now()
    };
    const key = this.createRegistryKey(entryId, fieldApiId, locale);
    if (!this.registry[key]) {
      this.registry[key] = [];
    }
    const existingIndex = this.registry[key].findIndex((reg) => reg.element === element);
    if (existingIndex >= 0) {
      this.registry[key][existingIndex] = registeredElement;
    } else {
      this.registry[key].push(registeredElement);
    }
    if (this.config.debug) {
      console.log(`[FieldRegistry] Registered element:`, {
        entryId,
        fieldApiId,
        locale,
        element: element.tagName
      });
    }
  }
  updateElementRegistration(element) {
    this.unregisterElement(element);
    if (this.hasHygraphAttributes(element)) {
      this.registerElement(element);
    }
  }
  unregisterElement(element) {
    for (const [key, elements] of Object.entries(this.registry)) {
      const filteredElements = elements.filter((reg) => reg.element !== element);
      if (filteredElements.length === 0) {
        delete this.registry[key];
      } else {
        this.registry[key] = filteredElements;
      }
    }
  }
  createRegistryKey(entryId, fieldApiId, locale) {
    const parts = [entryId];
    if (fieldApiId) parts.push(fieldApiId);
    if (locale) parts.push(locale);
    return parts.join(":");
  }
  /**
   * Get registry statistics for debugging
   */
  getStats() {
    const entries = /* @__PURE__ */ new Set();
    const fields = /* @__PURE__ */ new Set();
    let totalElements = 0;
    for (const elements of Object.values(this.registry)) {
      totalElements += elements.length;
      for (const element of elements) {
        entries.add(element.entryId);
        if (element.fieldApiId) {
          fields.add(`${element.entryId}:${element.fieldApiId}`);
        }
      }
    }
    return {
      totalElements,
      entriesCount: entries.size,
      fieldsCount: fields.size
    };
  }
  /**
   * Get all registry keys (for debugging)
   */
  getRegistryKeys() {
    return Object.keys(this.registry);
  }
}
class MessageBridge {
  constructor(config) {
    this.isConnected = false;
    this.studioOrigin = null;
    this.messageQueue = [];
    this.isDestroyed = false;
    this.handleMessage = (event) => {
      if (this.isDestroyed) return;
      if (!this.isOriginAllowed(event.origin)) {
        if (this.config.debug) {
          console.log("[MessageBridge] Ignored message from disallowed origin:", event.origin);
        }
        return;
      }
      const message = event.data;
      if (!this.isValidStudioMessage(message)) {
        if (this.config.debug) {
          console.log("[MessageBridge] Ignored invalid message:", message);
        }
        return;
      }
      if (this.config.debug) {
        console.log("[MessageBridge] Received message:", message);
      }
      if (message.type === "init") {
        this.handleConnection(event.origin);
      }
      this.config.onMessage(message);
    };
    this.config = config;
    this.setupMessageListener();
  }
  /**
   * Send message to Studio
   */
  sendMessage(message) {
    if (this.isDestroyed) return false;
    if (!this.isConnected || !this.studioOrigin) {
      this.messageQueue.push(message);
      return false;
    }
    try {
      window.parent.postMessage(message, this.studioOrigin);
      if (this.config.debug) {
        console.log("[MessageBridge] Sent message:", message);
      }
      return true;
    } catch (error) {
      console.error("[MessageBridge] Failed to send message:", error);
      return false;
    }
  }
  /**
   * Send initial ready message to all allowed origins
   * Used to establish initial connection when studioOrigin is unknown
   */
  sendReadyMessage(message) {
    if (this.isDestroyed) return false;
    let sentSuccessfully = false;
    for (const origin of this.config.allowedOrigins) {
      try {
        window.parent.postMessage(message, origin);
        if (this.config.debug) {
          console.log("[MessageBridge] Sent ready message to origin:", origin, "message:", message);
        }
        sentSuccessfully = true;
      } catch (error) {
        if (this.config.debug) {
          console.log("[MessageBridge] Failed to send ready message to origin:", origin, "error:", error);
        }
      }
    }
    return sentSuccessfully;
  }
  /**
   * Check if connected to Studio
   */
  isConnectedToStudio() {
    return this.isConnected;
  }
  /**
   * Get Studio origin
   */
  getStudioOrigin() {
    return this.studioOrigin;
  }
  /**
   * Destroy message bridge
   */
  destroy() {
    this.isDestroyed = true;
    this.isConnected = false;
    this.studioOrigin = null;
    this.messageQueue = [];
    window.removeEventListener("message", this.handleMessage);
  }
  setupMessageListener() {
    if (this.config.debug) {
      console.log("[MessageBridge] Setting up message listener, allowed origins:", this.config.allowedOrigins);
    }
    window.addEventListener("message", this.handleMessage);
    if (this.config.onReady) {
      setTimeout(() => {
        this.config.onReady();
      }, 0);
    }
  }
  isOriginAllowed(origin) {
    return this.config.allowedOrigins.includes(origin) || this.config.allowedOrigins.some((allowed) => {
      if (allowed.includes("*")) {
        const pattern = allowed.replace(/\*/g, ".*");
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return false;
    });
  }
  isValidStudioMessage(message) {
    if (!message || typeof message !== "object") return false;
    if (typeof message.type !== "string") return false;
    if (typeof message.timestamp !== "number") return false;
    switch (message.type) {
      case "init":
        return typeof message.studioOrigin === "string";
      case "field-update":
        return typeof message.entryId === "string" && typeof message.fieldApiId === "string" && typeof message.fieldType === "string" && message.newValue !== void 0;
      case "focus-field":
        return typeof message.fieldApiId === "string";
      case "bulk-update":
        return Array.isArray(message.changes);
      case "content-saved":
        return typeof message.entryId === "string";
      case "disconnect":
        return true;
      default:
        return false;
    }
  }
  handleConnection(origin) {
    if (!this.isConnected) {
      this.isConnected = true;
      this.studioOrigin = origin;
      if (this.config.debug) {
        console.log("[MessageBridge] Connected to Studio:", origin);
      }
      this.flushMessageQueue();
    }
  }
  flushMessageQueue() {
    const messages = [...this.messageQueue];
    this.messageQueue = [];
    for (const message of messages) {
      this.sendMessage(message);
    }
    if (this.config.debug && messages.length > 0) {
      console.log(`[MessageBridge] Sent ${messages.length} queued messages`);
    }
  }
}
class ContentUpdater {
  constructor(config) {
    this.updateQueue = /* @__PURE__ */ new Map();
    this.isDestroyed = false;
    this.config = config;
  }
  /**
   * Update a single field with new content
   */
  async updateField(update) {
    if (this.isDestroyed) {
      return { success: false, error: "ContentUpdater is destroyed" };
    }
    try {
      const updateKey = `${update.entryId}:${update.fieldApiId}:${update.locale || ""}`;
      this.updateQueue.set(updateKey, update);
      await this.delay(this.config.updateDelay || 50);
      const latestUpdate = this.updateQueue.get(updateKey);
      if (latestUpdate !== update) {
        return { success: true };
      }
      this.updateQueue.delete(updateKey);
      const elements = this.findElements(update.entryId, update.fieldApiId, update.locale);
      if (elements.length === 0) {
        return { success: false, error: "No matching elements found" };
      }
      let hasError = false;
      let lastError = "";
      for (const element of elements) {
        try {
          await this.updateElement(element, update);
        } catch (error) {
          hasError = true;
          lastError = error instanceof Error ? error.message : String(error);
          console.error("[ContentUpdater] Failed to update element:", error);
        }
      }
      if (hasError) {
        return { success: false, error: lastError };
      }
      if (this.config.debug) {
        console.log("[ContentUpdater] Updated field:", {
          entryId: update.entryId,
          fieldApiId: update.fieldApiId,
          locale: update.locale,
          elementsCount: elements.length
        });
      }
      return { success: true, element: elements[0] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[ContentUpdater] Update failed:", error);
      return { success: false, error: errorMessage };
    }
  }
  /**
   * Destroy content updater
   */
  destroy() {
    this.isDestroyed = true;
    this.updateQueue.clear();
  }
  findElements(entryId, fieldApiId, locale) {
    const elements = [];
    let selector = `[data-hygraph-entry-id="${entryId}"]`;
    if (fieldApiId) {
      selector += `[data-hygraph-field-api-id="${fieldApiId}"]`;
    }
    if (locale) {
      selector += `[data-hygraph-field-locale="${locale}"]`;
    }
    const found = document.querySelectorAll(selector);
    elements.push(...Array.from(found));
    return elements;
  }
  async updateElement(element, update) {
    switch (update.fieldType) {
      case "STRING":
      case "ID":
        this.updateTextField(element, update.newValue);
        break;
      case "RICHTEXT":
        await this.updateRichTextField(element, update.newValue);
        break;
      case "INT":
      case "FLOAT":
        this.updateNumberField(element, update.newValue);
        break;
      case "BOOLEAN":
        this.updateBooleanField(element, update.newValue);
        break;
      case "DATETIME":
      case "DATE":
        this.updateDateField(element, update.newValue);
        break;
      case "ASSET":
        await this.updateAssetField(element, update.newValue);
        break;
      case "LOCATION":
        this.updateLocationField(element, update.newValue);
        break;
      case "COLOR":
        this.updateColorField(element, update.newValue);
        break;
      case "COMPONENT":
        await this.updateComponentField(element, update.newValue);
        break;
      case "JSON":
        this.updateJsonField(element, update.newValue);
        break;
      case "ENUMERATION":
        this.updateTextField(element, update.newValue);
        break;
      default:
        throw new Error(`Unsupported field type: ${update.fieldType}`);
    }
  }
  updateTextField(element, newValue) {
    if (!newValue && newValue !== "") return;
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      element.value = newValue;
    } else {
      element.textContent = newValue;
    }
  }
  async updateRichTextField(element, richTextAST) {
    if (!richTextAST || !richTextAST.children) return;
    try {
      const htmlContent = this.richTextToHTML(richTextAST);
      if (this.hasMorphdom()) {
        const tempElement = document.createElement(element.tagName);
        tempElement.innerHTML = htmlContent;
        window.morphdom(element, tempElement);
      } else {
        element.innerHTML = htmlContent;
      }
    } catch (error) {
      console.error("[ContentUpdater] Rich text update failed:", error);
      throw error;
    }
  }
  updateNumberField(element, newValue) {
    if (newValue === null || newValue === void 0) return;
    const stringValue = String(newValue);
    if (element.tagName === "INPUT") {
      element.value = stringValue;
    } else {
      element.textContent = stringValue;
    }
  }
  updateBooleanField(element, newValue) {
    if (element.tagName === "INPUT" && element.type === "checkbox") {
      element.checked = newValue;
    } else {
      element.textContent = String(newValue);
    }
  }
  updateDateField(element, newValue) {
    if (!newValue) return;
    const date = new Date(newValue);
    const formattedDate = date.toLocaleDateString();
    if (element.tagName === "INPUT" && element.type === "date") {
      element.value = newValue.split("T")[0];
    } else {
      element.textContent = formattedDate;
    }
  }
  async updateAssetField(element, asset) {
    if (!asset) return;
    if (Array.isArray(asset)) {
      if (asset.length > 0) {
        await this.updateSingleAsset(element, asset[0]);
      }
      return;
    }
    await this.updateSingleAsset(element, asset);
  }
  async updateSingleAsset(element, asset) {
    if (element.tagName === "IMG") {
      const img = element;
      img.src = asset.url;
      if (asset.alt) img.alt = asset.alt;
      if (asset.width) img.width = asset.width;
      if (asset.height) img.height = asset.height;
    } else if (element.tagName === "VIDEO") {
      const video = element;
      video.src = asset.url;
    } else if (element.tagName === "AUDIO") {
      const audio = element;
      audio.src = asset.url;
    } else if (element.tagName === "A") {
      const link = element;
      link.href = asset.url;
      if (!link.textContent) {
        link.textContent = asset.fileName;
      }
    } else {
      element.innerHTML = `<img src="${asset.url}" alt="${asset.alt || ""}" />`;
    }
  }
  updateLocationField(element, location) {
    if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
      return;
    }
    const locationText = `${location.latitude}, ${location.longitude}`;
    element.textContent = locationText;
    element.setAttribute("data-latitude", String(location.latitude));
    element.setAttribute("data-longitude", String(location.longitude));
  }
  updateColorField(element, color) {
    if (!color) return;
    element.textContent = color;
    if (element.style) {
      element.style.backgroundColor = color;
    }
  }
  async updateComponentField(element, componentData) {
    if (!componentData) return;
    try {
      const componentHtml = this.renderComponent(componentData);
      if (this.hasMorphdom()) {
        const tempElement = document.createElement(element.tagName);
        tempElement.innerHTML = componentHtml;
        window.morphdom(element, tempElement);
      } else {
        element.innerHTML = componentHtml;
      }
    } catch (error) {
      console.error("[ContentUpdater] Component update failed:", error);
      throw error;
    }
  }
  updateJsonField(element, jsonData) {
    if (jsonData === null || jsonData === void 0) return;
    const jsonString = JSON.stringify(jsonData, null, 2);
    element.textContent = jsonString;
  }
  richTextToHTML(richTextAST) {
    if (!richTextAST.children) return "";
    return richTextAST.children.map((node) => this.renderRichTextNode(node)).join("");
  }
  renderRichTextNode(node) {
    if (node.text) {
      return this.escapeHtml(node.text);
    }
    const children = node.children ? node.children.map((child) => this.renderRichTextNode(child)).join("") : "";
    switch (node.type) {
      case "paragraph":
        return `<p>${children}</p>`;
      case "heading-one":
        return `<h1>${children}</h1>`;
      case "heading-two":
        return `<h2>${children}</h2>`;
      case "heading-three":
        return `<h3>${children}</h3>`;
      case "heading-four":
        return `<h4>${children}</h4>`;
      case "heading-five":
        return `<h5>${children}</h5>`;
      case "heading-six":
        return `<h6>${children}</h6>`;
      case "block-quote":
        return `<blockquote>${children}</blockquote>`;
      case "bulleted-list":
        return `<ul>${children}</ul>`;
      case "numbered-list":
        return `<ol>${children}</ol>`;
      case "list-item":
        return `<li>${children}</li>`;
      case "link":
        return `<a href="${node.href || ""}">${children}</a>`;
      case "bold":
        return `<strong>${children}</strong>`;
      case "italic":
        return `<em>${children}</em>`;
      case "underline":
        return `<u>${children}</u>`;
      case "code":
        return `<code>${children}</code>`;
      default:
        return children;
    }
  }
  renderComponent(componentData) {
    const typename = componentData.__typename;
    const fields = Object.entries(componentData).filter(([key]) => key !== "__typename" && key !== "id").map(([key, value]) => `<div data-field="${key}">${this.escapeHtml(String(value))}</div>`).join("");
    return `<div data-component="${typename}">${fields}</div>`;
  }
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  hasMorphdom() {
    return typeof window.morphdom === "function";
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
class OverlayManager {
  constructor(config) {
    this.overlayElement = null;
    this.editButtonElement = null;
    this.currentTarget = null;
    this.isDestroyed = false;
    this.handleMouseMove = (event) => {
      var _a;
      if (this.isDestroyed) return;
      const target = event.target;
      if (target === this.editButtonElement || ((_a = this.editButtonElement) == null ? void 0 : _a.contains(target))) {
        return;
      }
      const hygraphElement = target.closest("[data-hygraph-entry-id]");
      if (hygraphElement && hygraphElement !== this.currentTarget) {
        const entryId = hygraphElement.getAttribute("data-hygraph-entry-id");
        const fieldApiId = hygraphElement.getAttribute("data-hygraph-field-api-id");
        const locale = hygraphElement.getAttribute("data-hygraph-field-locale");
        if (entryId) {
          const registeredElement = {
            element: hygraphElement,
            entryId,
            fieldApiId: fieldApiId || void 0,
            locale: locale || void 0
          };
          this.showOverlay(hygraphElement, registeredElement);
        }
      } else if (!hygraphElement && this.currentTarget) {
        setTimeout(() => {
          if (this.currentTarget && !this.isMouseOverEditButton(event)) {
            this.hideOverlay();
          }
        }, 50);
      }
    };
    this.handleMouseLeave = () => {
      this.hideOverlay();
    };
    this.handleScroll = () => {
      if (this.currentTarget) {
        this.updateOverlayPosition(this.currentTarget);
      }
    };
    this.handleResize = () => {
      if (this.currentTarget) {
        this.updateOverlayPosition(this.currentTarget);
      }
    };
    this.config = config;
    this.createOverlayElements();
    this.setupEventListeners();
  }
  /**
   * Show overlay for a specific element
   */
  showOverlay(element, registeredElement) {
    if (this.isDestroyed || !this.config.overlayEnabled) return;
    this.currentTarget = element;
    this.updateOverlayPosition(element);
    this.updateEditButton(registeredElement);
    this.showOverlayElements();
  }
  /**
   * Hide overlay
   */
  hideOverlay() {
    if (this.isDestroyed) return;
    this.currentTarget = null;
    this.hideOverlayElements();
  }
  /**
   * Destroy overlay manager
   */
  destroy() {
    this.isDestroyed = true;
    this.removeOverlayElements();
    this.removeEventListeners();
  }
  createOverlayElements() {
    this.overlayElement = document.createElement("div");
    this.overlayElement.id = "hygraph-inspector-overlay";
    this.overlayElement.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      border: 2px solid #3B82F6;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 4px;
      display: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
    `;
    this.editButtonElement = document.createElement("button");
    this.editButtonElement.id = "hygraph-inspector-edit-button";
    this.editButtonElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Edit
    `;
    this.editButtonElement.style.cssText = `
      position: fixed;
      z-index: 10000;
      background: #3B82F6;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: none;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      pointer-events: auto;
      width: 72px;
      height: 32px;
      justify-content: center;
      box-sizing: border-box;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    `;
    this.editButtonElement.addEventListener("mouseenter", () => {
      this.editButtonElement.style.background = "#2563EB";
      this.editButtonElement.style.transform = "scale(1.05)";
    });
    this.editButtonElement.addEventListener("mouseleave", () => {
      this.editButtonElement.style.background = "#3B82F6";
      this.editButtonElement.style.transform = "scale(1)";
    });
    document.body.appendChild(this.overlayElement);
    document.body.appendChild(this.editButtonElement);
  }
  setupEventListeners() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseleave", this.handleMouseLeave);
    document.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize);
  }
  removeEventListeners() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseleave", this.handleMouseLeave);
    document.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize);
  }
  isMouseOverEditButton(event) {
    if (!this.editButtonElement) return false;
    const rect = this.editButtonElement.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }
  updateOverlayPosition(element) {
    if (!this.overlayElement) return;
    const rect = element.getBoundingClientRect();
    this.overlayElement.style.left = `${rect.left}px`;
    this.overlayElement.style.top = `${rect.top}px`;
    this.overlayElement.style.width = `${rect.width}px`;
    this.overlayElement.style.height = `${rect.height}px`;
  }
  updateEditButton(registeredElement) {
    if (!this.editButtonElement || !this.currentTarget) return;
    const rect = this.currentTarget.getBoundingClientRect();
    const buttonWidth = 72;
    const buttonHeight = 32;
    const padding = 4;
    let buttonTop = rect.top + padding;
    let buttonLeft = rect.right - buttonWidth - padding;
    if (buttonLeft < rect.left + padding) {
      buttonLeft = rect.left + padding;
    }
    if (buttonTop + buttonHeight + padding > rect.bottom) {
      buttonTop = Math.max(rect.top + padding, rect.bottom - buttonHeight - padding);
    }
    buttonLeft = Math.max(rect.left + padding, Math.min(buttonLeft, rect.right - buttonWidth - padding));
    buttonTop = Math.max(rect.top + padding, Math.min(buttonTop, rect.bottom - buttonHeight - padding));
    this.editButtonElement.style.left = `${buttonLeft}px`;
    this.editButtonElement.style.top = `${buttonTop}px`;
    this.editButtonElement.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.handleEditClick(registeredElement);
    };
    const fieldName = registeredElement.fieldApiId || "entry";
    this.editButtonElement.title = `Edit ${fieldName}`;
  }
  handleEditClick(registeredElement) {
    const event = new CustomEvent("hygraph-edit-click", {
      detail: registeredElement,
      bubbles: true
    });
    document.dispatchEvent(event);
    if (this.config.debug) {
      console.log("[OverlayManager] Edit button clicked:", registeredElement);
    }
  }
  showOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.style.display = "block";
    }
    if (this.editButtonElement) {
      this.editButtonElement.style.display = "flex";
    }
  }
  hideOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.style.display = "none";
    }
    if (this.editButtonElement) {
      this.editButtonElement.style.display = "none";
    }
  }
  removeOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.remove();
      this.overlayElement = null;
    }
    if (this.editButtonElement) {
      this.editButtonElement.remove();
      this.editButtonElement = null;
    }
  }
}
class Inspector {
  constructor(config) {
    this.messageBridge = null;
    this.saveCallbacks = /* @__PURE__ */ new Set();
    this.handleEditClick = (event) => {
      const customEvent = event;
      const registeredElement = customEvent.detail;
      const element = registeredElement.element;
      if (this.mode === "iframe") {
        this.handleIframeEditClick(element);
      } else {
        this.handleStandaloneEditClick(element);
      }
    };
    this.config = {
      debug: false,
      overlayEnabled: true,
      updateDelay: 50,
      retryAttempts: 3,
      autoConnect: true,
      allowedOrigins: ["https://app.hygraph.com", "http://localhost:3000"],
      ...config
    };
    this.mode = this.determineMode();
    this.fieldRegistry = new FieldRegistry(this.config);
    this.contentUpdater = new ContentUpdater(this.config);
    this.overlayManager = new OverlayManager(this.config);
    if (this.mode === "iframe") {
      this.initializeIframeMode();
    } else {
      this.initializeStandaloneMode();
    }
    this.setupEditClickHandler();
    if (this.config.debug) {
      window.__HYGRAPH_INSPECTOR__ = this;
    }
    this.emitEvent("inspector:ready", { inspector: this });
  }
  /**
   * Subscribe to save events - for framework refresh integration
   */
  subscribe(eventType, config) {
    if (eventType === "save") {
      this.saveCallbacks.add(config.callback);
      return () => this.saveCallbacks.delete(config.callback);
    }
    throw new Error(`Unknown event type: ${eventType}`);
  }
  /**
   * Get current SDK version
   */
  getVersion() {
    return "2.0.0";
  }
  /**
   * Get current mode
   */
  getMode() {
    return this.mode;
  }
  /**
   * Check if Inspector is connected to Studio
   */
  isConnected() {
    var _a;
    return ((_a = this.messageBridge) == null ? void 0 : _a.isConnectedToStudio()) ?? false;
  }
  /**
   * Refresh element registry - scan for new elements
   */
  refresh() {
    this.fieldRegistry.refresh();
  }
  /**
   * Destroy Inspector and clean up resources
   */
  destroy() {
    var _a;
    this.fieldRegistry.destroy();
    (_a = this.messageBridge) == null ? void 0 : _a.destroy();
    this.contentUpdater.destroy();
    this.overlayManager.destroy();
    this.saveCallbacks.clear();
    document.removeEventListener("hygraph-edit-click", this.handleEditClick);
    if (window.__HYGRAPH_INSPECTOR__ === this) {
      delete window.__HYGRAPH_INSPECTOR__;
    }
  }
  determineMode() {
    if (this.config.mode === "iframe") return "iframe";
    if (this.config.mode === "standalone") return "standalone";
    try {
      return window.self === window.top ? "standalone" : "iframe";
    } catch (e) {
      return "iframe";
    }
  }
  initializeIframeMode() {
    if (this.config.debug) {
      console.log("[Inspector] Initializing in iframe mode");
    }
    this.messageBridge = new MessageBridge({
      debug: this.config.debug,
      allowedOrigins: this.getAllowedOrigins(),
      onMessage: this.handleStudioMessage.bind(this),
      onReady: () => {
        if (this.config.debug) {
          console.log("[Inspector] MessageBridge ready, sending ready message to Studio");
        }
        if (this.config.autoConnect) {
          this.sendReadyMessage();
        }
      }
    });
    this.setupIframeEditHandlers();
  }
  initializeStandaloneMode() {
    if (this.config.debug) {
      console.log("[Inspector] Initializing in standalone mode");
    }
    if (!this.config.studioUrl && !this.isProductionEndpoint()) {
      console.warn("[Inspector] Consider setting studioUrl for development endpoints");
    }
    this.setupStandaloneEditHandlers();
  }
  getAllowedOrigins() {
    const origins = [...this.config.allowedOrigins || []];
    if (this.config.studioUrl) {
      origins.push(new URL(this.config.studioUrl).origin);
    }
    return origins;
  }
  isProductionEndpoint() {
    return this.config.endpoint.includes("api.hygraph.com") || this.config.endpoint.includes(".hygraph.com");
  }
  sendReadyMessage() {
    if (!this.messageBridge) return;
    const message = {
      type: "ready",
      sdkVersion: this.getVersion(),
      timestamp: Date.now()
    };
    this.messageBridge.sendReadyMessage(message);
  }
  handleStudioMessage(message) {
    switch (message.type) {
      case "init":
        this.handleInitMessage(message);
        break;
      case "field-update":
        this.handleFieldUpdate(message);
        break;
      case "focus-field":
        this.handleFocusField(message);
        break;
      case "bulk-update":
        this.handleBulkUpdate(message);
        break;
      case "content-saved":
        this.handleContentSaved(message);
        break;
      case "disconnect":
        this.handleDisconnect();
        break;
    }
  }
  handleInitMessage(message) {
    if (this.config.debug) {
      console.log("[Inspector] Connected to Studio:", message.studioOrigin);
    }
    this.emitEvent("inspector:connected", { studioOrigin: message.studioOrigin });
  }
  async handleFieldUpdate(message) {
    const result = await this.contentUpdater.updateField({
      entryId: message.entryId,
      fieldApiId: message.fieldApiId,
      newValue: message.newValue,
      locale: message.locale,
      fieldType: message.fieldType,
      updateId: message.updateId
    });
    if (this.messageBridge) {
      const responseMessage = result.success ? {
        type: "update-complete",
        updateId: message.updateId,
        timestamp: Date.now()
      } : {
        type: "update-failed",
        updateId: message.updateId,
        error: result.error || "Update failed",
        timestamp: Date.now()
      };
      this.messageBridge.sendMessage(responseMessage);
    }
    if (result.success) {
      this.emitEvent("inspector:field-updated", {
        entryId: message.entryId,
        fieldApiId: message.fieldApiId,
        newValue: message.newValue
      });
    } else {
      this.emitEvent("inspector:update-failed", {
        entryId: message.entryId,
        fieldApiId: message.fieldApiId,
        error: result.error || "Update failed"
      });
    }
  }
  handleFocusField(message) {
    const elements = this.fieldRegistry.getElementsForField(
      message.fieldApiId,
      message.locale
    );
    if (elements.length > 0) {
      const element = elements[0].element;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.focus();
      }
    }
  }
  async handleBulkUpdate(message) {
    const results = await Promise.all(
      message.changes.map((change) => this.contentUpdater.updateField(change))
    );
    const allSucceeded = results.every((result) => result.success);
    const errors = results.filter((result) => !result.success).map((result) => result.error);
    if (this.messageBridge) {
      const responseMessage = allSucceeded ? {
        type: "update-complete",
        timestamp: Date.now()
      } : {
        type: "update-failed",
        error: `Bulk update failed: ${errors.join(", ")}`,
        timestamp: Date.now()
      };
      this.messageBridge.sendMessage(responseMessage);
    }
  }
  async handleContentSaved(message) {
    if (this.config.debug) {
      console.log("[Inspector] Content saved, triggering framework refresh");
    }
    this.emitEvent("inspector:content-saved", {
      entryId: message.entryId,
      timestamp: message.timestamp
    });
    for (const callback of this.saveCallbacks) {
      try {
        await callback(message.entryId);
      } catch (error) {
        console.error("[Inspector] Save callback failed:", error);
      }
    }
  }
  handleDisconnect() {
    if (this.config.debug) {
      console.log("[Inspector] Disconnected from Studio");
    }
    this.emitEvent("inspector:disconnected", {});
  }
  setupEditClickHandler() {
    document.addEventListener("hygraph-edit-click", this.handleEditClick);
  }
  setupIframeEditHandlers() {
  }
  setupStandaloneEditHandlers() {
  }
  handleIframeEditClick(element) {
    var _a;
    const entryId = element.getAttribute("data-hygraph-entry-id");
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    if (!entryId) return;
    if (this.messageBridge) {
      const message = {
        type: "field-click",
        entryId,
        fieldApiId,
        locale,
        timestamp: Date.now()
      };
      const success = this.messageBridge.sendMessage(message);
      if (!success && ((_a = this.config.standalone) == null ? void 0 : _a.fallbackToNewTab) !== false) {
        if (this.config.debug) {
          console.log("[Inspector] Studio not connected, falling back to new tab");
        }
        this.handleStandaloneEditClick(element);
      }
    }
    this.emitEvent("inspector:field-click", {
      entryId,
      fieldApiId,
      locale,
      mode: this.mode
    });
  }
  handleStandaloneEditClick(element) {
    const entryId = element.getAttribute("data-hygraph-entry-id");
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    if (!entryId) return;
    if (!this.config.endpoint) {
      console.error("[Inspector] Cannot open Studio - no endpoint configured");
      return;
    }
    const studioUrl = this.buildStudioUrl(entryId, fieldApiId, locale);
    window.open(studioUrl, "_blank", "noopener,noreferrer");
    if (this.config.debug) {
      console.log("[Inspector] Opened Studio in new tab:", studioUrl);
    }
    this.emitEvent("inspector:field-click", {
      entryId,
      fieldApiId,
      locale,
      mode: this.mode
    });
  }
  buildStudioUrl(entryId, fieldApiId, locale) {
    const baseUrl = this.config.studioUrl || "https://app.hygraph.com";
    const params = new URLSearchParams({
      endpoint: this.config.endpoint,
      entryId
    });
    if (fieldApiId) params.set("fieldApiId", fieldApiId);
    if (locale) params.set("locale", locale);
    return `${baseUrl}/entry?${params.toString()}`;
  }
  emitEvent(type, detail) {
    const event = new CustomEvent(type, { detail });
    document.dispatchEvent(event);
  }
}
class FrameworkIntegration {
  constructor() {
    this.detectedFramework = null;
    this.detectFramework();
  }
  /**
   * Get the detected framework
   */
  getFramework() {
    return this.detectedFramework;
  }
  /**
   * Get a framework-native refresh function
   */
  getRefreshFunction() {
    if (!this.detectedFramework) return null;
    switch (this.detectedFramework.type) {
      case "nextjs":
        return this.getNextjsRefresh();
      case "remix":
        return this.getRemixRefresh();
      case "gatsby":
        return this.getGatsbyRefresh();
      case "nuxt":
        return this.getNuxtRefresh();
      case "sveltekit":
        return this.getSveltekitRefresh();
      default:
        return this.getVanillaRefresh();
    }
  }
  /**
   * Execute framework-appropriate refresh
   */
  async refresh() {
    const refreshFn = this.getRefreshFunction();
    if (refreshFn) {
      await refreshFn();
    } else {
      window.location.reload();
    }
  }
  detectFramework() {
    if (this.hasNextjs()) {
      this.detectedFramework = {
        type: "nextjs",
        router: this.getNextjsRouter()
      };
      return;
    }
    if (this.hasRemix()) {
      this.detectedFramework = {
        type: "remix",
        revalidator: this.getRemixRevalidator()
      };
      return;
    }
    if (this.hasGatsby()) {
      this.detectedFramework = {
        type: "gatsby"
      };
      return;
    }
    if (this.hasNuxt()) {
      this.detectedFramework = {
        type: "nuxt"
      };
      return;
    }
    if (this.hasSveltekit()) {
      this.detectedFramework = {
        type: "sveltekit"
      };
      return;
    }
    this.detectedFramework = {
      type: "vanilla"
    };
  }
  hasNextjs() {
    return typeof window !== "undefined" && (window.__NEXT_DATA__ || window.next || document.querySelector('script[src*="/_next/"]') !== null);
  }
  hasRemix() {
    return typeof window !== "undefined" && (window.__remixContext || window.__remixRouterContext || document.querySelector('script[src*="/build/"]') !== null);
  }
  hasGatsby() {
    return typeof window !== "undefined" && (window.___gatsby || window.__GATSBY || document.querySelector("[data-gatsby-browser-entry]") !== null);
  }
  hasNuxt() {
    return typeof window !== "undefined" && (window.__NUXT__ || window.$nuxt || document.querySelector("#__nuxt") !== null);
  }
  hasSveltekit() {
    return typeof window !== "undefined" && (window.__SVELTEKIT__ || document.querySelector("[data-sveltekit-preload-data]") !== null);
  }
  getNextjsRouter() {
    var _a, _b;
    if (typeof window === "undefined") return null;
    return ((_a = window.next) == null ? void 0 : _a.router) || ((_b = window.__NEXT_DATA__) == null ? void 0 : _b.router) || null;
  }
  getRemixRevalidator() {
    var _a;
    if (typeof window === "undefined") return null;
    return window.__remixRevalidator || ((_a = window.__remixRouterContext) == null ? void 0 : _a.revalidator) || null;
  }
  getNextjsRefresh() {
    var _a;
    const router = this.getNextjsRouter();
    if (router && typeof router.replace === "function") {
      return () => {
        router.replace(router.asPath || window.location.pathname);
      };
    }
    if (typeof ((_a = window.location) == null ? void 0 : _a.reload) === "function") {
      return () => window.location.reload();
    }
    return null;
  }
  getRemixRefresh() {
    const revalidator = this.getRemixRevalidator();
    if (revalidator && typeof revalidator.revalidate === "function") {
      return () => revalidator.revalidate();
    }
    if (typeof window.__remixRevalidate === "function") {
      return () => window.__remixRevalidate();
    }
    return null;
  }
  getGatsbyRefresh() {
    return () => window.location.reload();
  }
  getNuxtRefresh() {
    const nuxtApp = window.$nuxt;
    if (nuxtApp && typeof nuxtApp.refresh === "function") {
      return () => nuxtApp.refresh();
    }
    if (typeof window.refreshCookie === "function") {
      return () => window.refreshCookie();
    }
    return () => window.location.reload();
  }
  getSveltekitRefresh() {
    if (typeof window.invalidateAll === "function") {
      return () => window.invalidateAll();
    }
    return () => window.location.reload();
  }
  getVanillaRefresh() {
    return () => window.location.reload();
  }
  /**
   * Get recommended setup instructions for the detected framework
   */
  getSetupInstructions() {
    if (!this.detectedFramework) return "";
    switch (this.detectedFramework.type) {
      case "nextjs":
        return `
// Next.js setup:
import { HygraphInspector } from '@hygraph/inspector-sdk/react';
import { useRouter } from 'next/router';

function App() {
  const router = useRouter();

  return (
    <HygraphInspector
      endpoint="your-endpoint"
      onSave={() => router.replace(router.asPath)}
    >
      {/* Your content */}
    </HygraphInspector>
  );
}`;
      case "remix":
        return `
// Remix setup:
import { HygraphInspector } from '@hygraph/inspector-sdk/react';
import { useRevalidator } from '@remix-run/react';

export default function App() {
  const revalidator = useRevalidator();

  return (
    <HygraphInspector
      endpoint="your-endpoint"
      onSave={() => revalidator.revalidate()}
    >
      {/* Your content */}
    </HygraphInspector>
  );
}`;
      case "vanilla":
        return `
// Vanilla JS setup:
import { Inspector } from '@hygraph/inspector-sdk';

const inspector = new Inspector({
  endpoint: 'your-endpoint'
});

inspector.subscribe('save', {
  callback: () => window.location.reload()
});`;
      default:
        return `
// ${this.detectedFramework.type} setup:
import { Inspector } from '@hygraph/inspector-sdk';

const inspector = new Inspector({
  endpoint: 'your-endpoint'
});

inspector.subscribe('save', {
  callback: () => {
    // Add framework-specific refresh logic here
    window.location.reload();
  }
});`;
    }
  }
}
export {
  ContentUpdater,
  FieldRegistry,
  FrameworkIntegration,
  Inspector,
  MessageBridge,
  OverlayManager
};
//# sourceMappingURL=index.esm.js.map
