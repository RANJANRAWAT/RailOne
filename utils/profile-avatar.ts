import * as SecureStore from 'expo-secure-store';

const AVATAR_URI_KEY = 'profile_avatar_uri_v1';

export async function getProfileAvatarUri() {
  try {
    return await SecureStore.getItemAsync(AVATAR_URI_KEY);
  } catch {
    return null;
  }
}

export async function setProfileAvatarUri(uri: string | null) {
  try {
    if (!uri) {
      await SecureStore.deleteItemAsync(AVATAR_URI_KEY);
      return;
    }
    await SecureStore.setItemAsync(AVATAR_URI_KEY, uri);
  } catch {
    // ignore storage errors (non-blocking)
  }
}


