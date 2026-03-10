export function validateSearchInput(title, year) {
    if (!title || title.trim() === '') {
        return { ok: false, message: 'Title is required.' }
    }
    if (year && year.trim() !== '' && !/^\d{4}$/.test(year.trim())) {
        return { ok: false, message: 'Year must be 4 digits or leave blank.' }
    }
    return { ok: true, message: '' }
}