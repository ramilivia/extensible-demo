export * from '../index';
export * from '../types';
export { Inspector } from '../index';

// React-specific exports
export declare const HygraphInspector: React.FC<any>;
export declare function useInspector(): any;
export declare function useInspectorSave(callback: any): void;
export declare function useInspectorEvent(eventType: string, handler: any): void;
export declare function useInspectorRefresh(): any;
export declare function useInspectorNextjs(): void;
export declare function useInspectorRemix(): void;
export declare function useInspectorFieldUpdates(onUpdate?: any, onError?: any): void;
export declare function useInspectorConnection(): any;
export declare function useInspectorActions(): any;
export declare function useInspectorDebug(): any;
