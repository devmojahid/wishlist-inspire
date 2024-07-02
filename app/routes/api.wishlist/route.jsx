import { json } from "@remix-run/node";

export const loader = async () => {
    return json({ message: "Hello, world!" });
};

export async function action({ request }){
    let method = request.method;
    
    switch(method)
    {
        case "POST":
            return json({ message: "You made a POST request!" });
        case "PUT":
            return json({ message: "You made a PUT request!" });
        case "DELETE":
            return json({ message: "You made a DELETE request!" });
        default:
            return json({ message: "You made a request!" });
    }

}