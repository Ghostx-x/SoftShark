export const helloWorld = async (event) => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify( "Hello World!!!" ),
        };
    } catch(error) {
        console.error(error);
    }
}
