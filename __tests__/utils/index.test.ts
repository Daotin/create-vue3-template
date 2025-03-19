import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkPermission, waitForImageLoad, isEmpty, enumMng, isSetType, checkFileNameLength } from '@/utils'
import { useAppStoreWithOut } from '@/stores'

// Mock store
vi.mock('@/stores', () => ({
	useAppStoreWithOut: vi.fn(() => ({
		permissions: ['admin', 'user', 'editor'],
	})),
}))

describe('utils/index.ts', () => {
	describe('checkPermission', () => {
		it('should return true when no code provided', () => {
			expect(checkPermission()).toBe(true)
		})

		it('should check single permission correctly', () => {
			expect(checkPermission('admin')).toBe(true)
			expect(checkPermission('guest')).toBe(false)
		})

		it('should check array of permissions correctly', () => {
			expect(checkPermission(['admin', 'user'])).toBe(true)
			expect(checkPermission(['admin', 'guest'])).toBe(false)
		})

		it('should check OR conditions correctly', () => {
			expect(checkPermission('admin||guest')).toBe(true)
			expect(checkPermission('guest||visitor')).toBe(false)
		})
	})

	describe('waitForImageLoad', () => {
		it('should resolve when image loads', async () => {
			// 使用vi.spyOn模拟Image和addEventListener
			const imgMock = {
				addEventListener: vi.fn((event, callback) => {
					if (event === 'load') callback()
				}),
				remove: vi.fn(),
				src: '',
			}

			vi.spyOn(global, 'Image').mockImplementation(() => imgMock as any)

			const url = 'test.jpg'
			const result = await waitForImageLoad(url)

			expect(result).toBe(url)
			expect(imgMock.src).toBe(url)
			expect(imgMock.addEventListener).toHaveBeenCalledWith('load', expect.any(Function))
			expect(imgMock.remove).toHaveBeenCalled()
		})
	})

	describe('isEmpty', () => {
		it('should return true for empty values', () => {
			expect(isEmpty('')).toBe(true)
			expect(isEmpty(undefined)).toBe(true)
			expect(isEmpty(null)).toBe(true)
		})

		it('should return false for non-empty values', () => {
			expect(isEmpty('test')).toBe(false)
			expect(isEmpty(0)).toBe(false)
			expect(isEmpty(false)).toBe(false)
			expect(isEmpty([])).toBe(false)
			expect(isEmpty({})).toBe(false)
		})
	})

	describe('enumMng', () => {
		const testData = [
			{ id: 1, name: 'Active', color: 'green', status: 'normal', key: 'ACTIVE' },
			{ id: 2, name: 'Inactive', color: 'red', status: 'disabled', key: 'INACTIVE' },
		]

		it('should create enum manager with correct structure', () => {
			const result = enumMng(testData)
			expect(result.ids).toEqual([1, 2])
			expect(result.names).toEqual(['Active', 'Inactive'])
			expect(result.enums).toEqual({ ACTIVE: '1', INACTIVE: '2' })
		})

		it('should get color correctly', () => {
			const result = enumMng(testData)
			expect(result.getColor(1)).toBe('green')
			expect(result.getColor('3')).toBe('')
		})

		it('should get status correctly', () => {
			const result = enumMng(testData)
			expect(result.getStatus(1)).toBe('normal')
			expect(result.getStatus('3')).toBeUndefined()
		})

		it('should get name by id correctly', () => {
			const result = enumMng(testData)
			expect(result.getNameById(1)).toBe('Active')
			expect(result.getNameById(3)).toBe('')
		})

		it('should get names by ids correctly', () => {
			const result = enumMng(testData)
			expect(result.getNamesByIds([1, 2])).toEqual(['Active', 'Inactive'])
			expect(result.getNamesByIds([1, 3])).toEqual(['Active'])
		})

		it('should format data correctly', () => {
			const result = enumMng(testData)
			expect(result.getFormats('value', 'label')).toEqual([
				{ value: 1, label: 'Active' },
				{ value: 2, label: 'Inactive' },
			])
		})

		it('should filter data correctly', () => {
			const result = enumMng(testData)
			expect(result.getFilters([1])).toEqual([testData[1]])
		})
	})

	describe('isSetType', () => {
		it('should check single file type correctly', () => {
			expect(isSetType('test.jpg', 'jpg')).toBe(true)
			expect(isSetType('test.png', 'jpg')).toBe(false)
		})

		it('should check multiple file types correctly', () => {
			expect(isSetType('test.jpg', ['jpg', 'png'])).toBe(true)
			expect(isSetType('test.gif', ['jpg', 'png'])).toBe(false)
		})

		it('should handle case insensitive comparison', () => {
			expect(isSetType('test.JPG', 'jpg')).toBe(true)
			expect(isSetType('test.jpg', 'JPG')).toBe(true)
		})

		it('should handle invalid input', () => {
			expect(isSetType(null as any, 'jpg')).toBe(false)
			expect(isSetType(undefined as any, 'jpg')).toBe(false)
			expect(isSetType(123 as any, 'jpg')).toBe(false)
		})
	})

	describe('checkFileNameLength', () => {
		it('should check file name length correctly', () => {
			expect(checkFileNameLength({ name: 'test.jpg' }, 5)).toBe(true)
			expect(checkFileNameLength({ name: 'longname.jpg' }, 5)).toBe(false)
		})

		it('should handle files without extension', () => {
			expect(checkFileNameLength({ name: 'test' }, 5)).toBe(true)
			expect(checkFileNameLength({ name: 'longname' }, 5)).toBe(false)
		})
	})
})
