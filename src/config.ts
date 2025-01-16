export const appName = 'agriforms';
process.loadEnvFile('./process.env');
export const sequelizedbConfig= JSON.parse(process.env.G_CONFIG ?? "");
export const JWT_SECRET= process.env.JWT_SECRET ?? "";
//export const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGIN ?? "");




