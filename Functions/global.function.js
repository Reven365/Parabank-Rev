export async function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}