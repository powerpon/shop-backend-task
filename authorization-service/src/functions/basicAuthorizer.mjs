import { generatePolicy } from "../utils/generatePolicy.mjs";

export async function basicAuthorizer(event){
    if(!event.headers.authorization){
        throw new Error('Unauthorized');
    }
    const encodedToken = event.headers.authorization.split(' ')[1];
    const decodedToken = atob(encodedToken);
    const [username, password] = decodedToken.split(':');
    if(process.env[username] !== password){
        return generatePolicy('user', 'Deny', event.routeArn);
    }
    return generatePolicy(username, 'Allow', event.routeArn);
}
