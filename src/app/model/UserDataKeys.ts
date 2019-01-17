import * as path from 'path';
import set = Reflect.set;

export const servers = 'server_list';

export interface Store {
  /**
   *
   *  Set an item.
   The value must be JSON serializable.
   * @param key
   * @param value
   */
  set(key: string, value: any);

  /**
   *   Set multiple items at once.
   * @param object
   */
  set(object: object);

  /**
   *   Get an item or defaultValue if the item does not exist.

   * @param key
   * @param defaultValue
   */
  get(key: string, defaultValue?: any);

  /**
   *   Check if an item exists.
   * @param key
   */
  has(key: string): boolean;

  /**
   *   Delete an item.
   * @param key
   */
  delete(key: string);

  /**
   *   Delete all items.
   */
  clear();

  /**
   *  callback: (newValue, oldValue) => {}
   *   Watches the given key, calling callback on any changes.
   *   When a key is first set oldValue will be undefined,
   *   and when a key is deleted newValue will be undefined.
   *   Events are only triggered in the same process.
   *  So you won't get events in the main process if you trigger an event in a renderer process. See #39.
   * @param key
   * @param callback
   */
  onDidChange(key: string, callback);

  /**
   *   Get the item count.
   */
  size(): number;


}

