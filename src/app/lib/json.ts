export function safeJsonParse(
  input: string,
): { success: true; data: unknown } | { success: false; error: string } {
  try {
    return { success: true, data: JSON.parse(input) }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    }
  }
}

export function safeJsonStringify(
  value: unknown,
  space?: number,
): string | null {
  try {
    return JSON.stringify(value, null, space)
  } catch {
    return null
  }
}
