export declare interface AssetData {
    id: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
    width?: number;
    height?: number;
    alt?: string;
}

export declare interface ComponentData {
    __typename: string;
    id?: string;
    [fieldApiId: string]: any;
}

export declare class ContentUpdater {
    private config;
    private updateQueue;
    private isDestroyed;
    constructor(config: InspectorConfig);
    /**
     * Update a single field with new content
     */
    updateField(update: FieldUpdate): Promise<UpdateResult>;
    /**
     * Destroy content updater
     */
    destroy(): void;
    private findElements;
    private updateElement;
    private updateTextField;
    private updateRichTextField;
    private updateNumberField;
    private updateBooleanField;
    private updateDateField;
    private updateAssetField;
    private updateSingleAsset;
    private updateLocationField;
    private updateColorField;
    private updateComponentField;
    private updateJsonField;
    private richTextToHTML;
    private renderRichTextNode;
    private renderComponent;
    private escapeHtml;
    private hasMorphdom;
    private delay;
}

export declare interface ElementAttributes {
    'data-hygraph-entry-id': string;
    'data-hygraph-field-api-id'?: string;
    'data-hygraph-field-locale'?: string;
}

export declare interface ElementRegistry {
    [key: string]: RegisteredElement[];
}

export declare type ErrorHandler = (error: Error) => void;

export declare class FieldRegistry {
    private config;
    private registry;
    private observer;
    private isDestroyed;
    constructor(config: InspectorConfig);
    /**
     * Get all elements for a specific field
     */
    getElementsForField(fieldApiId: string, locale?: string): RegisteredElement[];
    /**
     * Get all elements for a specific entry
     */
    getElementsForEntry(entryId: string): RegisteredElement[];
    /**
     * Get specific element by exact match
     */
    getElement(entryId: string, fieldApiId?: string, locale?: string): RegisteredElement | null;
    /**
     * Refresh registry - scan for new elements
     */
    refresh(): void;
    /**
     * Destroy registry and clean up observers
     */
    destroy(): void;
    private initializeObserver;
    private scanExistingElements;
    private scanElement;
    private hasHygraphAttributes;
    private registerElement;
    private updateElementRegistration;
    private unregisterElement;
    private createRegistryKey;
    /**
     * Get registry statistics for debugging
     */
    getStats(): {
        totalElements: number;
        entriesCount: number;
        fieldsCount: number;
    };
    /**
     * Get all registry keys (for debugging)
     */
    getRegistryKeys(): RegistryKey[];
}

export declare type FieldType = 'ID' | 'STRING' | 'RICHTEXT' | 'INT' | 'FLOAT' | 'BOOLEAN' | 'JSON' | 'DATETIME' | 'DATE' | 'LOCATION' | 'COLOR' | 'ASSET' | 'COMPONENT' | 'RELATION' | 'ENUMERATION';

export declare interface FieldUpdate {
    entryId: string;
    fieldApiId: string;
    newValue: any;
    locale?: string;
    fieldType: FieldType;
    updateId?: string;
}

export declare interface FrameworkDetection {
    type: FrameworkType;
    version?: string;
    router?: any;
    revalidator?: any;
}

export declare class FrameworkIntegration {
    private detectedFramework;
    constructor();
    /**
     * Get the detected framework
     */
    getFramework(): FrameworkDetection | null;
    /**
     * Get a framework-native refresh function
     */
    getRefreshFunction(): (() => void | Promise<void>) | null;
    /**
     * Execute framework-appropriate refresh
     */
    refresh(): Promise<void>;
    private detectFramework;
    private hasNextjs;
    private hasRemix;
    private hasGatsby;
    private hasNuxt;
    private hasSveltekit;
    private getNextjsRouter;
    private getRemixRevalidator;
    private getNextjsRefresh;
    private getRemixRefresh;
    private getGatsbyRefresh;
    private getNuxtRefresh;
    private getSveltekitRefresh;
    private getVanillaRefresh;
    /**
     * Get recommended setup instructions for the detected framework
     */
    getSetupInstructions(): string;
}

/**
 * FrameworkIntegration - Utilities for integrating with different frontend frameworks
 * Provides framework-specific refresh mechanisms for content saves
 */
export declare type FrameworkType = 'nextjs' | 'remix' | 'gatsby' | 'nuxt' | 'sveltekit' | 'vanilla';

declare class Inspector {
    private config;
    private fieldRegistry;
    private messageBridge;
    private contentUpdater;
    private overlayManager;
    private saveCallbacks;
    private mode;
    constructor(config: InspectorConfig);
    /**
     * Subscribe to save events - for framework refresh integration
     */
    subscribe(eventType: 'save', config: SubscriptionConfig): () => void;
    /**
     * Get current SDK version
     */
    getVersion(): string;
    /**
     * Get current mode
     */
    getMode(): 'iframe' | 'standalone';
    /**
     * Check if Inspector is connected to Studio
     */
    isConnected(): boolean;
    /**
     * Refresh element registry - scan for new elements
     */
    refresh(): void;
    /**
     * Destroy Inspector and clean up resources
     */
    destroy(): void;
    private determineMode;
    private initializeIframeMode;
    private initializeStandaloneMode;
    private getAllowedOrigins;
    private isProductionEndpoint;
    private sendReadyMessage;
    private handleStudioMessage;
    private handleInitMessage;
    private handleFieldUpdate;
    private handleFocusField;
    private handleBulkUpdate;
    private handleContentSaved;
    private handleDisconnect;
    private setupEditClickHandler;
    private handleEditClick;
    private setupIframeEditHandlers;
    private setupStandaloneEditHandlers;
    private handleIframeEditClick;
    private handleStandaloneEditClick;
    private buildStudioUrl;
    private emitEvent;
}
export { Inspector }
export default Inspector;

export declare interface InspectorConfig {
    endpoint: string;
    debug?: boolean;
    overlayEnabled?: boolean;
    updateDelay?: number;
    retryAttempts?: number;
    autoConnect?: boolean;
    allowedOrigins?: string[];
    studioUrl?: string;
    mode?: 'auto' | 'iframe' | 'standalone';
    standalone?: {
        openInNewTab?: boolean;
        studioUrl?: string;
        includeReferrer?: boolean;
        fallbackToNewTab?: boolean;
    };
}

export declare type InspectorEventListener<T = any> = (event: CustomEvent<T>) => void;

export declare interface InspectorEvents {
    'inspector:ready': CustomEvent<{
        inspector: any;
    }>;
    'inspector:connected': CustomEvent<{
        studioOrigin: string;
    }>;
    'inspector:disconnected': CustomEvent<{}>;
    'inspector:field-updated': CustomEvent<{
        entryId: string;
        fieldApiId: string;
        newValue: any;
    }>;
    'inspector:update-failed': CustomEvent<{
        entryId: string;
        fieldApiId: string;
        error: string;
    }>;
    'inspector:error': CustomEvent<{
        error: Error;
    }>;
    'inspector:field-click': CustomEvent<{
        entryId: string;
        fieldApiId?: string;
        locale?: string;
        mode?: 'iframe' | 'standalone';
    }>;
    'inspector:content-saved': CustomEvent<{
        entryId: string;
        timestamp: number;
    }>;
}

export declare interface LocationData {
    latitude: number;
    longitude: number;
}

export declare class MessageBridge {
    private config;
    private isConnected;
    private studioOrigin;
    private messageQueue;
    private isDestroyed;
    constructor(config: MessageBridgeConfig);
    /**
     * Send message to Studio
     */
    sendMessage(message: SDKMessage): boolean;
    /**
     * Send initial ready message to all allowed origins
     * Used to establish initial connection when studioOrigin is unknown
     */
    sendReadyMessage(message: SDKMessage & {
        type: 'ready';
    }): boolean;
    /**
     * Check if connected to Studio
     */
    isConnectedToStudio(): boolean;
    /**
     * Get Studio origin
     */
    getStudioOrigin(): string | null;
    /**
     * Destroy message bridge
     */
    destroy(): void;
    private setupMessageListener;
    private handleMessage;
    private isOriginAllowed;
    private isValidStudioMessage;
    private handleConnection;
    private flushMessageQueue;
}

export declare interface MessageBridgeConfig {
    debug?: boolean;
    allowedOrigins: string[];
    onMessage: (message: StudioMessage) => void;
    onReady?: () => void;
}

export declare interface OverlayConfig {
    enabled: boolean;
    showOnHover: boolean;
    style?: {
        borderColor?: string;
        borderWidth?: string;
        backgroundColor?: string;
        opacity?: number;
    };
}

export declare class OverlayManager {
    private config;
    private overlayElement;
    private editButtonElement;
    private currentTarget;
    private isDestroyed;
    constructor(config: InspectorConfig);
    /**
     * Show overlay for a specific element
     */
    showOverlay(element: HTMLElement, registeredElement: RegisteredElement): void;
    /**
     * Hide overlay
     */
    hideOverlay(): void;
    /**
     * Destroy overlay manager
     */
    destroy(): void;
    private createOverlayElements;
    private setupEventListeners;
    private removeEventListeners;
    private handleMouseMove;
    private isMouseOverEditButton;
    private handleMouseLeave;
    private handleScroll;
    private handleResize;
    private updateOverlayPosition;
    private updateEditButton;
    private handleEditClick;
    private showOverlayElements;
    private hideOverlayElements;
    private removeOverlayElements;
}

export declare interface RegisteredElement {
    element: HTMLElement;
    entryId: string;
    fieldApiId?: string;
    locale?: string;
    lastUpdated?: number;
}

export declare type RegistryKey = string;

export declare interface RichTextAST {
    children: RichTextNode[];
}

export declare interface RichTextNode {
    type: string;
    children?: RichTextNode[];
    text?: string;
    [key: string]: any;
}

export declare type SaveCallback = (entryId: string) => void | Promise<void>;

export declare type SDKMessage = {
    type: 'ready';
    sdkVersion: string;
    timestamp: number;
} | {
    type: 'field-click';
    entryId: string;
    fieldApiId?: string;
    locale?: string;
    timestamp: number;
} | {
    type: 'update-complete';
    updateId?: string;
    timestamp: number;
} | {
    type: 'update-failed';
    updateId?: string;
    error: string;
    timestamp: number;
} | {
    type: 'error';
    message: string;
    timestamp: number;
};

/**
 * TypeScript type definitions for the Hygraph Inspector SDK
 */
export declare type StudioMessage = {
    type: 'init';
    studioOrigin: string;
    timestamp: number;
} | {
    type: 'parentInfo';
    studioOrigin: string;
    pathname: string;
    timestamp: number;
} | {
    type: 'field-update';
    entryId: string;
    fieldApiId: string;
    newValue: any;
    locale?: string;
    fieldType: FieldType;
    timestamp: number;
    updateId?: string;
} | {
    type: 'focus-field';
    fieldApiId: string;
    locale?: string;
    timestamp: number;
} | {
    type: 'bulk-update';
    changes: FieldUpdate[];
    timestamp: number;
} | {
    type: 'content-saved';
    entryId: string;
    timestamp: number;
} | {
    type: 'disconnect';
    timestamp: number;
};

export declare interface SubscriptionConfig {
    callback: SaveCallback;
}

export declare type UpdateHandler = (update: FieldUpdate) => Promise<boolean>;

export declare interface UpdateResult {
    success: boolean;
    error?: string;
    element?: HTMLElement;
}

export { }


declare global {
    interface Window {
        __HYGRAPH_INSPECTOR__?: any;
    }
    interface HTMLElement {
        'data-hygraph-entry-id'?: string;
        'data-hygraph-field-api-id'?: string;
        'data-hygraph-field-locale'?: string;
    }
}



declare global {
    interface Window {
        __HYGRAPH_INSPECTOR__?: any;
    }
    interface HTMLElement {
        'data-hygraph-entry-id'?: string;
        'data-hygraph-field-api-id'?: string;
        'data-hygraph-field-locale'?: string;
    }
}



declare global {
    interface Window {
        __HYGRAPH_INSPECTOR__?: any;
    }
    interface HTMLElement {
        'data-hygraph-entry-id'?: string;
        'data-hygraph-field-api-id'?: string;
        'data-hygraph-field-locale'?: string;
    }
}

