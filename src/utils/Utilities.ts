export function isProduction(): boolean {
    return import.meta.env.MODE === "production"; 
}
/**
 * Validates that a string contains only alphabetic characters.
 * @param name - The string to validate.
 * @returns True if the string contains only alphabetic characters, false otherwise.
 */
export function validateStringOnlyAlphabet(name: string): boolean {
    const nameRegex = /^[A-Za-z]+$/; // Only alphabetic characters allowed
    return name.trim().length > 0 && nameRegex.test(name);
}

/**
 * Validates that a string contains only numeric digits.
 * @param value - The string to validate.
 * @returns True if the string contains only digits, false otherwise.
 */
export function validateStringOnlyDigits(value: string): boolean {
    const regex = /^[0-9]+$/; // Only numeric digits allowed
    return regex.test(value);
}

/**
 * Validates that a string is not empty.
 * @param value - The string to validate.
 * @returns True if the string is not empty, false otherwise.
 */
export function validateStringIsNotEmpty(value: string): boolean {
    return value.trim() !== "";
}