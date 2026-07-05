interface ConnectionResult {
    success: boolean;
    message: string;
}
export declare const connectDatabase: () => Promise<ConnectionResult>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const getDatabaseStatus: () => {
    connected: boolean;
    readyState: number;
    host: string | null;
    name: string | null;
};
export {};
//# sourceMappingURL=connection.d.ts.map