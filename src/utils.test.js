import { describe, it, expect } from 'vitest'
import { validateSearchInput } from './utils'

describe('validateSearchInput', () => {
    it('returns error when title is empty', () => {
        const result = validateSearchInput('', '')
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Title is required.')
    })

    it('returns ok when title is provided', () => {
        const result = validateSearchInput('Batman', '')
        expect(result.ok).toBe(true)
    })

    it('returns error when year is not 4 digits', () => {
        const result = validateSearchInput('Batman', '99')
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Year must be 4 digits or leave blank.')
    })

    it('returns ok when year is valid 4 digits', () => {
        const result = validateSearchInput('Batman', '1989')
        expect(result.ok).toBe(true)
    })
})