/// <reference types="vite/client" />
declare interface Window {
	$message: typeof import('@/utils/message')['default']
	$apis: typeof import('@/apis')['default']
	$getImageSrc: typeof import('@/utils/cdn')['getImageSrc']
	$_: typeof import('lodash-es')
}

declare module 'mockjs'
