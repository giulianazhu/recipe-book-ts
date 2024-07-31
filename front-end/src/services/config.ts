const URL = import.meta.env.VITE_URL;
const PORT = import.meta.env.VITE_PORT;

export const urlport = URL || `http://localhost:${PORT}`;
