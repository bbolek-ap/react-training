import Api from './Api.ts';

export const Login = async ({username, password}: {username: string, password: string}) => {
    const result = await Api.post("/login", {username, password});
    return result.data;
}
