/// <reference types="vite/client" />
declare interface Window {
	$message: typeof import('@/utils/message')['default']
	$apis: typeof import('@/apis')['default']
}

declare module 'mockjs'
