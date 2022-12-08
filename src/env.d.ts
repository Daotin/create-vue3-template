/// <reference types="vite/client" />
declare interface Window {
	$message: typeof import('@/utils/message')['default']
}

declare module 'mockjs'
