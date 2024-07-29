import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 *
 * @param {...ClassValue} inputs - The class names to be combined.
 * @return {string} The combined class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} s - the input string
 * @return {string} the capitalized string
 */
export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Convert the input string to title case.
 *
 * @param {string} str - the input string to be converted to title case
 * @return {string} the input string converted to title case
 */
export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Returns a slugified version of the input string.
 *
 * @param {string} str - the input string to be slugified
 * @param {string} [slugStr] - the character to use as a slug, defaults to '_' if not provided
 * @return {string} the slugified version of the input string
 */
export const slugify = (str: string, slugStr?: '_' | '-') =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, slugStr ? slugStr : '_')
    .replace(/^-+|-+$/g, '');

/**
 * Converts a slug string to a title format.
 *
 * @param {string} slug - The slug string to convert to title format
 * @return {string} The title format of the slug string
 */
export function slugToTitle(slug: string) {
  const slugArr = slug.split(/[-_]/g);
  const titles = slugArr.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return titles.join(' ');
}

/**
 * Truncates a given string if it exceeds a specified length.
 *
 * @param {string} str - The string to be truncated
 * @param {number} num - The maximum length of the truncated string
 * @return {string} The truncated string
 */
export const truncate = (str: string, num: number) => {
  if (!str) return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

/**
 * Asynchronously gets a blurred data URL from a given URL.
 *
 * @param {string | null} url - the URL to fetch the image from
 * @return {Promise<string>} a data URL representing the fetched image
 */
export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return `data:image/png;base64,${base64}`;
  } catch (e) {
    console.log(e);
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
};

export const placeholderBlurHash =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==';

/**
 * Converts the given date to a string in the format 'EEEE, do MMMM yyyy' (e.g. "Monday, 1st January 2022").
 *
 * @param {Date} date - The date to be converted to a string.
 * @return {string} The formatted date string.
 */
export const toDateString = (date: Date, formatStr: 'EEEE, do MMMM yyyy') => {
  return format(date, formatStr);
};

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} min - The minimum value for the range
 * @param {number} max - The maximum value for the range
 * @return {number} A random integer within the specified range
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Converts a number to its ordinal representation.
 *
 * @param {number} num - the number to convert to ordinal
 * @return {string} the ordinal representation of the input number
 */
export const toOrdinal = (num: number) => {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

  const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th'],
  ]);
  const formatOrdinals = (n: number) => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}<sup>${suffix}</sup>`;
  };
  return formatOrdinals(num);
};

/**
 * Generates an array of numbers in a specified range with a specified step.
 *
 * @param {number} start - The starting value of the range
 * @param {number} stop - The end value of the range
 * @param {number} step - The step value for generating the range
 * @return {number[]} The array of numbers in the specified range
 */
export const rangeArr = (start = 0, stop: number, step: 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * Generates a cryptographic key using AES-GCM algorithm.
 *
 * @return {Promise<CryptoKey>} The generated cryptographic key.
 */
export const generateKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  return key;
};

/**
 * Encrypts the input text using the provided cryptographic key and returns the encrypted data along with the initialization vector.
 *
 * @param {string} text - The text to be encrypted
 * @param {CryptoKey} key - The cryptographic key used for encryption
 * @return {string} The encrypted data along with the initialization vector in JSON format
 */
export const encryptText = async (text: string, key: CryptoKey) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    data
  );

  return JSON.stringify({
    iv: Array.from(iv),
    encrypted: Array.from(new Uint8Array(encrypted)),
  });
};

/**
 * Decrypts the input encrypted text using the provided cryptographic key and returns the decrypted data as a string.
 *
 * @param {string} str - The encrypted text to be decrypted
 * @param {CryptoKey} key - The cryptographic key used for decryption
 * @return {string} The decrypted data as a string
 */
export const decryptText = async (str: string, key: CryptoKey) => {
  const encryptedData = JSON.parse(str) as {
    iv: number[];
    encrypted: number[];
  };
  const { iv, encrypted } = encryptedData;

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(iv),
    },
    key,
    new Uint8Array(encrypted)
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
};

/**
 * A function that delays execution for a specified amount of time.
 *
 * @param {number} ms - The number of milliseconds to delay execution
 * @param {() => void} [cb] - An optional callback function to be executed after the delay
 * @return {Promise<boolean>} A promise that resolves to true after the delay
 */
export const sleep = (ms: number, cb?: () => void) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (cb) {
        cb();
      }
      resolve(true);
    }, ms);
  });
};
