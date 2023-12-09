/**
 * Utility functions for the application.
 *
 * This file exports utility functions that are used throughout the application.
 * These functions provide common functionality that is reused in multiple places,
 * helping to keep the codebase DRY (Don't Repeat Yourself) and making it easier
 * to make changes in one place.
 */
export const convertTimestampToDate = (timestamp: number | undefined) => {
  if (!timestamp) return ''
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

export const capitalizeFirstLetters = (str: string | undefined): string => {
  return str?.replace(/\b\w/g, (char) => char.toUpperCase()) || ''
}
