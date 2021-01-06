import * as crypto from 'crypto';
import * as Identicon from 'identicon.js';

/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}

/**
 * 生成随机头像
 * @param account 账号
 * @param salt 加密盐
 */
export function hashAvatar(account: string, salt: string): string {
  if (!account || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  const hash = crypto
    .pbkdf2Sync(account, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
  return `data:image/png;base64,${new Identicon(hash).toString()}`;
}
