import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 * @return string if success, null if failed
 */
export async function loadStorage(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 * @return true if success, false if failed
 */
export async function saveStorage(
  key: string,
  value: string
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 * @return true if success, false if failed
 */
export async function removeStorage(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/**
 * Burn it all to the ground.
 * @return true if success, false if failed
 */
export async function clearStorage(): Promise<boolean> {
  try {
    await AsyncStorage.clear()
    return true
  } catch {
    return false
  }
}
