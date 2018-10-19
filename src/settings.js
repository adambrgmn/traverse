// @flow
import { get, set } from './chrome/storage';
import type { Settings } from './types';

type SettingsShape = $Shape<Settings>;

const updateSettings = async (
  settings: SettingsShape | (Settings => SettingsShape),
) => {
  let newSettings: SettingsShape = {};

  if (typeof settings === 'function') {
    const currentSettings: Settings = await get(null);
    newSettings = settings(currentSettings);
  } else {
    newSettings = settings;
  }

  await set(newSettings);
};

const getSetting = (keys: SettingsShape): Promise<SettingsShape> => get(keys);

export { updateSettings, getSetting };
