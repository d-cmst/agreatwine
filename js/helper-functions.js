export function sanitizeInput(i) {
    const sanitized = i.toLowerCase().replaceAll(' ', '-').replaceAll("'", '-').replaceAll("è", 'e').replaceAll("à", 'a').replaceAll("é", 'e').replaceAll("ù", 'u')
    return sanitized
}
export function sanitizeInputCc(i) {
    const sanitized = i.replaceAll(' ', '-').replaceAll("'", '-').replaceAll("è", 'e').replaceAll("à", 'a').replaceAll("é", 'e').replaceAll("ù", 'u')
    return sanitized
}