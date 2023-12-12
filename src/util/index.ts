/**
 * Utility functions for the application.
 *
 * This file exports utility functions that are used throughout the application.
 * These functions provide common functionality that is reused in multiple places,
 * helping to keep the codebase DRY (Don't Repeat Yourself) and making it easier
 * to make changes in one place.
 */
export const timestampToDate = (timestamp: number | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
}

export const timestampToTime = (timestamp: number | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
}

export const timestampToDateTime = (timestamp: number | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

export const formatDate = (input: string | undefined): string => {
  if (!input) return ''
  const date = new Date(input)
  return date.toLocaleDateString('en-US')
}

export const capitalizeFirstLetters = (str: string | undefined): string => {
  return str?.replace(/\b\w/g, (char) => char.toUpperCase()) || ''
}
